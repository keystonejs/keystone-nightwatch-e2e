/**
 * This module defines the commands an e2e test client may execute against keystone's item create form screen.
 * When using the assertElement* commands, you may specify one of the predefined element selector properties
 * by prefixing it with the '@' sign or you can specify a string representing your own element selector.
 * See {@link https://github.com/keystonejs/keystone/tree/master/test/e2e/adminUI/tests/group005Item|usage example},
 * {@link https://github.com/keystonejs/keystone/tree/master/test/e2e/adminUI/tests/group006Fields|usage example}
 *
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
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose UI should be visible.
		 */
		assertElementIsVisible: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.be.visible;
				} else {
					throw new Error('adminUIInitialForm:must specify an element!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified create item screen element UI is not visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose UI should not be visible.
		 */
		assertElementIsNotVisible: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.not.be.visible;
				} else {
					throw new Error('adminUIInitialForm:must specify an element!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified create item screen element DOM is present.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose DOM should be present.
		 */
		assertElementIsPresent: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.be.present;
				} else {
					throw new Error('adminUIInitialForm:must specify an element!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified create item screen element DOM is not present.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose DOM should not be present.
		 */
		assertElementIsNotPresent: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.not.be.present;
				} else {
					throw new Error('adminUIInitialForm:must specify an element!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified create item screen element text equals the specified value.
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
					throw new Error('adminUIInitialForm:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified create item screen element text not equals the specified value.
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
					throw new Error('adminUIInitialForm:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified create item screen element text contains the specified value.
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
					throw new Error('adminUIInitialForm:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified create item screen element has the specified attribute.
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
					throw new Error('adminUIInitialForm:must specify a config element, attribute, and value!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is visible in the initial form screen.  This command calls into the
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
					throw new Error('adminUIInitialForm:assertFieldUIVisible: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is not visible in the initial form screen.  This command calls into the
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
					throw new Error('adminUIInitialForm:assertFieldUINotVisible: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's DOM is present in the initial form screen.  This command calls into the
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
					throw new Error('adminUIInitialForm:assertFieldDOMPresent: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's DOM is not present in the initial form screen.  This command calls into the
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
					throw new Error('adminUIInitialForm:assertFieldDOMNotPresent: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Clicks the specified field's click area in the create item screen.  This command calls into the
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
					throw new Error('adminUIInitialForm:clickFieldUI: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Fills the specified item field's inputs in the initial form screen.  This command calls into the
		 * fillFieldInputs command of the field under test, which gets passed the field.input and field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert the UI visibility on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {Object} field.input The inputs to pass to the field test object command fillFieldInputs.
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
						if (ModelTestConfig) {
							form.section.list = new ModelTestConfig({ formSelector: form.selector });
							if (form.section.list) {
								var fieldTestObject = form.section.list[field.name];
								if (fieldTestObject) {
									if (fieldTestObject.commands && 'fillFieldInputs' in fieldTestObject.commands) {
										form.section.list[field.name].commands.fillFieldInputs(browser, field.input, field.options);
										browser.api.pause(1000);
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
					throw new Error('adminUIInitialForm:fillFieldInputs: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts the item field's inputs in the initial form screen are as specified.  This command calls into the
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
					throw new Error('adminUIInitialForm:assertFieldInputs: Invalid fields specification!');
				}
			} else {
				throw new Error('adminUIInitialForm:invalid config specification!');
			}
			return this;
		},

		/**
		 * Saves the initial created item form.
		 */
		save: function () {
			return this.section.form
				.moveToElement('@createButton', 0, 0)
				.click('@createButton');
		},

		/**
		 * Cancels the initial create form.
		 */
		cancel: function () {
			return this.section.form
				.moveToElement('@cancelButton', 0, 0)
				.click('@cancelButton');
		},
	}],
	sections: {
		form: {
			selector: 'div[data-screen-id="modal-dialog"]',
			sections: {},
			elements: {
				//
				// FORM LEVEL ELEMENTS
				//
				createButton: 'button[data-button-type="submit"]',
				cancelButton: 'button[data-button-type="cancel"]',
			},
			commands: [{}],
		},
	},
	/**
  	 * @property {string} flashError The element used to ID the flash error message.
	 */
	elements: {
		//
		// PAGE LEVEL ELEMENTS
		//
		flashError: 'div[data-alert-type="danger"]',
	},
	defaultModelTestConfig: null,
};
