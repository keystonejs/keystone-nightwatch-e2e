var path = require('path');
var async = require('async');
var moment = require('moment');
var Nightwatch = require('nightwatch/lib/index.js');
var child_process = require('child_process');
var selenium = require('selenium-server-standalone-jar');
var selenium_proc = null;

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
			if (runSelenium) {
				runSeleniumInBackground(cb);
			} else {
				cb();
			}
		},

		function (cb) {
			runNightwatch(cb);
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
		callback && callback(err);
	});
}

// exported e2e framework service
exports = module.exports = {
	startE2E: start,
	seleniumPath: selenium.path,
	pageObjectsPath: path.resolve(__dirname, 'lib/src/pageObjects/'),
	fieldTestObjectsPath: path.resolve(__dirname, 'lib/src/fieldTestObjects'),
};
