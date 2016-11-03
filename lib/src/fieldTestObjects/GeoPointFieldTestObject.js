var utils = require('../utils');

module.exports = function GeoPointFieldTestObject (config) {
	var selectElem = function (elem) {
		return config.formSelector + ' ' + self.selector + ' ' + self.elements[elem];
	};
	var selectListScreenElem = function (elem) {
		return config.formSelector + ' ' + self.listScreenElements[elem];
	};
	var self = {
		selector: '.field-type-geopoint[for="' + config.fieldName + '"]',
		elements: {
			label: 'label[for="' + config.fieldName + '"]',
			valueLat: 'input[name="' + config.fieldName + '[1]"][placeholder="Latitude"]',
			valueLng: 'input[name="' + config.fieldName + '[0]"][placeholder="Longitude"]',
		},
		listScreenElements: {
			ui: 'a.ItemList__value',
			value: 'a.ItemList__value',
			link: 'a',
		},
		commands: {
			assertFieldUIVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.equal(utils.titlecase(config.fieldName));
				browser
					.expect.element(selectElem('valueLat')).to.be.visible;
				browser
					.expect.element(selectElem('valueLng')).to.be.visible;
				return browser;
			},
			assertFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.equal(utils.titlecase(config.fieldName));
				browser
					.expect.element(selectElem('valueLat')).to.not.be.visible;
				browser
					.expect.element(selectElem('valueLng')).to.not.be.visible;
				return browser;
			},
			assertFieldDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.present;
				browser
					.expect.element(selectElem('valueLat')).to.be.present;
				browser
					.expect.element(selectElem('valueLng')).to.be.present;
				return browser;
			},
			assertFieldDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.present;
				browser
					.expect.element(selectElem('valueLat')).to.not.be.present;
				browser
					.expect.element(selectElem('valueLng')).to.not.be.present;
				return browser;
			},
			fillFieldInputs: function (browser, input, options) {
				browser
					.clearValue(selectElem('valueLat'))
					.setValue(selectElem('valueLat'), input.lat);
				browser
					.clearValue(selectElem('valueLng'))
					.setValue(selectElem('valueLng'), input.lng);
				return browser;
			},
			assertFieldInputs: function (browser, input, options) {
				browser
					.waitForElementVisible(selectElem('valueLat'));
				browser
					.getValue(selectElem('valueLat'), function (result) {
						browser.api.assert.equal(result.state, 'success');
						browser.api.assert.equal(result.value, input.lat);
					});
				browser
					.waitForElementVisible(selectElem('valueLng'));
				browser
					.getValue(selectElem('valueLng'), function (result) {
						browser.api.assert.equal(result.state, 'success');
						browser.api.assert.equal(result.value, input.lng);
					});
				return browser;
			},
			assertListScreenFieldUIVisible: function (browser, options) {
				browser
					.expect.element(selectListScreenElem('ui')).to.be.visible;
				return browser;
			},
			assertListScreenFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectListScreenElem('ui')).to.not.be.visible;
				return browser;
			},
			assertListScreenFieldUIPresent: function (browser, options) {
				browser
					.expect.element(selectListScreenElem('ui')).to.be.present;
				return browser;
			},
			assertListScreenFieldUINotPresent: function (browser, options) {
				browser
					.expect.element(selectListScreenElem('ui')).to.not.be.present;
				return browser;
			},
			assertListScreenFieldValueEquals: function (browser, value, options) {
				browser
					.expect.element(selectListScreenElem('value')).text.to.equal(value);
				return browser;
			},
			assertListScreenFieldValueContains: function (browser, value, options) {
				browser
					.expect.element(selectListScreenElem('value')).text.to.contain(value);
				return browser;
			},
			clickListScreenFieldValue: function (browser, options) {
				browser
					.click(selectListScreenElem('link'));
				return browser;
			},
		},
	};

	return self;
};
