var path = require('path');

module.exports = (function (settings) {
	// The following environment variables are set to comma separated strings in index.js
	// Here we will convert them to an array, as required by nightwatch.

	settings.src_folders = process.env.KNE_TEST_PATHS.split(',');
	settings.page_objects_path = process.env.KNE_PAGE_OBJECT_PATHS.split(',');
	settings.test_settings.exclude = process.env.KNE_EXCLUDE_TEST_PATHS.split(',');
	settings.globals_path = path.resolve(__dirname, 'globals.js');
	settings.test_settings.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
	return settings;

})(require('./nightwatch.json'));
