/**
 * @module adminUIInitialForm
 */

module.exports = {
	commands: [{
		/**
		 * Sets a default model test config object so that tests do not have to pass it in with each field level command.
		 * Tests can still override the default model test config object when calling any field level command.
		 *
		 * @param {Object} modelTestConfig The model test config that should be used by field level commands, if the
		 * 				   command does not pass it in directly.
		 */
		setDefaultModelTestConfig: function (modelTestConfig) {
			this.defaultModelTestConfig = modelTestConfig;
			return this;
		},

		/**
		 * Asserts that the specified create item screen element UI is visible.
		 *
		 * @param {string} element The element whose UI should be visible.
		 */
		assertElementIsVisible: function (element) {
			return this.expect.element('@' + element).to.be.visible;
		},

		/**
		 * Asserts that the specified create item screen element UI is not visible.
		 *
		 * @param {string} element The element whose UI should not be visible.
		 */
		assertElementIsNotVisible: function (element) {
			return this.expect.element('@' + element).to.not.be.visible;
		},

		/**
		 * Asserts that the specified create item screen element DOM is present.
		 *
		 * @param {string} element The element whose DOM should be present.
		 */
		assertElementIsPresent: function (element) {
			return this.expect.element('@' + element).to.be.present;
		},

		/**
		 * Asserts that the specified create item screen element DOM is not present.
		 *
		 * @param {string} element The element whose DOM should not be present.
		 */
		assertElementIsNotPresent: function (element) {
			return this.expect.element('@' + element).to.not.be.present;
		},

		/**
		 * Asserts that the specified create item screen element text equals the specified value.
		 *
		 * @param {string} element The element whose text should be compared to the input text.
		 * @param {String} text The text to compare against.
		 */
		assertElementTextEquals: function (element, text) {
			return this.expect.element('@' + element).text.to.equal(text);
		},

		/**
		 * Asserts that the specified create item screen element text not equals the specified value.
		 *
		 * @param {string} element The element whose text should be compared to the input text.
		 * @param {String} text The text to compare against.
		 */
		assertElementTextNotEquals: function (element, text) {
			return this.expect.element('@' + element).text.to.not.equal(text);
		},

		/**
		 * Asserts that the specified create item screen element text contains the specified value.
		 *
		 * @param {string} element The element whose text should contain the input text.
		 * @param {String} text The text to compare against.
		 */
		assertElementTextContains: function (element, text) {
			return this.expect.element('@' + element).text.to.contain(text);
		},

		/**
		 * Asserts that the specified app screen element has the specified attribute.
		 *
		 * @param {string} element The element whose UI should be visible.
		 * @param {string} attribute The attribute that should be present in the element.
		 * @param {string} value The value that the attribute should have.
		 */
		assertElementHasAttribute: function (element, attribute, value) {
			return this.expect.element('@' + element).to.have.attribute(attribute).which.contains(value);
		},

		/**
		 * Asserts that the specified item field's UI is visible in the initial form screen.  This command calls into the
		 * assertFieldUIVisible command of the field under test, which gets passed the field.options.
		 *
		 * @param {Object} fields The array of fields to assert the UI visibility on.
		 * @param {String} field.name The name of the field under test.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} field.options Any options required by the field test object command assertFieldUIVisible.
		 */
		assertFieldUIVisible: function (fields) {
			var browser = this;
			var form = this.section.form;
			if (fields) {
				fields.forEach(function (field) {
					var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
					if (ModelTestConfig) {
						form.section.list = new ModelTestConfig({ formSelector: form.selector });
						if (form.section.list) {
							var fieldTestObject = form.section.list[field.name];
							if (fieldTestObject) {
								if (fieldTestObject.commands && 'assertFieldUIVisible' in fieldTestObject.commands) {
									form.section.list[field.name].commands.assertFieldUIVisible(browser, field.options);
								} else {
									throw new Error('adminUIInitialForm: assertFieldUIVisible command not defined in ' + field.name + ' field test object!');
								}
							} else {
								throw new Error('adminUIInitialForm:assertFieldUIVisible: invalid field name!');
							}
						} else {
							throw new Error('adminUIInitialForm:assertFieldUIVisible: invalid field modelTestConfig!');
						}
					} else {
						throw new Error('adminUIInitialForm:assertFieldUIVisible: No modelTestConfig given!');
					}
				});
			} else {
				throw new Error('adminUIInitialForm:assertFieldUIVisible: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is not visible in the initial form screen.  This command calls into the
		 * assertFieldUINotVisible command of the field under test, which gets passed the field.options.
		 *
		 * @param {Object} fields The array of fields to assert the UI visibility on.
		 * @param {String} field.name The name of the field under test.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} field.options Any options required by the field test object command assertFieldUINotVisible.
		 */
		assertFieldUINotVisible: function (fields) {
			var browser = this;
			var form = this.section.form;
			if (fields) {
				fields.forEach(function (field) {
					var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
					if (ModelTestConfig) {
						form.section.list = new ModelTestConfig({ formSelector: form.selector });
						if (form.section.list) {
							var fieldTestObject = form.section.list[field.name];
							if (fieldTestObject) {
								if (fieldTestObject.commands && 'assertFieldUINotVisible' in fieldTestObject.commands) {
									form.section.list[field.name].commands.assertFieldUINotVisible(browser, field.options);
								} else {
									throw new Error('adminUIInitialForm: assertFieldUINotVisible command not defined in ' + field.name + ' field test object!');
								}
							} else {
								throw new Error('adminUIInitialForm:assertFieldUINotVisible: invalid field name!');
							}
						} else {
							throw new Error('adminUIInitialForm:assertFieldUINotVisible: invalid field modelTestConfig!');
						}
					} else {
						throw new Error('adminUIInitialForm:assertFieldUINotVisible: No modelTestConfig given!');
					}
				});
			} else {
				throw new Error('adminUIInitialForm:assertFieldUINotVisible: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's DOM is present in the initial form screen.  This command calls into the
		 * assertFieldDOMPresent command of the field under test, which gets passed the field.options.
		 *
		 * @param {Object} fields The array of fields to assert the DOM presence on.
		 * @param {String} field.name The name of the field under test.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} field.options Any options required by the field test object command assertFieldDOMPresent.
		 */
		assertFieldDOMPresent: function (fields) {
			var browser = this;
			var form = this.section.form;
			if (fields) {
				fields.forEach(function (field) {
					var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
					if (ModelTestConfig) {
						form.section.list = new ModelTestConfig({ formSelector: form.selector });
						if (form.section.list) {
							var fieldTestObject = form.section.list[field.name];
							if (fieldTestObject) {
								if (fieldTestObject.commands && 'assertFieldDOMPresent' in fieldTestObject.commands) {
									form.section.list[field.name].commands.assertFieldDOMPresent(browser, field.options);
								} else {
									throw new Error('adminUIInitialForm: assertFieldDOMPresent command not defined in ' + field.name + ' field test object!');
								}
							} else {
								throw new Error('adminUIInitialForm:assertFieldDOMPresent: invalid field name!');
							}
						} else {
							throw new Error('adminUIInitialForm:assertFieldDOMPresent: invalid field modelTestConfig!');
						}
					} else {
						throw new Error('adminUIInitialForm:assertFieldDOMPresent: No modelTestConfig given!');
					}
				});
			} else {
				throw new Error('adminUIInitialForm:assertFieldDOMPresent: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's DOM is not present in the initial form screen.  This command calls into the
		 * assertFieldDOMNotPresent command of the field under test, which gets passed the field.options.
		 *
		 * @param {Object} fields The array of fields to assert the DOM presence on.
		 * @param {String} field.name The name of the field under test.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} field.options Any options required by the field test object command assertFieldDOMNotPresent.
		 */
		assertFieldDOMNotPresent: function (fields) {
			var browser = this;
			var form = this.section.form;
			if (fields) {
				fields.forEach(function (field) {
					var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
					form.section.list = new ModelTestConfig({ formSelector: form.selector });
					if (form.section.list) {
						var fieldTestObject = form.section.list[field.name];
						if (fieldTestObject) {
							if (fieldTestObject.commands && 'assertFieldDOMNotPresent' in fieldTestObject.commands) {
								form.section.list[field.name].commands.assertFieldDOMNotPresent(browser, field.options);
							} else {
								throw new Error('adminUIInitialForm: assertFieldDOMNotPresent command not defined in ' + field.name + ' field test object!');
							}
						} else {
							throw new Error('adminUIInitialForm:assertFieldDOMNotPresent: invalid field name!');
						}
					} else {
						throw new Error('adminUIInitialForm:assertFieldDOMNotPresent: invalid field modelTestConfig!');
					}
				});
			} else {
				throw new Error('adminUIInitialForm:assertFieldDOMNotPresent: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Clicks the specified field's click area in the create item screen.  This command calls into the
		 * clickFieldUI command of the field under test, which gets passed the field.input and field.options.
		 *
		 * @param {Object} fields The array of fields to click on.
		 * @param {String} field.name The name of the field under test.
		 * @param {Object} field.click The clickable area to pass to the field test object command clickFieldUI.
		 * @param {Object} field.options Any options required by the field test object command clickFieldUI.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 */
		clickFieldUI: function (fields) {
			var browser = this;
			var form = this.section.form;
			if (fields) {
				fields.forEach(function (field) {
					var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
					if (ModelTestConfig) {
						form.section.list = new ModelTestConfig({ formSelector: form.selector });
						if (form.section.list) {
							var fieldTestObject = form.section.list[field.name];
							if (fieldTestObject) {
								if (fieldTestObject.commands && 'clickFieldUI' in fieldTestObject.commands) {
									form.section.list[field.name].commands.clickFieldUI(browser, field.click, field.options);
								} else {
									throw new Error('adminUIInitialForm:clickFieldUI command not defined in ' + field.name + ' field test object!');
								}
							} else {
								throw new Error('adminUIInitialForm:clickFieldUI: invalid field name!');
							}
						} else {
							throw new Error('adminUIInitialForm:clickFieldUI: invalid field modelTestConfig!');
						}
					} else {
						throw new Error('adminUIInitialForm:clickFieldUI: No modelTestConfig given!');
					}
				});
			} else {
				throw new Error('adminUIInitialForm:clickFieldUI: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Fills the specified item field's inputs in the initial form screen.  This command calls into the
		 * fillFieldInputs command of the field under test, which gets passed the field.input and field.options.
		 *
		 * @param {Object} fields The array of fields to assert the UI visibility on.
		 * @param {String} field.name The name of the field under test.
		 * @param {Object} field.input The inputs to pass to the field test object command fillFieldInputs.
		 * @param {Object} field.options Any options required by the field test object command fillFieldInputs.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 */
		fillFieldInputs: function (fields) {
			var browser = this;
			var form = this.section.form;
			if (fields) {
				fields.forEach(function (field) {
					var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
					if (ModelTestConfig) {
						form.section.list = new ModelTestConfig({ formSelector: form.selector });
						if (form.section.list) {
							var fieldTestObject = form.section.list[field.name];
							if (fieldTestObject) {
								if (fieldTestObject.commands && 'fillFieldInputs' in fieldTestObject.commands) {
									form.section.list[field.name].commands.fillFieldInputs(browser, field.input, field.options);
								} else {
									throw new Error('adminUIInitialForm: fillFieldInputs command not defined in ' + field.name + ' field test object!');
								}
							} else {
								throw new Error('adminUIInitialForm:fillFieldInputs: invalid field name!');
							}
						} else {
							throw new Error('adminUIInitialForm:fillFieldInputs: invalid field modelTestConfig!');
						}
					}
				});
			} else {
				throw new Error('adminUIInitialForm:fillFieldInputs: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Asserts the item field's inputs in the initial form screen are as specified.  This command calls into the
		 * assertFieldInputs command of the field under test, which gets passed the field.input and field.options.
		 *
		 * @param {Object} fields The array of fields to assert the UI visibility on.
		 * @param {String} field.name The name of the field under test.
		 * @param {Object} field.input The input to pass to the field test object command assertFieldInputs.
		 * @param {Object} field.options Any options required by the field test object command assertFieldInputs.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 */
		assertFieldInputs: function (fields) {
			var browser = this;
			var form = this.section.form;
			if (fields) {
				fields.forEach(function (field) {
					var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
					if (ModelTestConfig) {
						form.section.list = new ModelTestConfig({ formSelector: form.selector });
						if (form.section.list) {
							var fieldTestObject = form.section.list[field.name];
							if (fieldTestObject) {
								if (fieldTestObject.commands && 'assertFieldInputs' in fieldTestObject.commands) {
									form.section.list[field.name].commands.assertFieldInputs(browser, field.input, field.options);
								} else {
									throw new Error('adminUIInitialForm: assertFieldInputs command not defined in ' + field.name + ' field test object!');
								}
							} else {
								throw new Error('adminUIInitialForm:assertFieldInputs: invalid field name!');
							}
						} else {
							throw new Error('adminUIInitialForm:assertFieldInputs: invalid field modelTestConfig!');
						}
					} else {
						throw new Error('adminUIInitialForm:assertFieldInputs: invalid field modelTestConfig!');
					}
				});
			} else {
				throw new Error('adminUIInitialForm:assertFieldInputs: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Saves the initial created item form.
		 */
		save: function () {
			return this.section.form
				.click('@createButton');
		},

		/**
		 * Cancels the initial create form.
		 */
		cancel: function (config) {
			return this.section.form
				.click('@cancelButton');
		},
	}],
	sections: {
		form: {
			selector: '.Modal-dialog .create-form',
			sections: {},
			elements: {
				//
				// FORM LEVEL ELEMENTS
				//
				createButton: 'button[class="Button Button--success"]',
				cancelButton: 'button[class="Button Button--link-cancel"]',
			},
			commands: [{}],
		},
	},
	/**
	 * The admin UI create item screen elements.
	 */
	elements: {
		//
		// PAGE LEVEL ELEMENTS
		//

		/**
		 * The element for the flash error message.
		 */
		flashError: '.Alert--danger',
	},
	defaultModelTestConfig: null,
};
