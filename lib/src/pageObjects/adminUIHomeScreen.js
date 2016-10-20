var objectAssign = require('object-assign');
var DashboardGroup = require('./adminUIDashboardGroup');

/**
 * This module defines the commands an e2e test client may execute against keystone's Admin UI Home Screen.
 * A test client should try to avoid accessing the elements directly but instead use the commands to accomplish
 * the testing.  If a command is not available for the test purpose please submit a PR for consideration.
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
					this.expect.element('@' + config.element).to.be.visible;
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
					this.expect.element('@' + config.element).to.not.be.visible;
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
					this.expect.element('@' + config.element).to.be.present;
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
					this.expect.element('@' + config.element).to.not.be.present;
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
					this.expect.element('@' + config.element).text.to.equal(config.text);
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
					this.expect.element('@' + config.element).text.to.not.equal(config.text);
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
					this.expect.element('@' + config.element).text.to.contain(config.text);
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
					this.expect.element('@' + config.element).to.have.attribute(config.attribute).which.contains(config.value);
				} else {
					throw new Error('adminUIHomeScreen:must specify a config element, attribute, and text!');
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
			this.clickTabUI({
				groupName: config.groupName,
				click: 'label',
				tab: { listName: config.listName, items: '? Items' },
				options: { wait: _config.wait || true },
			});
			return this;
		},

		/**
		 * Asserts that the specified group tabs UI is visible in the home screen.
		 *
		 * @param {Object} config The config spec.
		 * @param {String} config.groupName The name of the group whose tabs to assert the UI visibility on.
		 * @param {array} config.tabs The group tabs to assert the UI visibility on.
		 * @param {string} config.tab.listName The tab list to assert the UI visibility on.
		 * @param {string} config.tab.items The item count the tab to assert the UI visibility on should have.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		assertTabUIVisible: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					if (config.tabs) {
						this.section[config.groupName] = new DashboardGroup({
							groupName: config.groupName,
							tabs: config.tabs,
						});
						this.section[config.groupName].commands.assertTabUIVisible(browser, config.options);
					} else {
						throw new Error('adminUIItemScreen:assertTabUIVisible: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:assertTabUIVisible: No group name specified!');
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
		 * @param {String} config.groupName The name of the group under test.
		 * @param {array} config.tabs The group tabs to assert the UI visibility on.
		 * @param {string} config.tab.listName The tab list to assert the UI visibility on.
		 * @param {string} config.tab.items The item count the tab to assert the UI visibility on should have.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		assertTabUINotVisible: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					if (config.tabs) {
						this.section[config.groupName] = new DashboardGroup({
							groupName: config.groupName,
							tabs: config.tabs,
						});
						this.section[config.groupName].commands.assertTabUINotVisible(browser, config.options);
					} else {
						throw new Error('adminUIItemScreen:assertTabUINotVisible: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:assertTabUINotVisible: No group name specified!');
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
		 * @param {array} config.tabs The group tabs to assert the DOM visibility on.
		 * @param {string} config.tab.listName The tab list to assert the DOM visibility on.
		 * @param {string} config.tab.items The item count the tab to assert the DOM visibility on should have.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		assertTabDOMPresent: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					if (config.tabs) {
						this.section[config.groupName] = new DashboardGroup({
							groupName: config.groupName,
							tabs: config.tabs,
						});
						this.section[config.groupName].commands.assertTabDOMPresent(browser, config.options);
					} else {
						throw new Error('adminUIItemScreen:assertTabDOMPresent: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:assertTabDOMPresent: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabDOMPresent: No config spec specified!');
			}
			return this;
		},

		/**
		 * Asserts that the specified group tabs DOM is not visible in the home screen.
		 *
		 * @param {Object} config The config spec.
		 * @param {String} config.groupName The name of the group whose tabs to assert the DOM presencense on.
		 * @param {String} config.groupName The name of the group under test.
		 * @param {array} config.tabs The group tabs to assert the DOM visibility on.
		 * @param {string} config.tab.listName The tab list to assert the DOM visibility on.
		 * @param {string} config.tab.items The item count the tab to assert the DOM visibility on should have.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		assertTabDOMNotPresent: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					if (config.tabs) {
						this.section[config.groupName] = new DashboardGroup({
							groupName: config.groupName,
							tabs: config.tabs,
						});
						this.section[config.groupName].commands.assertTabDOMNotPresent(browser, config.options);
					} else {
						throw new Error('adminUIItemScreen:assertTabDOMNotPresent: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:assertTabDOMNotPresent: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabDOMNotPresent: No config spec specified!');
			}
			return this;
		},

		/**
		 * Asserts that the specified group tabs text in the home screen equals the specified text.
		 *
		 * @param {Object} group The group whose tabs text is to be asserted for equality.
		 * @param {String} config.groupName The name of the group under test.
		 * @param {array} config.tabs The group tabs to assert equality on.
		 * @param {string} config.tab.listName The tab list to assert equality on.
		 * @param {string} config.tab.items The item count the tab to assert equality on.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		assertTabTextEquals: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					if (config.tabs) {
						this.section[config.groupName] = new DashboardGroup({
							groupName: config.groupName,
							tabs: config.tabs,
						});
						this.section[config.groupName].commands.assertTabTextEquals(browser, config.options);
					} else {
						throw new Error('adminUIItemScreen:assertTabTextEquals: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:assertTabTextEquals: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabTextEquals: No config spec specified!');
			}
			return this;
		},

		/**
		 * Asserts that the specified group tabs text in the home screen contains the specified text.
		 *
		 * @param {Object} config The config spec.
		 * @param {String} config.groupName The name of the group whose tabs text is to be asserted for equality.
		 * @param {String} config.groupName The name of the group under test.
		 * @param {array} config.tabs The group tabs to assert equality on.
		 * @param {string} config.tab.listName The tab list to assert equality on.
		 * @param {string} config.tab.items The item count the tab to assert equality on.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		assertTabTextContains: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					if (config.tabs) {
						this.section[config.groupName] = new DashboardGroup({
							groupName: config.groupName,
							tabs: config.tabs,
						});
						this.section[config.groupName].commands.assertTabTextContains(browser, config.options);
					} else {
						throw new Error('adminUIItemScreen:assertTabTextContains: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:assertTabTextContains: No group name specified!');
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
		 * @param {Object} config.tab The group tab to click a UI element on.
		 * @param {string} config.tab.listName The tab list to assert the UI visibility on.
		 * @param {string} config.tab.items The item count the tab to assert the UI visibility on should have.
		 * @param {string} config.click The clickable tab UI element.
		 * @param {Object} config.options Any options to pass to the group/tab.
		 */
		clickTabUI: function (config) {
			var browser = this;
			if (config) {
				if (config.groupName) {
					if (config.tab) {
						if (config.click) {
							this.section[config.groupName] = new DashboardGroup({
								groupName: config.groupName,
								tabs: [config.tab],
							});
							this.section[config.groupName].commands.clickTabUI(browser, config.click, config.options);
						} else {
							throw new Error('adminUIItemScreen:clickTabUI: No group click specified!');
						}
					} else {
						throw new Error('adminUIItemScreen:clickTabUI: No group tab specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:clickTabUI: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:clickTabUI: No config spec specified!');
			}
			return this;
		},
	}],
	/**
	 * Home screen elements.
	 */
	elements: {
		/**
		 * The dashboard header element.
		 */
		dashboardHeader: '.dashboard-heading',
	},
	sections: {},
};
