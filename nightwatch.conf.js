var path = require('path');

module.exports = (function (settings) {
	var isWindows = /^win/.test(process.platform);
	// TODO:  verify the chromedriver path in linux/mac
	var chromeDriver = isWindows ? path.join(__dirname, 'node_modules/chromedriver/lib/chromedriver', 'chromedriver.exe') : path.join(__dirname, 'node_modules/chromedriver/lib/chromedriver', 'chromedriver');
	var geckoDriver = isWindows ? path.join(__dirname, 'node_modules/geckodriver/geckodriver.exe') : path.join(__dirname, 'node_modules/.bin/geckodriver');

	// The following environment variables are set to comma separated strings in index.js
	// Here we will convert them to an array, as required by nightwatch.
	settings.src_folders = process.env.KNE_TEST_PATHS.split(',');
	settings.page_objects_path = process.env.KNE_PAGE_OBJECT_PATHS.split(',');
	settings.test_settings.default.exclude = process.env.KNE_EXCLUDE_TEST_PATHS.split(',');

	settings.globals_path = path.resolve(__dirname, 'globals.js');
	settings.selenium.cli_args['webdriver.chrome.driver'] = chromeDriver;
	settings.selenium.cli_args['webdriver.gecko.driver'] = geckoDriver;

	if (process.env.TRAVIS_JOB_NUMBER) {
		settings.test_settings['saucelabs-travis'].desiredCapabilities['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
	}

	if (process.env.KNE_BROWSER_NAME) {
		settings.test_settings[process.env.KNE_TEST_ENV].desiredCapabilities.browserName = process.env.KNE_BROWSER_NAME;
	}

	if (process.env.KNE_BROWSER_VERSION) {
		settings.test_settings[process.env.KNE_TEST_ENV].desiredCapabilities.version = process.env.KNE_BROWSER_VERSION;
	}

	console.log('nightwatch settings:'
		+ '\n\tenvironment: ' + process.env.KNE_TEST_ENV
		+ '\n\tbrowser name: ' + settings.test_settings[process.env.KNE_TEST_ENV].desiredCapabilities.browserName
		+ '\n\tbrowser version: ' + settings.test_settings[process.env.KNE_TEST_ENV].desiredCapabilities.version
		+ '\n\tjob number: ' + process.env.TRAVIS_JOB_NUMBER
	);

	return settings;

})(require('./nightwatch.json'));
