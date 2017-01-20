var path = require('path');

module.exports = (function (settings) {
	var isWindows = /^win/.test(process.platform);
	var chromedriverPath = require.resolve('chromedriver');
	var geckoDriverPath = require.resolve('geckodriver');
	var chromeDriver = isWindows ? path.join(chromedriverPath, '../chromedriver', 'chromedriver.exe') : path.join(chromedriverPath, '../chromedriver', 'chromedriver');
	var geckoDriver = isWindows ? path.join(geckoDriverPath, '../..', 'geckodriver.exe') : path.join(geckoDriverPath, '../..', 'geckodriver');

	// The following environment variables are set to comma separated strings in index.js
	// Here we will convert them to an array, as required by nightwatch.
	settings.src_folders = process.env.KNE_TEST_PATHS.split(',');
	settings.page_objects_path = process.env.KNE_PAGE_OBJECT_PATHS.split(',');
	settings.test_settings.default.exclude = process.env.KNE_EXCLUDE_TEST_PATHS.split(',');

	settings.globals_path = path.resolve(__dirname, 'globals.js');
	settings.selenium.cli_args['webdriver.chrome.driver'] = chromeDriver;
	settings.selenium.cli_args['webdriver.gecko.driver'] = geckoDriver;

	if (process.env.KNE_BROWSER_NAME) {
		settings.test_settings[process.env.KNE_TEST_ENV].desiredCapabilities.browserName = process.env.KNE_BROWSER_NAME;
	}

	if (process.env.KNE_BROWSER_VERSION) {
		settings.test_settings[process.env.KNE_TEST_ENV].desiredCapabilities.version = process.env.KNE_BROWSER_VERSION;
	}

	console.log('nightwatch settings:'
		+ '\n\tNightwatch Environment: ' + process.env.KNE_TEST_ENV
		+ '\n\tNightwatch Start Selenium: ' + process.env.KNE_SELENIUM_START_PROCESS
		+ '\n\tBrowser Name: ' + settings.test_settings[process.env.KNE_TEST_ENV].desiredCapabilities.browserName
		+ '\n\tBrowser Version: ' + settings.test_settings[process.env.KNE_TEST_ENV].desiredCapabilities.version
		+ '\n\tSauceLabs Tunnel Id: ' + process.env.TRAVIS_JOB_NUMBER
		+ '\n\tChromeDriver: ' + settings.selenium.cli_args['webdriver.chrome.driver']
		+ '\n\tgeckoDriver: ' + settings.selenium.cli_args['webdriver.gecko.driver']
	);

	return settings;

})(require('./nightwatch.json'));
