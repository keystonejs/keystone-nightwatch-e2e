module.exports = {
	defaultModelTestConfig: null,
	sections: {
		form: {
			selector: '.keystone-body .EditForm-container',
			sections: {},
			elements: {
				//
				// FORM LEVEL ELEMENTS
				//
				saveButton: 'button[data-button=update]',
				resetButton: 'button[data-button=reset]',
				deleteButton: 'button[data-button=delete]',
			},
			commands: [{
				//
				// FORM LEVEL COMMANDS
				//
			}],
		},
	},
	elements: {
		//
		// PAGE LEVEL ELEMENTS
		//
		listBreadcrumb: 'a[data-e2e-editform-header-back="true"]',
		searchInputIcon: '.EditForm__header__search input[class="FormInput EditForm__header__search-input"]',
		newItemButton: '.Toolbar__section button[data-e2e-item-create-button="true"]',

		flashMessage: '.Alert--success',
		flashError: '.Alert--danger',

		readOnlyNameHeader: '.EditForm__name-field h2',
		editableNameHeader: '.EditForm__name-field input[class*="item-name-field"',
		idLabel: '.EditForm__key-or-id span[class="EditForm__key-or-id__label"]',
		idValue: '.EditForm__key-or-id span[class="EditForm__key-or-id__field"]',
		metaHeader: '.EditForm h3[class="form-heading"]',
		metaCreatedAtLabel: '.EditForm .FormField[for="createdAt"] label[for="createdAt"]',
		metaCreatedAtValue: '.EditForm .FormField[for="createdAt"] .FormInput-noedit',
		metaCreatedByLabel: '.EditForm .FormField[for="createdBy"] label[for="createdBy"]',
		metaCreatedByValue: '.EditForm .FormField[for="createdBy"] .FormInput-noedit',
		metaUpdatedAtLabel: '.EditForm .FormField[for="updatedAt"] label[for="updatedAt"]',
		metaUpdatedAtValue: '.EditForm .FormField[for="updatedAt"] .FormInput-noedit',
		metaUpdatedByLabel: '.EditForm .FormField[for="updatedBy"] label[for="updatedBy"]',
		metaUpdatedByValue: '.EditForm .FormField[for="updatedBy"] .FormInput-noedit',
		saveButton: '.EditForm-container button[data-button=update]',
		resetButton: '.EditForm-container button[data-button=reset]',
		resetButtonText: '.EditForm-container button[data-button=reset] span',
		deleteButton: '.EditForm-container button[data-button=delete]',
		deleteButtonText: '.EditForm-container button[data-button=delete] span',
		firstRelationshipItemLink: 'div.Relationships > div > div > div > table > tbody > tr > td > a',
	},
	commands: [{
		//
		// PAGE LEVEL COMMANDS
		//
		setDefaultModelTestConfig: function (modelTestConfig) {
			this.defaultModelTestConfig = modelTestConfig;
			return this;
		},
		/**
		 * Asserts that the specified item field's UI is visible in the item screen.  This command calls into the
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
									throw new Error('adminUIItemScreen:assertFieldUIVisible command not defined in ' + field.name + ' field test object!');
								}
							} else {
								throw new Error('adminUIItemScreen:assertFieldUIVisible: invalid field name!');
							}
						} else {
							throw new Error('adminUIItemScreen:assertFieldUIVisible: invalid field modelTestConfig!');
						}
					} else {
						throw new Error('adminUIItemScreen:assertFieldUIVisible: No modelTestConfig given!');
					}
				});
			} else {
				throw new Error('adminUIItemScreen:assertFieldUIVisible: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is not visible in the item screen.  This command calls into the
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
									throw new Error('adminUIItemScreen:assertFieldUINotVisible command not defined in ' + field.name + ' field test object!');
								}
							} else {
								throw new Error('adminUIItemScreen:assertFieldUINotVisible: invalid field name!');
							}
						} else {
							throw new Error('adminUIItemScreen:assertFieldUINotVisible: invalid field modelTestConfig!');
						}
					} else {
						throw new Error('adminUIItemScreen:assertFieldUINotVisible: No modelTestConfig given!');
					}
				});
			} else {
				throw new Error('adminUIItemScreen:assertFieldUINotVisible: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's DOM is present in the item screen.  This command calls into the
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
									throw new Error('adminUIItemScreen:assertFieldDOMPresent command not defined in ' + field.name + ' field test object!');
								}
							} else {
								throw new Error('adminUIItemScreen:assertFieldDOMPresent: invalid field name!');
							}
						} else {
							throw new Error('adminUIItemScreen:assertFieldDOMPresent: invalid field modelTestConfig!');
						}
					} else {
						throw new Error('adminUIItemScreen:assertFieldDOMPresent: No modelTestConfig given!');
					}
				});
			} else {
				throw new Error('adminUIItemScreen:assertFieldDOMPresent: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's DOM is not present in the item screen.  This command calls into the
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
					if (ModelTestConfig) {
						form.section.list = new ModelTestConfig({ formSelector: form.selector });
						if (form.section.list) {
							var fieldTestObject = form.section.list[field.name];
							if (fieldTestObject) {
								if (fieldTestObject.commands && 'assertFieldDOMNotPresent' in fieldTestObject.commands) {
									form.section.list[field.name].commands.assertFieldDOMNotPresent(browser, field.options);
								} else {
									throw new Error('adminUIItemScreen:assertFieldDOMNotPresent command not defined in ' + field.name + ' field test object!');
								}
							} else {
								throw new Error('adminUIItemScreen:assertFieldDOMNotPresent: invalid field name!');
							}
						} else {
							throw new Error('adminUIItemScreen:assertFieldDOMNotPresent: invalid field modelTestConfig!');
						}
					} else {
						throw new Error('adminUIItemScreen:assertFieldDOMNotPresent: No modelTestConfig given!');
					}
				});
			} else {
				throw new Error('adminUIItemScreen:assertFieldDOMNotPresent: Invalid field specification!');
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
					var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
					if (ModelTestConfig) {
						form.section.list = new ModelTestConfig({ formSelector: form.selector });
						if (form.section.list) {
							var fieldTestObject = form.section.list[field.name];
							if (fieldTestObject) {
								if (fieldTestObject.commands && 'clickFieldUI' in fieldTestObject.commands) {
									form.section.list[field.name].commands.clickFieldUI(browser, field.click, field.options);
								} else {
									throw new Error('adminUIItemScreen:clickFieldUI command not defined in ' + field.name + ' field test object!');
								}
							} else {
								throw new Error('adminUIItemScreen:clickFieldUI: invalid field name!');
							}
						} else {
							throw new Error('adminUIItemScreen:clickFieldUI: invalid field modelTestConfig!');
						}
					} else {
						throw new Error('adminUIItemScreen:clickFieldUI: No modelTestConfig given!');
					}
				});
			} else {
				throw new Error('adminUIItemScreen:clickFieldUI: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Fills the specified field's inputs in the item screen.  This command calls into the
		 * fillFieldInputs command of the field under test, which gets passed the field.input and field.options.
		 *
		 * @param {Object} fields The array of fields to assert the UI visibility on.
		 * @param {String} field.name The name of the field under test.
		 * @param {Object} field.input The input to pass to the field test object command fillFieldInputs.
		 * @param {Object} field.options Any options required by the field test object command fillFieldInputs.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 */
		fillFieldInputs: function (fields) {
			var browser = this;
			var form = this.section.form;
			if (fields) {
				fields.forEach(function (field) {
					var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
					form.section.list = new ModelTestConfig({ formSelector: form.selector });
					if (form.section.list) {
						var fieldTestObject = form.section.list[field.name];
						if (fieldTestObject) {
							if (fieldTestObject.commands && 'fillFieldInputs' in fieldTestObject.commands) {
								form.section.list[field.name].commands.fillFieldInputs(browser, field.input, field.options);
							} else {
								throw new Error('adminUIItemScreen:fillFieldInputs command not defined in ' + field.name + ' field test object!');
							}
						} else {
							throw new Error('adminUIItemScreen:fillFieldInputs: invalid field name!');
						}
					} else {
						throw new Error('adminUIItemScreen:fillFieldInputs: invalid field modelTestConfig!');
					}
				});
			} else {
				throw new Error('adminUIItemScreen:fillFieldInputs: Invalid field specification!');
			}
			return this;
		},

		/**
		 * Asserts the field's inputs in the item screen are as specified.  This command calls into the
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
									throw new Error('adminUIItemScreen:assertFieldInputs command not defined in ' + field.name + ' field test object!');
								}
							} else {
								throw new Error('adminUIItemScreen:assertFieldInputs: invalid field name!');
							}
						} else {
							throw new Error('adminUIItemScreen:assertFieldInputs: invalid field modelTestConfig!');
						}
					} else {
						throw new Error('adminUIItemScreen:fillFieldInputs: invalid field modelTestConfig!');
					}
				});
			} else {
				throw new Error('adminUIItemScreen:assertFieldInputs: Invalid field specification!');
			}
			return this;
		},

		assertFlashMessage: function (message) {
			return this.expect.element('@flashMessage')
				.text.to.equal(message);
		},
		assertFlashError: function (message) {
			return this.expect.element('@flashError')
				.text.to.equal(message);
		},
		navitageToFirstRelationship: function () {
			return this
				.click('@firstRelationshipItemLink');
		},
		back: function () {
			return this
				.click('@listBreadcrumb');
		},
		new: function () {
			return this
				.click('@newItemButton');
		},
		save: function () {
			return this.section.form
				.click('@saveButton');
		},
		reset: function () {
			return this.section.form
				.click('@resetButton');
		},
		delete: function () {
			return this.section.form
				.click('@deleteButton');
		},
	}],
};
