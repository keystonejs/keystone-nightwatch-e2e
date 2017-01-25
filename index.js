var _ = require('lodash');
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
	console.log([moment().format('HH:mm:ss:SSS')] + ' kne: starting selenium server in background...');
	selenium_proc = child_process.spawn('java',
		[
			'-jar', selenium.path,
		],
		{
			stdio: ['ignore', 'pipe', 'pipe'],
		});
	var running = false;

	selenium_proc.stderr.on('data', function (buffer) {
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
	console.log([moment().format('HH:mm:ss:SSS')] + ' kne: running nightwatch...');

	try {
		Nightwatch.cli(function (argv) {
			// Set app-specific env for nightwatch session
			process.env.KNE_TEST_ENV = argv.env;

			if (argv['browser-name']) {
				process.env.KNE_BROWSER_NAME = argv['browser-name'];
			}

			if (argv['browser-version']) {
				process.env.KNE_BROWSER_VERSION = argv['browser-version'];
			}

			// If possible, argv inputs and environment variables will be merged together
			// If not, argv inputs will override environment variables.
			process.env.KNE_TEST_PATHS = process.env.KNE_TEST_PATHS || '';
			if (argv.test_paths) {
				// If argv.test_paths is set, add these paths to the environment variable
				process.env.KNE_TEST_PATHS += ',' + argv.test_paths;
			} else if (process.env.KNE_TEST_PATHS === '') {
				// If neither argv.test_paths nor the environment variable is set, throw an error.
				done(new Error('No test paths provided. Either set the --test_paths config option or the KNE_TEST_PATHS environment variable'));
			}
			process.env.KNE_SELENIUM_SERVER = process.env.KNE_SELENIUM_SERVER || selenium.path;
			if (process.env.KNE_PAGE_OBJECT_PATHS) {
				process.env.KNE_PAGE_OBJECT_PATHS += ',' + path.resolve(__dirname, 'lib/src/pageObjects/');
			} else {
				process.env.KNE_PAGE_OBJECT_PATHS = path.resolve(__dirname, 'lib/src/pageObjects/');
			}
			if (argv.po_paths) {
				process.env.KNE_PAGE_OBJECT_PATHS += ',' + argv.po_paths;
			}

			if (!process.env.KNE_EXCLUDE_TEST_PATHS) {
				process.env.KNE_EXCLUDE_TEST_PATHS = ''; // Needs to be initialised for .split in conf.js file.
			} else if (argv.exclude_paths) {
				process.env.KNE_EXCLUDE_TEST_PATHS += ',' + argv.exclude_paths;
			}

			if (argv.env === 'saucelabs-local' && argv['sauce-username'] && argv['sauce-access-key']) {
				process.env.SAUCE_USERNAME = argv['sauce-username'];
				process.env.SAUCE_ACCESS_KEY = argv['sauce-access-key'];
				// TODO:  tried to set a TRAVIS_JOB_NUMBER here to something like --sauce-tunnel-id but it just
				//		doesn't work, at least, not in my dev environment.  Something to look into later.  For right
				//		now the default tunnel name will do.
			}

			argv.config = path.resolve(__dirname, 'nightwatch.conf.js');

			async.series([

				/**
				 * If the user wants us to start selenium manually then do so
				 */
				function (cb) {
					if (argv.env === 'default' && argv['selenium-in-background']) {
						process.env.KNE_SELENIUM_START_PROCESS = false;
						runSeleniumInBackground(cb);
					} else if (argv.env === 'default') {
						process.env.KNE_SELENIUM_START_PROCESS = true;
						cb();
					} else {
						process.env.KNE_SELENIUM_START_PROCESS = false;
						cb();
					}
				},

				/**
				 * The only environment that currently requires starting sauce connect is travis.
				 */
				function (cb) {
					if (argv.env === 'saucelabs-travis' || (argv.env === 'saucelabs-local' && argv['sauce-username'] && argv['sauce-access-key'])) {
						startSauceConnect(cb);
					} else {
						if (argv.env === 'saucelabs-local') {
							console.error([moment().format('HH:mm:ss:SSS')] + ' kne: You must specify --sauce-username and --sauce-access-key when using: --' + argv.env);
							cb(new Error('kne: You must specify --sauce-username and --sauce-access-key when using: --' + argv.env));
						} else {
							cb();
						}
					}
				},

				/**
				 * Run nightwatch to start executing the tests
				 */
				function (cb) {
					Nightwatch.runner(argv, function (status) {
						var err = null;
						if (status) {
							console.log([moment().format('HH:mm:ss:SSS')] + ' kne: tests passed');
						} else {
							console.log([moment().format('HH:mm:ss:SSS')] + ' kne: tests failed');
							err = new Error('kne: nightwatch runner returned an error status code');
						}
						cb(err);
					});
				},
			], function (err) {
				if (err) {
					console.error(err);
				}
				done(err);
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
	console.log([moment().format('HH:mm:ss:SSS')] + ' kne: Starting Sauce Connect');

	var default_options = {
		username: process.env.SAUCE_USERNAME,
		accessKey: process.env.SAUCE_ACCESS_KEY,
		connectRetries: 5,
		connectRetryTimeout: 60000,
		logger: sauceConnectLog,
		readyFileId: process.env.TRAVIS_JOB_NUMBER,
	};
	var custom_options = process.env.TRAVIS_JOB_NUMBER
		? {
			tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
		} : {
		};
	var options = _.extend({}, default_options, custom_options);

	sauceConnectLauncher(options, function (err, sauceConnectProcess) {
		if (err) {
			console.error([moment().format('HH:mm:ss:SSS')] + ' kne: There was an error starting Sauce Connect');
			done(err);
		} else {
			console.log([moment().format('HH:mm:ss:SSS')] + ' kne: Sauce Connect Ready');
			sauceConnection = sauceConnectProcess;
			sauceConnectionRunning = true;
			setTimeout(done, 5000);
		}
	});
}

function stopSauceConnect (done) {
	if (process.env.SAUCE_ACCESS_KEY !== undefined && sauceConnection !== null) {
		console.log([moment().format('HH:mm:ss:SSS')] + ' kne: Stopping Sauce Connect');
		sauceConnection.close(function () {
			console.log([moment().format('HH:mm:ss:SSS')] + ' kne: Sauce Connect Stopped');
			sauceConnectionRunning = false;
			setTimeout(done, 60000);
		});
	} else {
		done();
	}
}

/*
	Function that starts the nightwatch-based e2e framework service

	options:
	{
		keystone: <keystone instance>		// REQUIRED
	}
*/
function start (options, callback) {
	console.log([moment().format('HH:mm:ss:SSS')] + ' kne: starting...');

	// add the keystone instance to the module exports so that the keystone-nightwatch-e2e library may use it
	exports.keystone = options.keystone;

	runNightwatch(function (err) {
		console.log([moment().format('HH:mm:ss:SSS')] + ' kne: finishing...');
		if (err) {
			console.error([moment().format('HH:mm:ss:SSS')] + ' kne: finished with error\n' + err);
		}
		if (selenium_proc) {
			console.error([moment().format('HH:mm:ss:SSS')] + ' kne: terminating selenium process');
			selenium_proc.kill('SIGTERM');
			selenium_proc.kill('SIGKILL');
		}
		if (sauceConnectionRunning) {
			stopSauceConnect(function () { callback && callback(err); });
		} else {
			callback && callback(err);
		}
	});
}

// exported e2e framework service
exports = module.exports = {
	startE2E: start,
	pageObjectsPath: path.resolve(__dirname, 'lib/src/pageObjects/'),
	fieldTestObjectsPath: path.resolve(__dirname, 'lib/src/fieldTestObjects'),
};
