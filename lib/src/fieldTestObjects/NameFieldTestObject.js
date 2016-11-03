var utils = require('../utils');

module.exports = function NameFieldTestObject (config) {
	var selectElem = function (elem) {
		return config.formSelector + ' ' + self.selector + ' ' + self.elements[elem];
	};
	var selectListScreenElem = function (elem) {
		return config.formSelector + ' ' + self.listScreenElements[elem];
	};
	var self = {
		selector: '.field-type-name[for="' + config.fieldName + '"]',
		elements: {
			label: 'label[for="' + config.fieldName + '"]',
			firstName: 'input[name="' + config.fieldName + '.first"]',
			firstNamePlaceholder: 'input[placeholder="First name"]',
			lastName: 'input[name="' + config.fieldName + '.last"]',
			lastNamePlaceholder: 'input[placeholder="Last name"]',
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
					.expect.element(selectElem('firstName')).to.be.visible;
				browser
					.expect.element(selectElem('firstNamePlaceholder')).to.be.visible;
				browser
					.expect.element(selectElem('lastName')).to.be.visible;
				browser
					.expect.element(selectElem('lastNamePlaceholder')).to.be.visible;
				return browser;
			},
			assertFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.equal(utils.titlecase(config.fieldName));
				browser
					.expect.element(selectElem('firstName')).to.not.be.visible;
				browser
					.expect.element(selectElem('firstNamePlaceholder')).to.not.be.visible;
				browser
					.expect.element(selectElem('lastName')).to.not.be.visible;
				browser
					.expect.element(selectElem('lastNamePlaceholder')).to.not.be.visible;
				return browser;
			},
			assertFieldDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.present;
				browser
					.expect.element(selectElem('firstName')).to.be.present;
				browser
					.expect.element(selectElem('firstNamePlaceholder')).to.be.present;
				browser
					.expect.element(selectElem('lastName')).to.be.present;
				browser
					.expect.element(selectElem('lastNamePlaceholder')).to.be.present;
				return browser;
			},
			assertFieldDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.present;
				browser
					.expect.element(selectElem('firstName')).to.not.be.present;
				browser
					.expect.element(selectElem('firstNamePlaceholder')).to.not.be.present;
				browser
					.expect.element(selectElem('lastName')).to.not.be.present;
				browser
					.expect.element(selectElem('lastNamePlaceholder')).to.not.be.present;
				return browser;
			},
			fillFieldInputs: function (browser, input, options) {
				browser
					.clearValue(selectElem('firstName'))
					.setValue(selectElem('firstName'), input.firstName)
					.clearValue(selectElem('lastName'))
					.setValue(selectElem('lastName'), input.lastName);
				return browser;
			},
			assertFieldInputs: function (browser, input, options) {
				browser
					.getValue(selectElem('firstName'), function (result) {
						browser.api.assert.equal(result.value, input.firstName);
					});
				browser
					.getValue(selectElem('lastName'), function (result) {
						browser.api.assert.equal(result.value, input.lastName);
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
