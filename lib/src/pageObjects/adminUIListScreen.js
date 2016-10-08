/**
 * This module defines the commands an e2e test client may execute against keystone's Admin UI List Screen.
 * A test client should try to avoid accessing the elements directly but instead use the commands to accomplish
 * the testing.  If a command is not available for the test purpose please submit a PR for consideration.
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
		 * @param {string} element The element whose UI should be visible.
		 */
		assertElementIsVisible: function (element) {
			return this.expect.element('@' + element).to.be.visible;
		},

		/**
		 * Asserts that the specified list screen element UI is not visible.
		 *
		 * @param {string} element The element whose UI should not be visible.
		 */
		assertElementIsNotVisible: function (element) {
			return this.expect.element('@' + element).to.not.be.visible;
		},

		/**
		 * Asserts that the specified list screen element DOM is present.
		 *
		 * @param {string} element The element whose DOM should be present.
		 */
		assertElementIsPresent: function (element) {
			return this.expect.element('@' + element).to.be.present;
		},

		/**
		 * Asserts that the specified list screen element DOM is not present.
		 *
		 * @param {string} element The element whose DOM should not be present.
		 */
		assertElementIsNotPresent: function (element) {
			return this.expect.element('@' + element).to.not.be.present;
		},

		/**
		 * Asserts that the specified list screen element text equals the specified value.
		 *
		 * @param {string} element The element whose text should be compared to the input text.
		 * @param {String} text The text to compare against.
		 */
		assertElementTextEquals: function (element, text) {
			return this.expect.element('@' + element).text.to.equal(text);
		},

		/**
		 * Asserts that the specified list screen element text not equals the specified value.
		 *
		 * @param {string} element The element whose text should be compared to the input text.
		 * @param {String} text The text to compare against.
		 */
		assertElementTextNotEquals: function (element, text) {
			return this.expect.element('@' + element).text.to.not.equal(text);
		},

		/**
		 * Asserts that the specified list screen element text contains the specified value.
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
		 * Clicks the Search Input Clear icon in the list screen.
		 */
		clickSearchInputClearIcon: function () {
			return this.click('@searchInputFieldClearIcon');
		},

		/**
		 * Asserts that the specified item list header is visible in the list screen.
		 *
		 * @param {Object} header The field header specification.
		 * @param {number} header.column The one-based position of the column header in the list screen.
		 */
		assertItemListHeaderVisible: function (header) {
			return this.expect.element(getItemListHeaderSelector(header)).to.be.visible;
		},

		/**
		 * Asserts that the specified item list header contains part or all of the specified value.
		 *
		 * @param {Object} header The field header specification.
		 * @param {number} header.column The one-based position of the header in the list screen.
		 * @param {string} header.value The value to use for the test.
		 */
		assertItemListHeaderContains: function (header) {
			return this.expect.element(getItemListHeaderSelector(header)).text.to.contain(header.value);
		},

		/**
		 * Asserts that the specified item list header equals exactly the specified value.
		 *
		 * @param {Object} header The item list header specification.
		 * @param {number} header.column The one-based position of the header in the list screen.
		 * @param {string} header.value The value to use for the test.
		 */
		assertItemListHeaderEquals: function (header) {
			return this.expect.element(getItemListHeaderSelector(header)).text.to.equal(header.value);
		},

		/**
		 * Asserts that the specified item field's UI is visible in the browser page.  This command calls into the
		 * assertListScreenFieldUIVisible command of the field under test, which gets passed the config.field.options.
		 *
		 * @param {Object} fields The array of fields to assert the UI visibility on.
		 * @param {String} field.name The name of the field under test.
		 * @param {number} field.row The one-based row number of item the item containing the field under test.
		 * @param {number} field.column The one-based column number of the field under test.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} field.options Any options required by the field test object command assertListScreenFieldUIVisible.
		 */
		assertItemFieldUIVisible: function (fields) {
			var browser = this;
			if (fields) {
				fields.forEach(function (field) {
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
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is not visible in the browser page.  This command calls into the
		 * assertListScreenFieldUINotVisible command of the field under test, which gets passed the config.field.options.
		 *
		 * @param {Object} fields The array of fields to assert the UI visibility on.
		 * @param {String} field.name The name of the field under test.
		 * @param {number} field.row The one-based row number of item the item containing the field under test.
		 * @param {number} field.column The one-based column number of the field under test.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} field.options Any options required by the field test object command assertListScreenFieldUINotVisible.
		 */
		assertItemFieldUINotVisible: function (fields) {
			var browser = this;
			if (fields) {
				fields.forEach(function (field) {
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
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is present in the browser page DOM.  This command calls into the
		 * assertListScreenFieldUIPresent command of the field under test, which gets passed the config.field.options.
		 *
		 * @param {Object} fields The array of fields to assert the UI presence on.
		 * @param {String} field.name The name of the field under test.
		 * @param {number} field.row The one-based row number of item the item containing the field under test.
		 * @param {number} field.column The one-based column number of the field under test.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} field.options Any options required by the field test object command assertListScreenFieldUIPresent.
		 */
		assertItemFieldUIPresent: function (fields) {
			var browser = this;
			if (fields) {
				fields.forEach(function (field) {
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
			return this;
		},

		/**
		 * Asserts that the specified item field's UI is not present in the browser page.  This command calls into the
		 * assertListScreenFieldUINotPresent command of the field under test, which gets passed the config.field.options.
		 *
		 * @param {Object} fields The array of fields to assert the UI precense on.
		 * @param {String} field.name The name of the field under test.
		 * @param {number} field.row The one-based row number of item the item containing the field under test.
		 * @param {number} field.column The one-based column number of the field under test.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} field.options Any options required by the field test object command assertListScreenFieldUINotPresent.
		 */
		assertItemFieldUINotPresent: function (fields) {
			var browser = this;
			if (fields) {
				fields.forEach(function (field) {
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
			return this;
		},

		/**
		 * Asserts that the specified item field contains all or parts of the specified value.  This command calls into the
		 * assertListScreenFieldValueContains command of the field under test, which gets passed the config.field.value and
		 * config.field.options.
		 *
		 * @param {Object} fields The array of fields to assert value equality on.
		 * @param {String} field.name The name of the field under test.
		 * @param {number} field.row The one-based row number of item the item containing the field under test.
		 * @param {number} field.column The one-based column number of the field under test.
		 * @param {any} field.value The value the field under test should exactly have.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} field.options Any options required by the field test object command assertListScreenFieldValueEquals.
		 */
		assertItemFieldValueContains: function (fields) {
			var browser = this;
			if (fields) {
				fields.forEach(function (field) {
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
			return this;
		},

		/**
		 * Asserts that the specified item fields equals exactly the specified value.  This command calls into the
		 * assertListScreenFieldValueEquals command of the field under test, which gets passed the field value and
		 * any provided field options.
		 *
		 * @param {Object} fields The array of fields to assert value equality on.
		 * @param {String} field.name The name of the field under test.
		 * @param {number} field.row The one-based row number of item the item containing the field under test.
		 * @param {number} field.column The one-based column number of the field under test.
		 * @param {any} field.value The value the field under test should exactly have.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} field.options Any options required by the field test object command assertListScreenFieldValueEquals.
		 */
		assertItemFieldValueEquals: function (fields) {
			var browser = this;
			if (fields) {
				fields.forEach(function (field) {
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
			return this;
		},

		/**
		 * Clicks the specified item field's value.  This command calls into the clickListScreenFieldValue command of the
		 * field under test, which gets passed the config.field.options.
		 *
		 * @param {Object} fields The array of fields to click the value on.
		 * @param {String} field.name The name of the field under test.
		 * @param {number} field.row The one-based row number of item the item containing the field under test.
		 * @param {number} field.column The one-based column number of the field under test.
		 * @param {Object} field.modelTestConfig The model test config that should be used for the field under test.
		 * @param {Object} field.options Any options required by the field test object command clickListScreenFieldValue.
		 */
		clickItemFieldValue: function (fields) {
			var browser = this;
			if (fields) {
				fields.forEach(function (field) {
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
			return this;
		},

		/**
		 * Asserts that the specified item delete icon is visible.
		 *
		 * @param {Object} icons The delete icons specification.
		 * @param {number} icon.row The one-based item row number of the delete icon in the list screen.
		 * @param {number} icon.column The one-based column number of the delete icon in the list screen.
		 */
		assertItemDeleteIconVisible: function (icons) {
			var browser = this;
			if (icons) {
				icons.forEach(function (icon) {
					browser.expect.element(getItemDeleteIconSelector(icon)).to.be.visible;
				});
			} else {
				throw new Error('adminUIListScreen:Invalid icons specification!');
			}
			return this;
		},

		/**
		 * Click delete item icons.
		 *
		 * @param {Object} icons The delete item icons specification.
		 * @param {number} icon.row The one-based item row number of the delete icon to click in the list screen.
		 * @param {number} icon.column The one-based item column number of the delete icon to click in the list screen.
		 */
		clickDeleteItemIcon: function (icons) {
			var browser = this;
			if (icons) {
				icons.forEach(function (icon) {
					browser.click(getItemDeleteIconSelector(icon));
				});
			} else {
				throw new Error('adminUIListScreen:Invalid icons specification!');
			}
			return this;
		},

		/**
		 * Clicks the Create Item button.
		 */
		clickCreateItemButton: function () {
			return this
				.click('@createItemButton');
		},
	}],
	elements: {
		/**
		 * The element for the "No Items Found" message.
		 */
		noItemsFoundText: '.BlankState__heading',

		/**
		 * The element for the delete item icon.
		 */
		itemDeleteIcon: '.Table.ItemList .ItemList__col--control.ItemList__col--delete',

		/**
		 * The element for the search input field.
		 */
		searchInputField: '[data-search-input-field]',

		/**
		 * The element for the search input field clear icon.
		 */
		searchInputFieldClearIcon: '[data-search-input-field-clear-icon]',

		/**
		 * The element for the item filter dropdown.
		 */
		filterDropdown: '#listHeaderFilterButton',

		/**
		 * The element for the column selection dropdown.
		 */
		columnSelectionDropdown: '#listHeaderColumnButton',

		/**
		 * The element for the download dropdown.
		 */
		downloadDropdown: '#listHeaderDownloadButton',

		/**
		 * The element for the expand table icon.
		 */
		expandTableIcon: 'div.InputGroup_section:nth-child(5) > button:nth-child(1)',

		/**
		 * The element for the create item button.
		 */
		createItemButton: 'button[data-e2e-list-create-button]',

		/**
		 * The element for the page item count.
		 */
		pageItemCount: '.Pagination__count',
	},
	defaultModelTestConfig: null,
};

function getItemDeleteIconSelector (icon) {
	return '.ItemList-wrapper tbody tr:nth-of-type(' + icon.row + ') td:nth-of-type(' + (icon.column) + ') button';
}

function getItemListHeaderSelector (header) {
	return '.ItemList-wrapper thead th:nth-of-type(' + (header.column + 1) + ')';
}

function getItemFieldSelector (field) {
	return '.ItemList-wrapper tbody tr:nth-of-type(' + field.row + ') td:nth-of-type(' + (field.column) + ')';
}
