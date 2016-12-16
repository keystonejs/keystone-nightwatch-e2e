var utils = require('../utils');

module.exports = function CodeFieldTestObject (config) {
	var selectElem = function (elem) {
		return config.formSelector + ' ' + self.selector + ' ' + self.elements[elem];
	};
	var selectListScreenElem = function (elem) {
		return config.formSelector + ' ' + self.listScreenElements[elem];
	};
	var self = {
		selector: '.field-type-code[for="' + config.fieldName + '"]',
		elements: {
			label: 'label[for="' + config.fieldName + '"]',
			lineNumber: '.CodeMirror-gutter-wrapper > .CodeMirror-linenumber',
			codeMirror: '.CodeMirror-container',
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
					.expect.element(selectElem('lineNumber')).to.be.visible;
				browser
					.expect.element(selectElem('lineNumber')).text.to.equal('1');
				browser
					.expect.element(selectElem('codeMirror')).to.be.visible;
				return browser;
			},
			assertFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.equal(utils.titlecase(config.fieldName));
				browser
					.expect.element(selectElem('lineNumber')).to.not.be.visible;
				browser
					.expect.element(selectElem('lineNumber')).text.to.equal('1');
				browser
					.expect.element(selectElem('codeMirror')).to.not.be.visible;
				return browser;
			},
			assertFieldDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.present;
				browser
					.expect.element(selectElem('lineNumber')).to.be.present;
				browser
					.expect.element(selectElem('lineNumber')).text.to.equal('1');
				browser
					.expect.element(selectElem('codeMirror')).to.be.present;
				return browser;
			},
			assertFieldDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.present;
				browser
					.expect.element(selectElem('lineNumber')).to.not.be.present;
				browser
					.expect.element(selectElem('lineNumber')).text.to.equal('1');
				browser
					.expect.element(selectElem('codeMirror')).to.not.be.present;
				return browser;
			},
			fillFieldInputs: function (browser, input, options) {
				browser.api
					.execute(function (selector, input) {
						var x = document.querySelector(selector);
						var y = x.getElementsByClassName('CodeMirror')[0];
						y.CodeMirror.setValue(input.value);
					}, [self.selector, input]);
				return browser;
			},
			assertFieldInputs: function (browser, input, options) {
				browser.api
					.execute(function (selector) {
						var x = document.querySelector(selector);
						var y = x.getElementsByClassName('CodeMirror')[0];
						return y.CodeMirror.getValue();
					}, [self.selector], function (result) {
						browser.assert.equal(result.value, input.value);
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
