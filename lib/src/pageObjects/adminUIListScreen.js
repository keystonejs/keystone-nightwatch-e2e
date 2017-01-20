/**
 * This module defines the commands an e2e test client may execute against keystone's Admin UI List Screen.
 * When using the assertElement* commands, you may specify one of the predefined element selector properties
 * by prefixing it with the '@' sign or you can specify a string representing your own element selector.
 * See {@link https://github.com/keystonejs/keystone/tree/master/test/e2e/adminUI/tests/group004List|usage example}.
 *
 * @module adminUIListScreen
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
		 * Asserts that the specified list screen element UI is visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose UI should be visible.
		 */
		assertElementIsVisible: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.be.visible;
				} else {
					throw new Error('adminUIListScreen:must specify an element!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified list screen element UI is not visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose UI should not be visible.
		 */
		assertElementIsNotVisible: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.not.be.visible;
				} else {
					throw new Error('adminUIListScreen:must specify an element!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified list screen element DOM is present.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose DOM should be present.
		 */
		assertElementIsPresent: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.be.present;
				} else {
					throw new Error('adminUIListScreen:must specify an element!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified list screen element DOM is not present.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose DOM should not be present.
		 */
		assertElementIsNotPresent: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.not.be.present;
				} else {
					throw new Error('adminUIListScreen:must specify an element!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified list screen element text equals the specified value.
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
					throw new Error('adminUIListScreen:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified list screen element text not equals the specified value.
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
					throw new Error('adminUIListScreen:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified list screen element text contains the specified value.
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
					throw new Error('adminUIListScreen:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified app screen element has the specified attribute.
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
					throw new Error('adminUIListScreen:must specify a config element, attribute, and value!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item list header is visible in the list screen.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.headerColumn The one-based position of the header column in the list screen.
		 */
		assertListHeaderVisible: function (config) {
			if (config) {
				if (config.headerColumn) {
					this.expect.element(getListHeaderSelector(config.headerColumn)).to.be.visible;
				} else {
					throw new Error('adminUIListScreen:must specify a header column!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item list header value contains part or all of the specified value.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.headerColumn The one-based position of the header in the list screen.
		 * @param {string} config.headerValue The value to use for the test.
		 */
		assertListHeaderValueContains: function (config) {
			if (config) {
				if (config.headerColumn && config.headerValue) {
					this.expect.element(getListHeaderSelector(config.headerColumn)).text.to.contain(config.headerValue);
				} else {
					throw new Error('adminUIListScreen:must specify a header column and header value!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item list header value equals exactly the specified value.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.headerColumn The one-based position of the header in the list screen.
		 * @param {string} config.headerValue The value to use for the test.
		 */
		assertListHeaderValueEquals: function (config) {
			if (config) {
				if (config.headerColumn && config.headerValue) {
					this.expect.element(getListHeaderSelector(config.headerColumn)).text.to.equal(config.headerValue);
				} else {
					throw new Error('adminUIListScreen:must specify a header column and header value!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is visible in the browser page.  This command calls into the
		 * assertListScreenFieldUIVisible command of the field under test, which gets passed the config.field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert the UI visibility on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {number} config.field.row The one-based row number of item the item containing the field under test.
		 * @param {number} config.field.column The one-based column number of the field under test.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} config.field.options Any options required by the field test object command assertListScreenFieldUIVisible.
		 */
		assertItemFieldUIVisible: function (config) {
			var browser = this;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
						var fieldSelector = getItemFieldSelector(field);
						if (fieldSelector) {
							var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
							if (ModelTestConfig) {
								var modelTestConfig = new ModelTestConfig({ formSelector: fieldSelector });
								if (modelTestConfig) {
									var fieldTestObject = modelTestConfig[field.name];
									if (fieldTestObject) {
										if (fieldTestObject.commands && 'assertListScreenFieldUIVisible' in fieldTestObject.commands) {
											modelTestConfig[field.name].commands.assertListScreenFieldUIVisible(browser, field.options);
										} else {
											throw new Error('adminUIListScreen:assertItemFieldUIVisible: assertListScreenFieldUIVisible command not defined in ' + field.name + ' field test object!');
										}
									} else {
										throw new Error('adminUIListScreen:assertItemFieldUIVisible: invalid field name!');
									}
								} else {
									throw new Error('adminUIListScreen:assertItemFieldUIVisible: invalid field modelTestConfig!');
								}
							} else {
								throw new Error('adminUIListScreen:assertItemFieldUIVisible: No modelTestConfig given!');
							}
						} else {
							throw new Error('adminUIListScreen:assertItemFieldUIVisible: invalid field config row/column!');
						}
					});
				} else {
					throw new Error('adminUIListScreen:Invalid field specification!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is not visible in the browser page.  This command calls into the
		 * assertListScreenFieldUINotVisible command of the field under test, which gets passed the config.field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert the UI visibility on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {number} config.field.row The one-based row number of item the item containing the field under test.
		 * @param {number} config.field.column The one-based column number of the field under test.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} config.field.options Any options required by the field test object command assertListScreenFieldUINotVisible.
		 */
		assertItemFieldUINotVisible: function (config) {
			var browser = this;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
						var fieldSelector = getItemFieldSelector(field);
						if (fieldSelector) {
							var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
							if (ModelTestConfig) {
								var modelTestConfig = new ModelTestConfig({ formSelector: fieldSelector });
								if (modelTestConfig) {
									var fieldTestObject = modelTestConfig[field.name];
									if (fieldTestObject) {
										if (fieldTestObject.commands && 'assertListScreenFieldUINotVisible' in fieldTestObject.commands) {
											modelTestConfig[field.name].commands.assertListScreenFieldUINotVisible(browser, field.options);
										} else {
											throw new Error('adminUIListScreen:assertItemFieldUINotVisible: assertListScreenFieldUINotVisible command not defined in ' + field.name + ' field test object!');
										}
									} else {
										throw new Error('adminUIListScreen:assertItemFieldUINotVisible: invalid field name!');
									}
								} else {
									throw new Error('adminUIListScreen:assertItemFieldUINotVisible: invalid field modelTestConfig!');
								}
							} else {
								throw new Error('adminUIListScreen:assertItemFieldUINotVisible: No modelTestConfig given!');
							}
						} else {
							throw new Error('adminUIListScreen:assertItemFieldUINotVisible: invalid field config row/column!');
						}
					});
				} else {
					throw new Error('adminUIListScreen:Invalid field specification!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is present in the browser page DOM.  This command calls into the
		 * assertListScreenFieldUIPresent command of the field under test, which gets passed the config.field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert the UI presence on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {number} config.field.row The one-based row number of item the item containing the field under test.
		 * @param {number} config.field.column The one-based column number of the field under test.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} config.field.options Any options required by the field test object command assertListScreenFieldUIPresent.
		 */
		assertItemFieldUIPresent: function (config) {
			var browser = this;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
						var fieldSelector = getItemFieldSelector(field);
						if (fieldSelector) {
							var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
							if (ModelTestConfig) {
								var modelTestConfig = new ModelTestConfig({ formSelector: fieldSelector });
								if (modelTestConfig) {
									var fieldTestObject = modelTestConfig[field.name];
									if (fieldTestObject) {
										if (fieldTestObject.commands && 'assertListScreenFieldUIPresent' in fieldTestObject.commands) {
											modelTestConfig[field.name].commands.assertListScreenFieldUIPresent(browser, field.options);
										} else {
											throw new Error('adminUIListScreen:assertItemFieldUIPresent: assertListScreenFieldUIPresent command not defined in ' + field.name + ' field test object!');
										}
									} else {
										throw new Error('adminUIListScreen:assertItemFieldUIPresent: invalid field name!');
									}
								} else {
									throw new Error('adminUIListScreen:assertItemFieldUIPresent: invalid field modelTestConfig!');
								}
							} else {
								throw new Error('adminUIListScreen:assertItemFieldUIPresent: No modelTestConfig given!');
							}
						} else {
							throw new Error('adminUIListScreen:assertItemFieldUIPresent: invalid field config row/column!');
						}
					});
				} else {
					throw new Error('adminUIListScreen:Invalid field specification!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is not present in the browser page.  This command calls into the
		 * assertListScreenFieldUINotPresent command of the field under test, which gets passed the config.field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert the UI precense on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {number} config.field.row The one-based row number of item the item containing the field under test.
		 * @param {number} config.field.column The one-based column number of the field under test.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} config.field.options Any options required by the field test object command assertListScreenFieldUINotPresent.
		 */
		assertItemFieldUINotPresent: function (config) {
			var browser = this;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
						var fieldSelector = getItemFieldSelector(field);
						if (fieldSelector) {
							var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
							if (ModelTestConfig) {
								var modelTestConfig = new ModelTestConfig({ formSelector: fieldSelector });
								if (modelTestConfig) {
									var fieldTestObject = modelTestConfig[field.name];
									if (fieldTestObject) {
										if (fieldTestObject.commands && 'assertListScreenFieldUINotPresent' in fieldTestObject.commands) {
											modelTestConfig[field.name].commands.assertListScreenFieldUINotPresent(browser, field.options);
										} else {
											throw new Error('adminUIListScreen:assertItemFieldUINotPresent: assertListScreenFieldUINotPresent command not defined in ' + field.name + ' field test object!');
										}
									} else {
										throw new Error('adminUIListScreen:assertItemFieldUINotPresent: invalid field name!');
									}
								} else {
									throw new Error('adminUIListScreen:assertItemFieldUINotPresent: invalid field modelTestConfig!');
								}
							} else {
								throw new Error('adminUIListScreen:assertItemFieldUINotPresent: No modelTestConfig given!');
							}
						} else {
							throw new Error('adminUIListScreen:assertItemFieldUINotPresent: invalid field config row/column!');
						}
					});
				} else {
					throw new Error('adminUIListScreen:Invalid field specification!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item field contains all or parts of the specified value.  This command calls into the
		 * assertListScreenFieldValueContains command of the field under test, which gets passed the config.field.value and
		 * config.field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert value equality on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {number} config.field.row The one-based row number of item the item containing the field under test.
		 * @param {number} config.field.column The one-based column number of the field under test.
		 * @param {any} config.field.value The value the field under test should exactly have.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} config.field.options Any options required by the field test object command assertListScreenFieldValueEquals.
		 */
		assertItemFieldValueContains: function (config) {
			var browser = this;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
						var fieldSelector = getItemFieldSelector(field);
						if (fieldSelector) {
							var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
							if (ModelTestConfig) {
								var modelTestConfig = new ModelTestConfig({ formSelector: fieldSelector });
								if (modelTestConfig) {
									var fieldTestObject = modelTestConfig[field.name];
									if (fieldTestObject) {
										if (fieldTestObject.commands && 'assertListScreenFieldValueContains' in fieldTestObject.commands) {
											modelTestConfig[field.name].commands.assertListScreenFieldValueContains(browser, field.value, field.options);
										} else {
											throw new Error('adminUIListScreen:assertItemFieldValueContains: assertListScreenFieldValueContains command not defined in ' + field.name + ' field test object!');
										}
									} else {
										throw new Error('adminUIListScreen:assertItemFieldValueContains: invalid field name!');
									}
								} else {
									throw new Error('adminUIListScreen:assertItemFieldValueContains: invalid field modelTestConfig!');
								}
							} else {
								throw new Error('adminUIListScreen:assertItemFieldValueContains: No modelTestConfig given!');
							}
						} else {
							throw new Error('adminUIListScreen:assertItemFieldValueContains: invalid field config row/column!');
						}
					});
				} else {
					throw new Error('adminUIListScreen:Invalid field specification!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item fields equals exactly the specified value.  This command calls into the
		 * assertListScreenFieldValueEquals command of the field under test, which gets passed the field value and
		 * any provided field options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to assert value equality on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {number} config.field.row The one-based row number of item the item containing the field under test.
		 * @param {number} config.field.column The one-based column number of the field under test.
		 * @param {any} config.field.value The value the field under test should exactly have.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} config.field.options Any options required by the field test object command assertListScreenFieldValueEquals.
		 */
		assertItemFieldValueEquals: function (config) {
			var browser = this;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
						var fieldSelector = getItemFieldSelector(field);
						if (fieldSelector) {
							var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
							if (ModelTestConfig) {
								var modelTestConfig = new ModelTestConfig({ formSelector: fieldSelector });
								if (modelTestConfig) {
									var fieldTestObject = modelTestConfig[field.name];
									if (fieldTestObject) {
										if (fieldTestObject.commands && 'assertListScreenFieldValueEquals' in fieldTestObject.commands) {
											modelTestConfig[field.name].commands.assertListScreenFieldValueEquals(browser, field.value, field.options);
										} else {
											throw new Error('adminUIListScreen:assertItemFieldValueEquals: assertListScreenFieldValueEquals command not defined in ' + field.name + ' field test object!');
										}
									} else {
										throw new Error('adminUIListScreen:assertItemFieldValueEquals: invalid field name!');
									}
								} else {
									throw new Error('adminUIListScreen:assertItemFieldValueEquals: invalid field modelTestConfig!');
								}
							} else {
								throw new Error('adminUIListScreen:assertItemFieldValueEquals: invalid field config row/column!');
							}
						} else {
							throw new Error('adminUIListScreen:assertItemFieldValueEquals: No modelTestConfig given!');
						}
					});
				} else {
					throw new Error('adminUIListScreen:Invalid field specification!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Clicks the specified item field's value.  This command calls into the clickListScreenFieldValue command of the
		 * field under test, which gets passed the config.field.options.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.fields The array of fields to click the value on.
		 * @param {String} config.field.name The name of the field under test.
		 * @param {number} config.field.row The one-based row number of item the item containing the field under test.
		 * @param {number} config.field.column The one-based column number of the field under test.
		 * @param {Object} config.field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} config.field.options Any options required by the field test object command clickListScreenFieldValue.
		 */
		clickItemFieldValue: function (config) {
			var browser = this;
			if (config) {
				if (config.fields) {
					config.fields.forEach(function (field) {
						var fieldSelector = getItemFieldSelector(field);
						if (fieldSelector) {
							var ModelTestConfig = field.modelTestConfig || browser.defaultModelTestConfig;
							if (ModelTestConfig) {
								var modelTestConfig = new ModelTestConfig({ formSelector: fieldSelector });
								if (modelTestConfig) {
									var fieldTestObject = modelTestConfig[field.name];
									if (fieldTestObject) {
										if (fieldTestObject.commands && 'clickListScreenFieldValue' in fieldTestObject.commands) {
											modelTestConfig[field.name].commands.clickListScreenFieldValue(browser, field.options);
										} else {
											throw new Error('adminUIListScreen:clickItemFieldValue: clickListScreenFieldValue command not defined in ' + field.name + ' field test object!');
										}
									} else {
										throw new Error('adminUIListScreen:clickItemFieldValue: invalid field name!');
									}
								} else {
									throw new Error('adminUIListScreen:clickItemFieldValue: invalid field modelTestConfig!');
								}
							} else {
								throw new Error('adminUIListScreen:clickItemFieldValue: No modelTestConfig given!');
							}
						} else {
							throw new Error('adminUIListScreen:clickItemFieldValue: invalid field config row/column!');
						}
					});
				} else {
					throw new Error('adminUIListScreen:Invalid field specification!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item delete icons are visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.icons The array of icons to assert visibility on.
		 * @param {number} config.icon.row The one-based item row number of the delete icon in the list screen.
		 * @param {number} config.icon.column The one-based column number of the delete icon in the list screen.
		 */
		assertItemDeleteIconVisible: function (config) {
			var browser = this;
			if (config) {
				if (config.icons) {
					config.icons.forEach(function (icon) {
						browser.expect.element(getItemDeleteIconSelector(icon)).to.be.visible;
					});
				} else {
					throw new Error('adminUIListScreen:No icon array specified!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item delete icons are not visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.icons The array of icons to assert visibility on.
		 * @param {number} config.icon.row The one-based item row number of the delete icon in the list screen.
		 * @param {number} config.icon.column The one-based column number of the delete icon in the list screen.
		 */
		assertItemDeleteIconNotVisible: function (config) {
			var browser = this;
			if (config) {
				if (config.icons) {
					config.icons.forEach(function (icon) {
						browser.expect.element(getItemDeleteIconSelector(icon)).to.not.be.visible;
					});
				} else {
					throw new Error('adminUIListScreen:No icon array specified!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item delete icons are present.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.icons The array of icons to assert visibility on.
		 * @param {number} config.icon.row The one-based item row number of the delete icon in the list screen.
		 * @param {number} config.icon.column The one-based column number of the delete icon in the list screen.
		 */
		assertItemDeleteIconPresent: function (config) {
			var browser = this;
			if (config) {
				if (config.icons) {
					config.icons.forEach(function (icon) {
						browser.expect.element(getItemDeleteIconSelector(icon)).to.be.present;
					});
				} else {
					throw new Error('adminUIListScreen:No icon array specified!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified item delete icons are not present.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.icons The array of icons to assert visibility on.
		 * @param {number} config.icon.row The one-based item row number of the delete icon in the list screen.
		 * @param {number} config.icon.column The one-based column number of the delete icon in the list screen.
		 */
		assertItemDeleteIconNotPresent: function (config) {
			var browser = this;
			if (config) {
				if (config.icons) {
					config.icons.forEach(function (icon) {
						browser.expect.element(getItemDeleteIconSelector(icon)).to.not.be.present;
					});
				} else {
					throw new Error('adminUIListScreen:No icon array specified!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Click delete item icons.
		 *
		 * @param {Object} config The config spec.
		 * @param {array} config.icons The delete item icons specification.
		 * @param {number} config.icon.row The one-based item row number of the delete icon to click in the list screen.
		 * @param {number} config.icon.column The one-based item column number of the delete icon to click in the list screen.
		 */
		clickDeleteItemIcon: function (config) {
			var browser = this;
			if (config) {
				if (config.icons) {
					config.icons.forEach(function (icon) {
						browser.click(getItemDeleteIconSelector(icon));
					});
				} else {
					throw new Error('adminUIListScreen:No icon array specified!');
				}
			} else {
				throw new Error('adminUIListScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Clicks the Create Item button.
		 */
		clickCreateItemButton: function () {
			return this
				.moveToElement('@createItemButton', 0, 0)
				.click('@createItemButton');
		},

		/**
		 * Clicks the Search Input Clear icon in the list screen.
		 */
		clickSearchInputClearIcon: function () {
			return this
				.moveToElement('@searchInputFieldClearIcon', 0, 0)
				.click('@searchInputFieldClearIcon');
		},
	}],
	/**
  	 * @property {string} noItemsFoundText The element used to ID the "No Items Found" message.
  	 * @property {string} itemDeleteIcon The element used to ID the delete item icon.
  	 * @property {string} searchInputField The element used to ID the search input field.
  	 * @property {string} searchInputFieldClearIcon The element used to ID the clear search input icon.
  	 * @property {string} filterDropdown The element used to ID the item filter dropdown.
  	 * @property {string} columnSelectionDropdown The element used to ID the column selection dropdown.
  	 * @property {string} downloadDropdown The element used to ID the download dropdown.
  	 * @property {string} expandTableIcon The element used to ID the expand table icon.
  	 * @property {string} createItemButton The element used to ID the create item icon.
  	 * @property {string} pageItemCount The element used to ID the page item count.
	 */
	elements: {
		noItemsFoundText: '[data-e2e-blank-state-heading]',
		itemDeleteIcon: '.Table.ItemList .ItemList__col--control.ItemList__col--delete',
		searchInputField: '[data-search-input-field]',
		searchInputFieldClearIcon: '[data-search-input-field-clear-icon]',
		filterDropdown: '#listHeaderFilterButton',
		columnSelectionDropdown: '#listHeaderColumnButton',
		downloadDropdown: '#listHeaderDownloadButton',
		expandTableIcon: 'div.InputGroup_section:nth-child(5) > button:nth-child(1)',
		createItemButton: 'button[data-e2e-list-create-button]',
		pageItemCount: '[data-e2e-pagination-count]',
	},
	defaultModelTestConfig: null,
};

function getItemDeleteIconSelector (icon) {
	return '.ItemList-wrapper tbody tr:nth-of-type(' + icon.row + ') td:nth-of-type(' + (icon.column) + ') button';
}

function getListHeaderSelector (headerColumn) {
	return '.ItemList-wrapper thead th:nth-of-type(' + (headerColumn + 1) + ')';
}

function getItemFieldSelector (field) {
	return '.ItemList-wrapper tbody tr:nth-of-type(' + field.row + ') td:nth-of-type(' + (field.column) + ')';
}
