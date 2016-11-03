var utils = require('../utils');

module.exports = function MarkdownFieldTestObject (config) {
	var selectElem = function (elem) {
		return config.formSelector + ' ' + self.selector + ' ' + self.elements[elem];
	};
	var selectListScreenElem = function (elem) {
		return config.formSelector + ' ' + self.listScreenElements[elem];
	};
	var self = {
		selector: '.field-type-markdown[for="' + config.fieldName + '"]',
		elements: {
			label: 'label[for="' + config.fieldName + '"]',
			value: 'textarea[name="' + config.fieldName + '.md"]',
			bold: 'button[title="Bold"]',
			italic: 'button[title="Italic"]',
			h1: 'button[title="Heading 1"]',
			h2: 'button[title="Heading 2"]',
			h3: 'button[title="Heading 3"]',
			h4: 'button[title="Heading 4"]',
			link: 'button[title="URL/Link"]',
			image: 'button[title="Image"]',
			ul: 'button[title="Unordered List"]',
			ol: 'button[title="Ordered List"]',
			quote: 'button[title="Quote"]',
			code: 'button[title="Code"]',
			previewToggle: 'button[title="Preview"]',
			preview: '.md-editor__preview',
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
					.expect.element(selectElem('value')).to.be.visible;
				browser
					.expect.element(selectElem('bold')).to.be.visible;
				browser
					.expect.element(selectElem('italic')).to.be.visible;
				browser
					.expect.element(selectElem('h1')).to.be.visible;
				browser
					.expect.element(selectElem('h2')).to.be.visible;
				browser
					.expect.element(selectElem('h3')).to.be.visible;
				browser
					.expect.element(selectElem('h4')).to.be.visible;
				browser
					.expect.element(selectElem('link')).to.be.visible;
				browser
					.expect.element(selectElem('image')).to.be.visible;
				browser
					.expect.element(selectElem('ul')).to.be.visible;
				browser
					.expect.element(selectElem('ol')).to.be.visible;
				browser
					.expect.element(selectElem('quote')).to.be.visible;
				browser
					.expect.element(selectElem('code')).to.be.visible;
				browser
					.expect.element(selectElem('previewToggle')).to.be.visible;
				return browser;
			},
			assertFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.equal(utils.titlecase(config.fieldName));
				browser
					.expect.element(selectElem('value')).to.not.be.visible;
				browser
					.expect.element(selectElem('bold')).to.not.be.visible;
				browser
					.expect.element(selectElem('italic')).to.not.be.visible;
				browser
					.expect.element(selectElem('h1')).to.not.be.visible;
				browser
					.expect.element(selectElem('h2')).to.not.be.visible;
				browser
					.expect.element(selectElem('h3')).to.not.be.visible;
				browser
					.expect.element(selectElem('h4')).to.not.be.visible;
				browser
					.expect.element(selectElem('link')).to.not.be.visible;
				browser
					.expect.element(selectElem('image')).to.not.be.visible;
				browser
					.expect.element(selectElem('ul')).to.not.be.visible;
				browser
					.expect.element(selectElem('ol')).to.not.be.visible;
				browser
					.expect.element(selectElem('quote')).to.not.be.visible;
				browser
					.expect.element(selectElem('code')).to.not.be.visible;
				browser
					.expect.element(selectElem('previewToggle')).to.not.be.visible;
				return browser;
			},
			assertFieldDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.present;
				browser
					.expect.element(selectElem('value')).to.be.present;
				browser
					.expect.element(selectElem('bold')).to.be.present;
				browser
					.expect.element(selectElem('italic')).to.be.present;
				browser
					.expect.element(selectElem('h1')).to.be.present;
				browser
					.expect.element(selectElem('h2')).to.be.present;
				browser
					.expect.element(selectElem('h3')).to.be.present;
				browser
					.expect.element(selectElem('h4')).to.be.present;
				browser
					.expect.element(selectElem('link')).to.be.present;
				browser
					.expect.element(selectElem('image')).to.be.present;
				browser
					.expect.element(selectElem('ul')).to.be.present;
				browser
					.expect.element(selectElem('ol')).to.be.present;
				browser
					.expect.element(selectElem('quote')).to.be.present;
				browser
					.expect.element(selectElem('code')).to.be.present;
				browser
					.expect.element(selectElem('previewToggle')).to.be.present;
				return browser;
			},
			assertFieldDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.present;
				browser
					.expect.element(selectElem('value')).to.not.be.present;
				browser
					.expect.element(selectElem('bold')).to.not.be.present;
				browser
					.expect.element(selectElem('italic')).to.not.be.present;
				browser
					.expect.element(selectElem('h1')).to.not.be.present;
				browser
					.expect.element(selectElem('h2')).to.not.be.present;
				browser
					.expect.element(selectElem('h3')).to.not.be.present;
				browser
					.expect.element(selectElem('h4')).to.not.be.present;
				browser
					.expect.element(selectElem('link')).to.not.be.present;
				browser
					.expect.element(selectElem('image')).to.not.be.present;
				browser
					.expect.element(selectElem('ul')).to.not.be.present;
				browser
					.expect.element(selectElem('ol')).to.not.be.present;
				browser
					.expect.element(selectElem('quote')).to.not.be.present;
				browser
					.expect.element(selectElem('code')).to.not.be.present;
				browser
					.expect.element(selectElem('previewToggle')).to.not.be.present;
				return browser;
			},
			fillFieldInputs: function (browser, input, options) {
				browser
					.clearValue(selectElem('value'))
					.setValue(selectElem('value'), input.md);
				return browser;
			},
			assertFieldInputs: function (browser, input, options) {
				if (input.md !== undefined) {
					browser
						.waitForElementVisible(selectElem('value'))
						.getValue(selectElem('value'), function (result) {
							browser.api.assert.equal(result.state, 'success');
							browser.api.assert.equal(result.value, input.md);
						});
				} else if (input.html !== undefined) {
					browser.api
						.execute(function (selector) {
							var x = document.querySelector(selector);
							return x.innerHTML;
						}, [self.elements.preview], function (result) {
							browser.assert.equal(result.value, input.html);
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
