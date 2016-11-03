var utils = require('../utils');

module.exports = function SelectFieldTestObject (config) {
	var selectElem = function (elem) {
		return config.formSelector + ' ' + self.selector + ' ' + self.elements[elem];
	};
	var selectListScreenElem = function (elem) {
		return config.formSelector + ' ' + self.listScreenElements[elem];
	};
	var self = {
		selector: '.field-type-select[for="' + config.fieldName + '"]',
		elements: {
			label: 'label[for="' + config.fieldName + '"]',
			selectField: '.Select',
			selectValue: '.Select-value-label',
			placeholder: '.Select-placeholder',
			dropdownArrow: '.Select-arrow-zone',
			optionOne: '.Select-menu-outer option[value="One"]',
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
					.expect.element(selectElem('selectField')).to.be.visible;
				if (options.placeholder) {
					// Placeholder won't be there is the select field is filled in.
					browser
						.expect.element(selectElem('placeholder')).to.be.visible;
				}
				browser
					.expect.element(selectElem('dropdownArrow')).to.be.visible;
				return browser;
			},
			assertFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.not.equal(utils.titlecase(config.fieldName));
				browser
					.expect.element(selectElem('selectField')).to.not.be.visible;
				if (options.placeholder) {
					// Placeholder won't be there is the select field is filled in.
					browser
						.expect.element(selectElem('placeholder')).to.not.be.visible;
				}
				browser
					.expect.element(selectElem('dropdownArrow')).to.not.be.visible;
				return browser;
			},
			assertFieldDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.present;
				browser
					.expect.element(selectElem('selectField')).to.be.present;
				if (options.placeholder) {
					// Placeholder won't be there is the select field is filled in.
					browser
						.expect.element(selectElem('placeholder')).to.be.present;
				}
				browser
					.expect.element(selectElem('dropdownArrow')).to.be.present;
				return browser;
			},
			assertFieldDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.present;
				browser
					.expect.element(selectElem('selectField')).to.not.be.present;
				if (options.placeholder) {
					// Placeholder won't be there is the select field is filled in.
					browser
						.expect.element(selectElem('placeholder')).to.not.be.present;
				}
				browser
					.expect.element(selectElem('dropdownArrow')).to.not.be.present;
				return browser;
			},
			fillFieldInputs: function (browser, input, options) {
				browser
					.click(selectElem('selectField'))
					.api.keys([input.value, browser.api.Keys.ENTER]);
				return browser;
			},
			assertFieldInputs: function (browser, input, options) {
				browser
					.expect.element(selectElem('selectValue'))
					.text.to.equals(input.value);
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
