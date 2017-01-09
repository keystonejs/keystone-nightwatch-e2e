var path = require('path');

module.exports = (function (settings) {
	// The following environment variables are set to comma separated strings in index.js
	// Here we will convert them to an array, as required by nightwatch.

	settings.src_folders = process.env.KNE_TEST_PATHS.split(',');
	settings.page_objects_path = process.env.KNE_PAGE_OBJECT_PATHS.split(',');
	settings.test_settings.default.exclude = process.env.KNE_EXCLUDE_TEST_PATHS.split(',');
	settings.globals_path = path.resolve(__dirname, 'globals.js');
	settings.test_settings['saucelabs-travis'].desiredCapabilities['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;

	console.log('****DEBUG KNE CONFIG*****');
	console.log('src_folders', settings.src_folders);
	console.log('po path', settings.page_objects_path);
	console.log('exclude', settings.test_settings.default.exclude);
	console.log('globals', settings.globals_path);
	console.log('tunnelIdenfifier', settings.test_settings['saucelabs-travis'].desiredCapabilities['tunnel-identifier']);
	console.log('start_process', process.env.KNE_SELENIUM_START_PROCESS); // set in .json
	console.log('server start', process.env.KNE_SELENIUM_SERVER); // set in .json

	return settings;

})(require('./nightwatch.json'));
