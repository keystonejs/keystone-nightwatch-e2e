var utils = require('../utils');

module.exports = function DatetimeFieldTestObject (config) {
	var selectElem = function (elem) {
		return config.formSelector + ' ' + self.selector + ' ' + self.elements[elem];
	};
	var selectListScreenElem = function (elem) {
		return config.formSelector + ' ' + self.listScreenElements[elem];
	};
	var self = {
		selector: '.field-type-datetime[for="' + config.fieldName + '"]',
		elements: {
			label: 'label[for="' + config.fieldName + '"]',
			nowButton: 'button',
			date: 'input[name="' + config.fieldName + '_date"]',
			datePlaceholder: 'input[placeholder="YYYY-MM-DD"]',
			time: 'input[name="' + config.fieldName + '_time"]',
			timePlaceholder: 'input[placeholder="HH:MM:SS am/pm"]',
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
					.expect.element(selectElem('nowButton')).to.be.visible;
				browser
					.expect.element(selectElem('date')).to.be.visible;
				browser
					.expect.element(selectElem('datePlaceholder')).to.be.visible;
				browser
					.expect.element(selectElem('time')).to.be.visible;
				browser
					.expect.element(selectElem('timePlaceholder')).to.be.visible;
				return browser;
			},
			assertFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.equal(utils.titlecase(config.fieldName));
				browser
					.expect.element(selectElem('nowButton')).to.not.be.visible;
				browser
					.expect.element(selectElem('date')).to.not.be.visible;
				browser
					.expect.element(selectElem('datePlaceholder')).to.not.be.visible;
				browser
					.expect.element(selectElem('time')).to.not.be.visible;
				browser
					.expect.element(selectElem('timePlaceholder')).to.not.be.visible;
				return browser;
			},
			assertFieldDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.present;
				browser
					.expect.element(selectElem('nowButton')).to.be.present;
				browser
					.expect.element(selectElem('date')).to.be.present;
				browser
					.expect.element(selectElem('datePlaceholder')).to.be.present;
				browser
					.expect.element(selectElem('time')).to.be.present;
				browser
					.expect.element(selectElem('timePlaceholder')).to.be.present;
				return browser;
			},
			assertFieldDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.present;
				browser
					.expect.element(selectElem('nowButton')).to.not.be.present;
				browser
					.expect.element(selectElem('date')).to.not.be.present;
				browser
					.expect.element(selectElem('datePlaceholder')).to.not.be.present;
				browser
					.expect.element(selectElem('time')).to.not.be.present;
				browser
					.expect.element(selectElem('timePlaceholder')).to.not.be.present;
				return browser;
			},
			fillFieldInputs: function (browser, input, options) {
				browser
					.clearValue(selectElem('date'))
					.setValue(selectElem('date'), input.date)
					.clearValue(selectElem('time'))
					.setValue(selectElem('time'), input.time);
				return browser;
			},
			assertFieldInputs: function (browser, input, options) {
				browser
					.getValue(selectElem('date'), function (result) {
						browser.api.assert.equal(result.value, input.date);
					});
				browser
					.getValue(selectElem('time'), function (result) {
						browser.api.assert.equal(result.value, input.time);
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
