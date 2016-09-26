var utils = require('../utils');

module.exports = function HtmlFieldTestObject (config) {
	var selectElem = function (elem) {
		return config.formSelector + ' ' + self.selector + ' ' + self.elements[elem];
	};
	var selectListScreenElem = function (elem) {
		return config.formSelector + ' ' + self.listScreenElements[elem];
	};
	var self = {
		selector: '.field-type-html[for="' + config.fieldName + '"]',
		elements: {
			label: '.FormLabel',
			value: 'textarea[name="' + config.fieldName + '"]',
			wysiwyg: 'iframe',
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
				if (options && options.wysiwyg) {
					browser
						.expect.element(selectElem('wysiwyg')).to.be.visible;
				} else {
					browser
						.expect.element(selectElem('value')).to.be.visible;
				}
				return browser;
			},
			assertFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.equal(utils.titlecase(config.fieldName));
				if (options && options.wysiwyg) {
					browser
						.expect.element(selectElem('wysiwyg')).to.not.be.visible;
				} else {
					browser
						.expect.element(selectElem('value')).to.not.be.visible;
				}
				return browser;
			},
			assertFieldDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.present;
				if (options && options.wysiwyg) {
					browser
						.expect.element(selectElem('wysiwyg')).to.be.present;
				} else {
					browser
						.expect.element(selectElem('value')).to.be.present;
				}
				return browser;
			},
			assertFieldDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.present;
				if (options && options.wysiwyg) {
					browser
						.expect.element(selectElem('wysiwyg')).to.not.be.present;
				} else {
					browser
						.expect.element(selectElem('value')).to.not.be.present;
				}
				return browser;
			},
			fillFieldInputs: function (browser, input) {
				if (input.options && input.options.wysiwyg) {
					browser
						.waitForElementVisible(selectElem('wysiwyg'))
						.click(selectElem('wysiwyg'));
					browser.api
						.execute(function (selector, input) {
							var body = document.querySelector('.field-type-html[for="description"]')
								.querySelector('iframe').contentDocument.querySelector('.mce-content-body');
							body.innerHTML = input.value;
						}, [self.selector, input]);
				} else {
					browser
						.clearValue(selectElem('value'))
						.setValue(selectElem('value'), input.value);
				}
				return browser;
			},
			assertFieldInputs: function (browser, input) {
				if (input.options && input.options.wysiwyg) {
					browser
						.waitForElementVisible(selectElem('wysiwyg'));
					browser.api
						.execute(function (selector) {
							var body = document.querySelector('.field-type-html[for="description"]')
								.querySelector('iframe').contentDocument.querySelector('.mce-content-body');
							return body.innerHTML;
						}, [self.selector], function (result) {
							console.log(result.value);
							browser.assert.equal(result.value, input.value);
						});
				} else {
					browser
						.waitForElementVisible(selectElem('value'));
					browser
						.getValue(selectElem('value'), function (result) {
							browser.api.assert.equal(result.state, 'success');
							browser.api.assert.equal(result.value, input.value);
						});
				}
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
