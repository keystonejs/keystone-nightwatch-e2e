var path = require('path');
var async = require('async');
var moment = require('moment');
var Nightwatch = require('nightwatch/lib/index.js');
var child_process = require('child_process');
var selenium = require('selenium-server-standalone-jar');
var selenium_proc = null;
var sauceConnectLauncher = require('sauce-connect-launcher');

/*
On some machines, selenium fails with a timeout error when nightwatch tries to connect due to a
deadlock situation. The following is a temporary workaround that starts selenium without a pipe
from stdin until this issue is fixed in nightwatch:
https://github.com/nightwatchjs/nightwatch/issues/470
*/
function runSeleniumInBackground (done) {
	console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: starting selenium server in background...');
	selenium_proc = child_process.spawn('java',
		[
			'-jar', selenium.path,
		],
		{
			stdio: ['ignore', 'pipe', 'pipe'],
		});
	var running = false;

	selenium_proc.stderr.on('data', function (buffer)
	{
		var line = buffer.toString();
		if (line.search(/Selenium Server is up and running/g) !== -1) {
			running = true;
			done();
		}
	});

	selenium_proc.on('close', function (code) {
		if (!running) {
			done(new Error('Selenium exited with error code ' + code));
		}
	});
}

// Function that starts the nightwatch service
function runNightwatch (done) {
	console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: running nightwatch...');

	try {
		Nightwatch.cli(function (argv) {
			// Set app-specific env for nightwatch session
			if (process.env.KNE_TEST_PATHS !== undefined && argv.test_paths !== undefined) {
				process.env.KNE_TEST_PATHS += ',' + argv.test_paths;
			} else if (process.env.KNE_TEST_PATHS === undefined && argv.test_paths !== undefined) {
				process.env.KNE_TEST_PATHS = argv.test_paths;
			} else if (process.env.KNE_TEST_PATHS === undefined && argv.test_paths === undefined) {
				console.log('\nNo test paths provided. Either set the --test_paths config option or the KNE_TEST_PATHS environment variable');
				done();
			}
			process.env.KNE_SELENIUM_SERVER = selenium.path;
			process.env.KNE_GLOBALS_PATH = path.resolve(__dirname, 'globals.js');
			if (process.env.KNE_PAGE_OBJECT_PATHS !== undefined) {
				process.env.KNE_PAGE_OBJECT_PATHS += ',' + path.resolve(__dirname, 'lib/src/pageObjects/');
			} else {
				process.env.KNE_PAGE_OBJECT_PATHS = path.resolve(__dirname, 'lib/src/pageObjects/');
			}
			if (argv.po_paths !== undefined) {
				process.env.KNE_PAGE_OBJECT_PATHS += ',' + argv.popages;
			}
			if (process.env.KNE_EXCLUDE_TEST_PATHS === undefined) {
				process.env.KNE_EXCLUDE_TEST_PATHS = ''; // Needs to be initialised for .split in conf.js file.
			} else if (argv.exclude_paths !== undefined) {
				process.env.KNE_EXCLUDE_TEST_PATHS += ',' + argv.exclude_paths;
			}
			process.env.KNE_SELENIUM_START_PROCESS = process.env.KNE_SELENIUM_START_PROCESS || true;
			if (argv.selenium_start_process !== undefined) {
				process.env.KNE_SELENIUM_START_PROCESS = argv.selenium_start_process;
			}

			argv.config = path.resolve(__dirname, 'nightwatch.conf.js');
			Nightwatch.runner(argv, function () {
				console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: finished tests...');
				done();
			});
		});
	} catch (ex) {
		console.error('\nThere was an error while starting the nightwatch test runner:\n\n');
		process.stderr.write(ex.stack + '\n');
		done('failed to run nightwatch!');
	}
}

var sauceConnection = null;
var sauceConnectionRunning = false;

function sauceConnectLog (message) {
	console.log([moment().format('HH:mm:ss:SSS')] + ' Sauce Connect: ' + message);
}

// Function that starts the sauce connect servers if SAUCE_ACCESS_KEY is set.
function startSauceConnect (done) {
	if (process.env.SAUCE_ACCESS_KEY !== undefined) {
		console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: Starting Sauce Connect');
		sauceConnectLauncher({
			username: process.env.SAUCE_USERNAME,
			accessKey: process.env.SAUCE_ACCESS_KEY,
			tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
			connectRetries: 5,
			logger: sauceConnectLog,
		}, function (err, sauceConnectProcess) {
			if (err) {
				console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: There was an error starting Sauce Connect');
				done(err);
			} else {
				console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: Sauce Connect Ready');
				sauceConnection = sauceConnectProcess;
				sauceConnectionRunning = true;
				done();
			}
		});
	} else {
		done();
	}
}

function stopSauceConnect (done) {
	if (process.env.SAUCE_ACCESS_KEY !== undefined && sauceConnection !== null) {
		console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: Stopping Sauce Connect');
		sauceConnection.close(function () {
			console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: Sauce Connect Stopped');
			sauceConnectionRunning = false;
			done();
		});
	} else {
		done();
	}
}

/*
	Function that starts the nightwatch-based e2e framework service

	options:
	{
		keystone: <keystone instance>,		// REQUIRED
		runSelenium: [ true | false ]		// DEFAULTS TO FALSE
	}
*/
function start (options, callback) {
	var runSelenium = options.runSelenium || false;

	// add the keystone instance to the module exports so that the keystone-nightwatch-e2e library may use it
	exports.keystone = options.keystone;

	async.series([

		function (cb) {
			startSauceConnect(cb);
		},

		function (cb) {
			if (runSelenium) {
				runSeleniumInBackground(cb);
			} else {
				cb();
			}
		},

		function (cb) {
			runNightwatch(cb);
		},

		function (cb) {
			stopSauceConnect(cb);
		},

	], function (err) {
		if (err) {
			console.error([moment().format('HH:mm:ss:SSS')] + ' e2e: ' + err);
		}
		if (selenium_proc) {
			console.error([moment().format('HH:mm:ss:SSS')] + ' e2e: terminating selenium process');
			selenium_proc.kill('SIGTERM');
			selenium_proc.kill('SIGKILL');
		}
		if (sauceConnectionRunning) {
			console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: something seems to have gone wrong, stopping sauce connect before travis shuts down');
			stopSauceConnect(function () { callback && callback(err); });
		} else {
			callback && callback(err);
		}
	});
}

// exported e2e framework service
exports = module.exports = {
	startE2E: start,
	seleniumPath: selenium.path,
	pageObjectsPath: path.resolve(__dirname, 'lib/src/pageObjects/'),
	fieldTestObjectsPath: path.resolve(__dirname, 'lib/src/fieldTestObjects'),
};
