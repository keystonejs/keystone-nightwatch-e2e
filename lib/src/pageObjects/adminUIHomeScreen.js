var objectAssign = require('object-assign');
var HomeScreenGroup = require('./adminUIHomeScreenGroup');

/**
 * This module defines the commands an e2e test client may execute against keystone's Admin UI Home Screen.
 * When using the assertElement* commands, you may specify one of the predefined element selector properties
 * by prefixing it with the '@' sign or you can specify a string representing your own element selector.
 * See {@link https://github.com/keystonejs/keystone/tree/master/test/e2e/adminUI/tests/group003Home|usage example}.
 *
 * @module adminUIHomeScreen
 */
module.exports = {
	commands: [{
		/**
		 * Asserts that the specified home screen element UI is visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose UI should be visible.
		 */
		assertElementIsVisible: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.be.visible;
				} else {
					throw new Error('adminUIHomeScreen:must specify an element!');
				}
			} else {
				throw new Error('adminUIHomeScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified home screen element UI is not visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose UI should not be visible.
		 */
		assertElementIsNotVisible: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.not.be.visible;
				} else {
					throw new Error('adminUIHomeScreen:must specify an element!');
				}
			} else {
				throw new Error('adminUIHomeScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified home screen element DOM is present.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose DOM should be present.
		 */
		assertElementIsPresent: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.be.present;
				} else {
					throw new Error('adminUIHomeScreen:must specify an element!');
				}
			} else {
				throw new Error('adminUIHomeScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified home screen element DOM is not present.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose DOM should not be present.
		 */
		assertElementIsNotPresent: function (config) {
			if (config) {
				if (config.element) {
					this.expect.element(config.element).to.not.be.present;
				} else {
					throw new Error('adminUIHomeScreen:must specify an element!');
				}
			} else {
				throw new Error('adminUIHomeScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified home screen element text equals the specified value.
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
					throw new Error('adminUIHomeScreen:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIHomeScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified home screen element text not equals the specified value.
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
					throw new Error('adminUIHomeScreen:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIHomeScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified home screen element text contains the specified value.
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
					throw new Error('adminUIHomeScreen:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIHomeScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Asserts that the specified home screen element has the specified attribute.
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
					throw new Error('adminUIHomeScreen:must specify a config element, attribute, and value!');
				}
			} else {
				throw new Error('adminUIHomeScreen:invalid config specification!');
			}
			return this;
		},

		/**
		 * Opens the list of items given the specified list config spec.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.groupName The name of the group containing the list.
		 * @param {string} config.listName The name of the list whose group tab should be opened.
		 * @param {boolean} config.wait Whether to wait for the target UI.  Optional, defaults to true.
		 */
		openList: function (config) {
			var _config = objectAssign({}, { wait: true }, config);
			this.configureTabUI({
				groupName: config.groupName,
				tabs: [
					{ listName: config.listName, items: '? Items' },
				],
				options: { wait: _config.wait || true },
			})
				.clickTabUI({
					groupName: config.groupName,
					tabListName: config.listName,
					click: 'tabLabel',
				});
			return this;
		},

		/**
		 * Configures the specified group tabs UI in the home screen.
		 *
		 * @param {Object} config The config spec.
		 * @param {String} config.groupName The name of the tabs group to configure.
		 * @param {array} config.tabs The group tabs to configure.
		 * @param {string} config.tab.listName The tab list to configure.
		 * @param {string} config.tab.items The item count the tab should have.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		configureTabUI: function (config) {
			if (config) {
				if (config.groupName) {
					if (config.tabs) {
						this.section[config.groupName] = new HomeScreenGroup({
							groupName: config.groupName,
							tabs: config.tabs,
						});
					} else {
						throw new Error('adminUIHomeScreen:assertTabUIVisible: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIHomeScreen:assertTabUIVisible: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabUIVisible: No config spec specified!');
			}
			return this;
		},

		/**
		 * Asserts that the configured group tabs UI is visible in the home screen.
		 *
		 * @param {Object} config The config spec.
		 * @param {String} config.groupName The name of the group whose tabs to assert the UI visibility on.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		assertTabUIVisible: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					this.section[config.groupName].commands.assertTabUIVisible(browser, config.options);
				} else {
					throw new Error('adminUIHomeScreen:assertTabUIVisible: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabUIVisible: No config spec specified!');
			}
			return this;
		},

		/**
		 * Asserts that the specified group tabs UI is not visible in the home screen.
		 *
		 * @param {Object} config The config spec.
		 * @param {String} config.groupName The name of the group whose tabs to assert the UI visibility on.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		assertTabUINotVisible: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					this.section[config.groupName].commands.assertTabUINotVisible(browser, config.options);
				} else {
					throw new Error('adminUIHomeScreen:assertTabUINotVisible: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabUINotVisible: No config spec specified!');
			}
			return this;
		},

		/**
		 * Asserts that the specified group tabs DOM is present in the home screen.
		 *
		 * @param {Object} config The config spec.
		 * @param {String} config.groupName The name of the group whose tabs to assert the DOM presencense on.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		assertTabDOMPresent: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					this.section[config.groupName].commands.assertTabDOMPresent(browser, config.options);
				} else {
					throw new Error('adminUIHomeScreen:assertTabDOMPresent: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabDOMPresent: No config spec specified!');
			}
			return this;
		},

		/**
		 * Asserts that the specified group tabs DOM is not present in the home screen.
		 *
		 * @param {Object} config The config spec.
		 * @param {String} config.groupName The name of the group whose tabs to assert the DOM presencense on.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		assertTabDOMNotPresent: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					this.section[config.groupName].commands.assertTabDOMNotPresent(browser, config.options);
				} else {
					throw new Error('adminUIHomeScreen:assertTabDOMNotPresent: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabDOMNotPresent: No config spec specified!');
			}
			return this;
		},

		/**
		 * Asserts that the text of the tabs in the specified group in the home screen equals the configured tab text.
		 *
		 * @param {Object} group The group whose tabs text is to be asserted for equality.
		 * @param {String} config.groupName The name of the configured group test.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		assertTabTextEquals: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					this.section[config.groupName].commands.assertTabTextEquals(browser, config.options);
				} else {
					throw new Error('adminUIHomeScreen:assertTabTextEquals: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabTextEquals: No config spec specified!');
			}
			return this;
		},

		/**
		 * Asserts that the text of the tabs in the specified group in the home screen contains the configured tab text.
		 *
		 * @param {Object} config The config spec.
		 * @param {String} config.groupName The name of the configured group test.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		assertTabTextContains: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					this.section[config.groupName].commands.assertTabTextContains(browser, config.options);
				} else {
					throw new Error('adminUIHomeScreen:assertTabTextContains: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabTextContains: No config spec specified!');
			}
			return this;
		},

		/**
		 * Click the specified group tab UI in the home screen.
		 *
		 * @param {Object} config The config spec.
		 * @param {String} config.groupName The name of the group whose tab UI is to be clicked.
		 * @param {String} config.tabListName The list name of the tab whose UI is to be clicked.
		 * @param {string} config.click The clickable tab UI element.  Any one of the following may be specified: tabLabel, tabItemCount, tabPlusIconLink
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		clickTabUI: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					if (config.tabListName) {
						if (config.click) {
							this.section[config.groupName].commands.clickTabUI(browser, config.tabListName, config.click, config.options);
						} else {
							throw new Error('adminUIHomeScreen:clickTabUI: No tab click element specified!');
						}
					} else {
						throw new Error('adminUIHomeScreen:clickTabUI: No tab list name specified!');
					}
				} else {
					throw new Error('adminUIHomeScreen:clickTabUI: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:clickTabUI: No config spec specified!');
			}
			return this;
		},
	}],
	/**
  	 * @property {string} dashboardHeader The element used to ID the home screen dashboard header.
	 */
	elements: {
		dashboardHeader: '.dashboard-heading',
	},
	sections: {},
};
