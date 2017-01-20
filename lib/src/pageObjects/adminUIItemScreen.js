/**
 * This module defines the commands an e2e test client may execute against keystone's item edit form screen.
 * When using the assertElement* commands, you may specify one of the predefined element selector properties
 * by prefixing it with the '@' sign or you can specify a string representing your own element selector.
 * See {@link https://github.com/keystonejs/keystone/tree/master/test/e2e/adminUI/tests/group005Item|usage example},
 * {@link https://github.com/keystonejs/keystone/tree/master/test/e2e/adminUI/tests/group006Fields|usage example}
 *
 * @module adminUIItemScreen
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
		 * Asserts that the specified edit item screen element UI is visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose UI should be visible.
		 */
		assertElementIsVisible: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.be.visible;
				} else {
					throw new Error('adminUIItemScreen:must specify an element!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified edit item screen element UI is not visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose UI should not be visible.
		 */
		assertElementIsNotVisible: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.not.be.visible;
				} else {
					throw new Error('adminUIItemScreen:must specify an element!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified edit item screen element DOM is present.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose DOM should be present.
		 */
		assertElementIsPresent: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.be.present;
				} else {
					throw new Error('adminUIItemScreen:must specify an element!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified edit item screen element DOM is not present.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose DOM should not be present.
		 */
		assertElementIsNotPresent: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.not.be.present;
				} else {
					throw new Error('adminUIItemScreen:must specify an element!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified edit item screen element text equals the specified value.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose text should be compared to the input text.
		 * @param {String} config.text The text to compare against.
		 */
		assertElementTextEquals: function (config) {
			if (config) {
				if (config.element && config.text) {
					this.expect.element(config.element).text.to.equal(config.text);
				} else {
					throw new Error('adminUIItemScreen:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified edit item screen element text not equals the specified value.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose text should be compared to the input text.
		 * @param {String} config.text The text to compare against.
		 */
		assertElementTextNotEquals: function (config) {
			if (config) {
				if (config.element && config.text) {
					this.expect.element(config.element).text.to.not.equal(config.text);
				} else {
					throw new Error('adminUIItemScreen:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified edit item screen element text contains the specified value.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose text should contain the input text.
		 * @param {String} config.text The text to compare against.
		 */
		assertElementTextContains: function (config) {
			if (config) {
				if (config.element && config.text) {
					this.expect.element(config.element).text.to.contain(config.text);
				} else {
					throw new Error('adminUIItemScreen:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified edit item screen element has the specified attribute.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose UI should be visible.
		 * @param {string} config.attribute The attribute that should be present in the element.
		 * @param {string} config.value The value that the attribute should have.
		 */
		assertElementHasAttribute: function (config) {
			if (config) {
				if (config.element && config.attribute && config.value) {
					this.expect.element(config.element).to.have.attribute(config.attribute).which.contains(config.value);
				} else {
					throw new Error('adminUIItemScreen:must specify a config element, attribute, and value!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is visible in the edit item screen.  This command calls into the
		 * assertFieldUIVisible command of the field under test, which gets passed the field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert the UI visibility on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} config.field.options Any options required by the field test object command assertFieldUIVisible.
		 */
		assertFieldUIVisible: function (config) {
			var browser = this;
			var form = this.section.form;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
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
					throw new Error('adminUIItemScreen:assertFieldUIVisible: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is not visible in the edit item screen.  This command calls into the
		 * assertFieldUINotVisible command of the field under test, which gets passed the field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert the UI visibility on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} config.field.options Any options required by the field test object command assertFieldUINotVisible.
		 */
		assertFieldUINotVisible: function (config) {
			var browser = this;
			var form = this.section.form;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
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
					throw new Error('adminUIItemScreen:assertFieldUINotVisible: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's DOM is present in the edit item screen.  This command calls into the
		 * assertFieldDOMPresent command of the field under test, which gets passed the field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert the DOM presence on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} config.field.options Any options required by the field test object command assertFieldDOMPresent.
		 */
		assertFieldDOMPresent: function (config) {
			var browser = this;
			var form = this.section.form;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
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
					throw new Error('adminUIItemScreen:assertFieldDOMPresent: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's DOM is not present in the edit item screen.  This command calls into the
		 * assertFieldDOMNotPresent command of the field under test, which gets passed the field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert the DOM presence on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} config.field.options Any options required by the field test object command assertFieldDOMNotPresent.
		 */
		assertFieldDOMNotPresent: function (config) {
			var browser = this;
			var form = this.section.form;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
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
					throw new Error('adminUIItemScreen:assertFieldDOMNotPresent: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Clicks the specified field's click area in the edit item screen.  This command calls into the
		 * clickFieldUI command of the field under test, which gets passed the field.input and field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to click on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {Object} field.click The clickable area to pass to the field test object command clickFieldUI.
		 * @param {Object} config.field.options Any options required by the field test object command clickFieldUI.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 */
		clickFieldUI: function (config) {
			var browser = this;
			var form = this.section.form;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
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
					throw new Error('adminUIItemScreen:clickFieldUI: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Fills the specified field's inputs in the edit item screen.  This command calls into the
		 * fillFieldInputs command of the field under test, which gets passed the field.input and field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert the UI visibility on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {Object} field.input The input to pass to the field test object command fillFieldInputs.
		 * @param {Object} config.field.options Any options required by the field test object command fillFieldInputs.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 */
		fillFieldInputs: function (config) {
			var browser = this;
			var form = this.section.form;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
						var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
						form.section.list = new ModelTestConfig({ formSelector: form.selector });
						if (form.section.list) {
							var fieldTestObject = form.section.list[field.name];
							if (fieldTestObject) {
								if (fieldTestObject.commands && 'fillFieldInputs' in fieldTestObject.commands) {
									form.section.list[field.name].commands.fillFieldInputs(browser, field.input, field.options);
									browser.api.pause(1000);
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
					throw new Error('adminUIItemScreen:fillFieldInputs: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts the field's inputs in the edit item screen are as specified.  This command calls into the
		 * assertFieldInputs command of the field under test, which gets passed the field.input and field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert the UI visibility on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {Object} field.input The input to pass to the field test object command assertFieldInputs.
		 * @param {Object} config.field.options Any options required by the field test object command assertFieldInputs.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 */
		assertFieldInputs: function (config) {
			var browser = this;
			var form = this.section.form;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
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
					throw new Error('adminUIItemScreen:assertFieldInputs: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIItemScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Navigates to the first relationship in the edit item form.
		 *
		 * TODO:  this should be refactor to be able to navigate to any relationship!
		 */
		navitageToFirstRelationship: function () {
			return this
				.moveToElement('@firstRelationshipItemLink', 0, 0)
				.click('@firstRelationshipItemLink');
		},

		/**
		 * Navigate back to the list screen from the edit item form.
		 */
		back: function () {
			return this
				.moveToElement('@listBreadcrumb', 0, 0)
				.click('@listBreadcrumb');
		},

		/**
		 * Creates a new item off the edit item form.
		 */
		new: function () {
			return this
				.moveToElement('@newItemButton', 0, 0)
				.click('@newItemButton');
		},

		/**
		 * Saves the edited item form.
		 */
		save: function () {
			return this.section.form
				.moveToElement('@saveButton', 0, 0)
				.click('@saveButton');
		},

		/**
		 * Resets pending changes in the edit item form.
		 */
		reset: function () {
			return this.section.form
				.moveToElement('@resetButton', 0, 0)
				.click('@resetButton');
		},

		/**
		 * Deletes the item being edited.
		 */
		delete: function () {
			return this.section.form
				.moveToElement('@deleteButton', 0, 0)
				.click('@deleteButton');
		},
	}],
	sections: {
		form: {
			selector: '.EditForm-container',
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
	/**
  	 * @property {string} listBreadcrumb The element used to ID the back to list breadcrumb.
  	 * @property {string} searchInputIcon The element used to ID the search input icon.
  	 * @property {string} newItemButton The element used to ID the new item button.
  	 * @property {string} flashMessage The element used to ID the success flash message.
  	 * @property {string} flashError The element used to ID the error flash message.
  	 * @property {string} readOnlyNameHeader The element used to ID the read-only name header.
  	 * @property {string} editableNameHeader The element used to ID the editable name header.
  	 * @property {string} idLabel The element used to ID the item id label.
  	 * @property {string} idValue The element used to ID the item id value.
  	 * @property {string} metaHeader The element used to ID the meta data header.
  	 * @property {string} metaCreatedAtLabel The element used to ID the meta data header created-at label.
  	 * @property {string} metaCreatedAtValue The element used to ID the meta data header created-at value.
  	 * @property {string} metaCreatedByLabel The element used to ID the meta data header created-by label.
  	 * @property {string} metaCreatedByValue The element used to ID the meta data header created-by value.
  	 * @property {string} metaUpdatedAtLabel The element used to ID the meta data header updated-at label.
  	 * @property {string} metaUpdatedAtValue The element used to ID the meta data header updated-at value.
  	 * @property {string} metaUpdatedByLabel The element used to ID the meta data header updated-by label.
  	 * @property {string} metaUpdatedByValue The element used to ID the meta data header updated-by value.
  	 * @property {string} saveButton The element used to ID the save button.
  	 * @property {string} resetButton The element used to ID the reset button.
  	 * @property {string} resetButtonText The element used to ID the reset button text.
  	 * @property {string} deleteButton The element used to ID the delete button.
  	 * @property {string} deleteButtonText The element used to ID the delete button text.
  	 * @property {string} firstRelationshipItemLink The element used to ID the first relationship item link.
	 */
	elements: {
		//
		// PAGE LEVEL ELEMENTS
		//

		listBreadcrumb: 'a[data-e2e-editform-header-back="true"]',
		searchInputIcon: '[data-e2e-search-icon]',
		newItemButton: '.Toolbar__section button[data-e2e-item-create-button="true"]',
		flashMessage: 'div[data-alert-type="success"]',
		flashError: 'div[data-alert-type="danger"]',
		readOnlyNameHeader: '.EditForm__name-field h2',
		editableNameHeader: '.EditForm__name-field input[class*="item-name-field"',
		idLabel: '.EditForm__key-or-id span[class="EditForm__key-or-id__label"]',
		idValue: '.EditForm__key-or-id span[class="EditForm__key-or-id__field"]',
		metaHeader: '.EditForm-container h3[class="form-heading"]',
		metaCreatedAtLabel: '.EditForm-container div[for="createdAt"] label[for="createdAt"]',
		metaCreatedAtValue: '.EditForm-container div[for="createdAt"] span',
		metaCreatedByLabel: '.EditForm-container div[for="createdBy"] label[for="createdBy"]',
		metaCreatedByValue: '.EditForm-container div[for="createdBy"] span',
		metaUpdatedAtLabel: '.EditForm-container div[for="updatedAt"] label[for="updatedAt"]',
		metaUpdatedAtValue: '.EditForm-container div[for="updatedAt"] span',
		metaUpdatedByLabel: '.EditForm-container div[for="updatedBy"] label[for="updatedBy"]',
		metaUpdatedByValue: '.EditForm-container div[for="updatedBy"] span',
		saveButton: '.EditForm-container button[data-button=update]',
		resetButton: '.EditForm-container button[data-button=reset]',
		resetButtonText: '.EditForm-container button[data-button=reset] span',
		deleteButton: '.EditForm-container button[data-button=delete]',
		deleteButtonText: '.EditForm-container button[data-button=delete] span',
		// TODO:  refactor this so that any relationship itrem link can be used
		firstRelationshipItemLink: 'div.Relationships > div > div > div > table > tbody > tr > td > a',
	},
	defaultModelTestConfig: null,
};
