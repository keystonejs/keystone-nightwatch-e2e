module.exports = {
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
	elements: {
		//
		// PAGE LEVEL ELEMENTS
		//
		flashError: '.Alert--danger',
	},
	commands: [{
		//
		// PAGE LEVEL COMMANDS
		//
		assertFlashError: function (message) {
			return this.expect.element('@flashError')
				.text.to.equal(message);
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
				form.section.list = new field.modelTestConfig({ formSelector: form.selector });
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
				}});
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
				form.section.list = new field.modelTestConfig({ formSelector: form.selector });
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
				}});
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
				form.section.list = new field.modelTestConfig({ formSelector: form.selector });
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
				}});
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
				form.section.list = new field.modelTestConfig({ formSelector: form.selector });
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
				}});
			} else {
				throw new Error('adminUIInitialForm:assertFieldDOMNotPresent: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Clicks the specified field's click area in the item screen.  This command calls into the
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
				form.section.list = new field.modelTestConfig({ formSelector: form.selector });
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
				}});
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
				form.section.list = new field.modelTestConfig({ formSelector: form.selector });
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
				}});
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
				form.section.list = new field.modelTestConfig({ formSelector: form.selector });
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
				}});
			} else {
				throw new Error('adminUIInitialForm:assertFieldInputs: Invalid field specification!');
			}
			return this;
		},

		save: function () {
			return this.section.form
				.click('@createButton');
		},
		cancel: function (config) {
			return this.section.form
				.click('@cancelButton');
		},
	}],
};
