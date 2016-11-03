var utils = require('../utils');

module.exports = function DateArrayFieldTestObject (config) {
	var selectElem = function (elem) {
		return config.formSelector + ' ' + self.selector + ' ' + self.elements[elem];
	};
	var selectListScreenElem = function (elem) {
		return config.formSelector + ' ' + self.listScreenElements[elem];
	};
	var self = {
		selector: '.field-type-datearray[for="' + config.fieldName + '"]',
		elements: {
			label: 'label[for="' + config.fieldName + '"]',
			addButton: '.Button--default',
			date1: '.FormField:nth-of-type(1) input[type="text"]',
			date2: '.FormField:nth-of-type(2) input[type="text"]',
			date1Delete: '.FormField:nth-of-type(1) .Button--link-cancel',
			date2Delete: '.FormField:nth-of-type(2) .Button--link-cancel',
		},
		listScreenElements: {
			ui: 'a.ItemList__value',
			value: 'a.ItemList__value',
			link: 'a',
		},
		commands: {
			clickFieldUI: function (browser, elem, options) {
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
				if (options !== undefined && options.dateInputs !== undefined) {
					options.dateInputs.forEach(function (dateInput) {
						browser
							.expect.element(selectElem(dateInput)).to.be.visible;
						browser
							.expect.element(selectElem(dateInput + 'Delete')).to.be.visible;
					});
				}
				return browser;
			},
			assertFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.equal(utils.titlecase(config.fieldName));
				browser
					.expect.element(selectElem('addButton')).to.not.be.visible;
				if (options !== undefined && options.dateInputs !== undefined) {
					options.dateInputs.forEach(function (dateInput) {
						browser
							.expect.element(selectElem(dateInput)).to.not.be.visible;
						browser
							.expect.element(selectElem(dateInput + 'Delete')).to.not.be.visible;
					});
				}
				return browser;
			},
			assertFieldDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.present;
				browser
					.expect.element(selectElem('addButton')).to.be.present;
				if (options !== undefined && options.dateInputs !== undefined) {
					options.dateInputs.forEach(function (dateInput) {
						browser
							.expect.element(selectElem(dateInput)).to.be.present;
						browser
							.expect.element(selectElem(dateInput + 'Delete')).to.be.present;
					});
				}
				return browser;
			},
			assertFieldDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.present;
				browser
					.expect.element(selectElem('addButton')).to.not.be.present;
				if (options !== undefined && options.dateInputs !== undefined) {
					options.dateInputs.forEach(function (dateInput) {
						browser
							.expect.element(selectElem(dateInput)).to.not.be.present;
						browser
							.expect.element(selectElem(dateInput + 'Delete')).to.not.be.present;
					});
				}
				return browser;
			},
			fillFieldInputs: function (browser, input, options) {
				var dateInputs = Object.keys(input);
				dateInputs.forEach(function (dateInput) {
					browser
						.clearValue(selectElem(dateInput))
						.setValue(selectElem(dateInput), input[dateInput]);
				});
				return browser;
			},
			assertFieldInputs: function (browser, input, options) {
				var dateInputs = Object.keys(input);
				dateInputs.forEach(function (dateInput) {
					browser
						.getValue(selectElem(dateInput), function (result) {
							browser.api.assert.equal(result.state, 'success');
							browser.api.assert.equal(result.value, input[dateInput]);
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
