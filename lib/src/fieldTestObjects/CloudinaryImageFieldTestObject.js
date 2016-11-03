var utils = require('../utils');

module.exports = function CloudinaryImageFieldTestObject (config) {
	var selectElem = function (elem) {
		return config.formSelector + ' ' + self.selector + ' ' + self.elements[elem];
	};
	var selectListScreenElem = function (elem) {
		return config.formSelector + ' ' + self.listScreenElements[elem];
	};
	var self = {
		selector: '.field-type-cloudinaryimage[for="' + config.fieldName + '"]',
		elements: {
			label: 'label[for="' + config.fieldName + '"]',
			button: '.image-toolbar button',
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
					.expect.element(selectElem('button')).to.be.visible;
				return browser;
			},
			assertFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.equal(utils.titlecase(config.fieldName));
				browser
					.expect.element(selectElem('button')).to.not.be.visible;
				return browser;
			},
			assertFieldDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.present;
				browser
					.expect.element(selectElem('button')).to.be.present;
				return browser;
			},
			assertFieldDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.present;
				browser
					.expect.element(selectElem('button')).to.not.be.present;
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
				if (value === 'true') {
					browser
						.expect.element(selectListScreenElem('checked')).to.be.visible;
				} else if (value === 'false') {
					browser
						.expect.element(selectListScreenElem('notChecked')).to.be.visible;
				} else {
					browser
						.expect.element('UNDEFINED assertListScreenFieldValueEquals PROVIDED').to.be.visible;
				}
				return browser;
			},
			assertListScreenFieldValueContains: function (browser, value, options) {
				if (value === 'true') {
					browser
						.expect.element(selectListScreenElem('checked')).to.be.visible;
				} else if (value === 'false') {
					browser
						.expect.element(selectListScreenElem('notChecked')).to.be.visible;
				} else {
					browser
						.expect.element('UNDEFINED assertListScreenFieldValueContains PROVIDED').to.be.visible;
				}
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
