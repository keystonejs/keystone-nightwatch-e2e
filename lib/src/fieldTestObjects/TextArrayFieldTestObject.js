var utils = require('../utils');

module.exports = function TextArrayFieldTestObject (config) {
	var selectElem = function (elem) {
		return config.formSelector + ' ' + self.selector + ' ' + self.elements[elem];
	};
	var selectListScreenElem = function (elem) {
		return config.formSelector + ' ' + self.listScreenElements[elem];
	};
	var self = {
		selector: '.field-type-textarray[for="' + config.fieldName + '"]',
		elements: {
			label: 'label[for="' + config.fieldName + '"]',
			addButton: '.Button--default',
			text1: '.FormField:nth-of-type(1) input[type="text"]',
			text2: '.FormField:nth-of-type(2) input[type="text"]',
			text1Delete: '.FormField:nth-of-type(1) .Button--link-cancel',
			text2Delete: '.FormField:nth-of-type(2) .Button--link-cancel',
		},
		listScreenElements: {
			ui: 'a.ItemList__value',
			value: 'a.ItemList__value',
			link: 'a',
		},
		commands: {
			clickFieldUI: function (browser, elem) {
				browser.click(selectElem(elem));
				return browser;
			},
			assertFieldUIVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.equal(utils.titlecase(config.fieldName));
				browser
					.expect.element(selectElem('addButton')).to.be.visible;
				if (options !== undefined && options.textInputs !== undefined) {
					options.textInputs.forEach(function (textInput) {
						browser
							.expect.element(selectElem(textInput)).to.be.visible;
						browser
							.expect.element(selectElem(textInput + 'Delete')).to.be.visible;
					});
				}
				return browser;
			},
			assertFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.visible;
				browser
					.expect.element(selectElem('addButton')).to.not.be.visible;
				if (options !== undefined && options.textInputs !== undefined) {
					options.textInputs.forEach(function (textInput) {
						browser
							.expect.element(selectElem(textInput)).to.not.be.visible;
						browser
							.expect.element(selectElem(textInput + 'Delete')).to.not.be.visible;
					});
				}
				return browser;
			},
			assertFieldDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.present;
				browser
					.expect.element(selectElem('addButton')).to.be.present;
				if (options !== undefined && options.textInputs !== undefined) {
					options.textInputs.forEach(function (textInput) {
						browser
							.expect.element(selectElem(textInput)).to.be.present;
						browser
							.expect.element(selectElem(textInput + 'Delete')).to.be.present;
					});
				}
				return browser;
			},
			assertFieldDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.present;
				browser
					.expect.element(selectElem('addButton')).to.not.be.present;
				if (options !== undefined && options.textInputs !== undefined) {
					options.textInputs.forEach(function (textInput) {
						browser
							.expect.element(selectElem(textInput)).to.not.be.present;
						browser
							.expect.element(selectElem(textInput + 'Delete')).to.not.be.present;
					});
				}
				return browser;
			},
			fillFieldInputs: function (browser, input, options) {
				var textInputs = Object.keys(input);
				textInputs.forEach(function (textInput) {
					browser
						.clearValue(selectElem(textInput))
						.setValue(selectElem(textInput), input[textInput]);
				});
				return browser;
			},
			assertFieldInputs: function (browser, input, options) {
				var textInputs = Object.keys(input);
				textInputs.forEach(function (textInput) {
					browser
						.getValue(selectElem(textInput), function (result) {
							browser.api.assert.equal(result.state, 'success');
							browser.api.assert.equal(result.value, input[textInput]);
						});
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
