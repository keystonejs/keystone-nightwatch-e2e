var objectAssign = require('object-assign');
var DashboardGroup = require('./adminUIDashboardGroup');

module.exports = {
	commands: [{
		/**
		 * Asserts that the specified list screen element UI is visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose UI should be visible.
		 */
		assertElementIsVisible: function (config) {
			return this.expect.element('@' + config.element).to.be.visible;
		},

		/**
		 * Asserts that the specified list screen element UI is not visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose UI should not be visible.
		 */
		assertElementIsNotVisible: function (config) {
			return this.expect.element('@' + config.element).to.not.be.visible;
		},

		/**
		 * Asserts that the specified list screen element DOM is present.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose DOM should be present.
		 */
		assertElementIsPresent: function (config) {
			return this.expect.element('@' + config.element).to.be.present;
		},

		/**
		 * Asserts that the specified list screen element DOM is not present.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose DOM should not be present.
		 */
		assertElementIsNotPresent: function (config) {
			return this.expect.element('@' + config.element).to.not.be.present;
		},

		/**
		 * Asserts that the specified list screen element text equals the specified value.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose text should be compared to the input text.
		 * @param {String} config.text The text to compare against.
		 */
		assertElementTextEquals: function (config) {
			return this.expect.element('@' + config.element).text.to.equal(config.text);
		},

		/**
		 * Asserts that the specified list screen element text not equals the specified value.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose text should be compared to the input text.
		 * @param {String} config.text The text to compare against.
		 */
		assertElementTextNotEquals: function (config) {
			return this.expect.element('@' + config.element).text.to.not.equal(config.text);
		},

		/**
		 * Asserts that the specified list screen element text contains the specified value.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose text should contain the input text.
		 * @param {String} config.text The text to compare against.
		 */
		assertElementTextContains: function (config) {
			return this.expect.element('@' + config.element).text.to.contain(config.text);
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
			return this.expect.element('@' + config.element).to.have.attribute(config.attribute).which.contains(config.value);
		},

		/**
		 * Opens the list of items given the specified list config spec.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.group The group containing the list.
		 * @param {string} config.list The list label for the group tab to open.
		 * @param {boolean} config.wait Whether to wait for the target UI.  Optional, defaults to true.
		 */
		openList: function (config) {
			var _config = objectAssign({}, { wait: true }, config);
			this.clickTabUI({
				name: config.group,
				click: 'label',
				tab: { list: config.list, items: '? Items' },
				options: { wait: _config.wait || true },
			});
			return this;
		},

		/**
		 * Asserts that the specified group tabs UI is visible in the home screen.
		 *
		 * @param {Object} group The group whose tabs to assert the UI visibility on.
		 * @param {String} group.name The name of the group under test.
		 * @param {array} group.tabs The group tabs to assert the UI visibility on.
		 * @param {string} group.tab.list The tab list to assert the UI visibility on.
		 * @param {string} group.tab.items The item count the tab to assert the UI visibility on should have.
		 * @param {Object} group.options Any options to pass to the group/tab.
		 */
		assertTabUIVisible: function (group) {
			var browser = this;
			if (group) {
				if (group.name) {
					if (group.tabs) {
						this.section[group.name] = new DashboardGroup({
							groupName: group.name,
							tabs: group.tabs,
						});
						this.section[group.name].commands.assertTabUIVisible(browser, group.options);
					} else {
						throw new Error('adminUIItemScreen:assertTabUIVisible: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:assertTabUIVisible: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabUIVisible: No group specified!');
			}
			return this;
		},

		/**
		 * Asserts that the specified group tabs UI is not visible in the home screen.
		 *
		 * @param {Object} group The group whose tabs to assert the UI visibility on.
		 * @param {String} group.name The name of the group under test.
		 * @param {array} group.tabs The group tabs to assert the UI visibility on.
		 * @param {string} group.tab.list The tab list to assert the UI visibility on.
		 * @param {string} group.tab.items The item count the tab to assert the UI visibility on should have.
		 * @param {Object} group.options Any options to pass to the group/tab.
		 */
		assertTabUINotVisible: function (group) {
			var browser = this;
			if (group) {
				if (group.name) {
					if (group.tabs) {
						this.section[group.name] = new DashboardGroup({
							groupName: group.name,
							tabs: group.tabs,
						});
						this.section[group.name].commands.assertTabUINotVisible(browser, group.options);
					} else {
						throw new Error('adminUIItemScreen:assertTabUINotVisible: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:assertTabUINotVisible: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabUINotVisible: No group specified!');
			}
			return this;
		},

		/**
		 * Asserts that the specified group tabs DOM is present in the home screen.
		 *
		 * @param {Object} group The group whose tabs to assert the DOM visibility on.
		 * @param {String} group.name The name of the group under test.
		 * @param {array} group.tabs The group tabs to assert the DOM visibility on.
		 * @param {string} group.tab.list The tab list to assert the DOM visibility on.
		 * @param {string} group.tab.items The item count the tab to assert the DOM visibility on should have.
		 * @param {Object} group.options Any options to pass to the group/tab.
		 */
		assertTabDOMPresent: function (group) {
			var browser = this;
			if (group) {
				if (group.name) {
					if (group.tabs) {
						this.section[group.name] = new DashboardGroup({
							groupName: group.name,
							tabs: group.tabs,
						});
						this.section[group.name].commands.assertTabDOMPresent(browser, group.options);
					} else {
						throw new Error('adminUIItemScreen:assertTabDOMPresent: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:assertTabDOMPresent: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabDOMPresent: No group specified!');
			}
			return this;
		},

		/**
		 * Asserts that the specified group tabs DOM is not visible in the home screen.
		 *
		 * @param {Object} group The group whose tabs to assert the DOM visibility on.
		 * @param {String} group.name The name of the group under test.
		 * @param {array} group.tabs The group tabs to assert the DOM visibility on.
		 * @param {string} group.tab.list The tab list to assert the DOM visibility on.
		 * @param {string} group.tab.items The item count the tab to assert the DOM visibility on should have.
		 * @param {Object} group.options Any options to pass to the group/tab.
		 */
		assertTabDOMNotPresent: function (group) {
			var browser = this;
			if (group) {
				if (group.name) {
					if (group.tabs) {
						this.section[group.name] = new DashboardGroup({
							groupName: group.name,
							tabs: group.tabs,
						});
						this.section[group.name].commands.assertTabDOMNotPresent(browser, group.options);
					} else {
						throw new Error('adminUIItemScreen:assertTabDOMNotPresent: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:assertTabDOMNotPresent: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabDOMNotPresent: No group specified!');
			}
			return this;
		},

		/**
		 * Asserts that the specified group tabs text in the home screen equals the specified text.
		 *
		 * @param {Object} group The group whose tabs text is to be asserted for equality.
		 * @param {String} group.name The name of the group under test.
		 * @param {array} group.tabs The group tabs to assert equality on.
		 * @param {string} group.tab.list The tab list to assert equality on.
		 * @param {string} group.tab.items The item count the tab to assert equality on.
		 * @param {Object} group.options Any options to pass to the group/tab.
		 */
		assertTabTextEquals: function (group) {
			var browser = this;
			if (group) {
				if (group.name) {
					if (group.tabs) {
						this.section[group.name] = new DashboardGroup({
							groupName: group.name,
							tabs: group.tabs,
						});
						this.section[group.name].commands.assertTabTextEquals(browser, group.options);
					} else {
						throw new Error('adminUIItemScreen:assertTabTextEquals: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:assertTabTextEquals: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabTextEquals: No group specified!');
			}
			return this;
		},

		/**
		 * Asserts that the specified group tabs text in the home screen contains the specified text.
		 *
		 * @param {Object} group The group whose tabs text is to be asserted for equality.
		 * @param {String} group.name The name of the group under test.
		 * @param {array} group.tabs The group tabs to assert equality on.
		 * @param {string} group.tab.list The tab list to assert equality on.
		 * @param {string} group.tab.items The item count the tab to assert equality on.
		 * @param {Object} group.options Any options to pass to the group/tab.
		 */
		assertTabTextContains: function (group) {
			var browser = this;
			if (group) {
				if (group.name) {
					if (group.tabs) {
						this.section[group.name] = new DashboardGroup({
							groupName: group.name,
							tabs: group.tabs,
						});
						this.section[group.name].commands.assertTabTextContains(browser, group.options);
					} else {
						throw new Error('adminUIItemScreen:assertTabTextContains: No group tabs specified!');
					}
				} else {
					throw new Error('adminUIItemScreen:assertTabTextContains: No group name specified!');
				}
			} else {
				throw new Error('adminUIHomeScreen:assertTabTextContains: No group specified!');
			}
			return this;
		},

		/**
		 * Click the specified group tab UI in the home screen.
		 *
		 * @param {Object} group The group whose tabs to assert the UI visibility on.
		 * @param {String} group.name The name of the group under test.
		 * @param {Object} group.tab The group tab to click a UI element on.
		 * @param {string} group.tab.list The tab list to assert the UI visibility on.
		 * @param {string} group.tab.items The item count the tab to assert the UI visibility on should have.
		 * @param {string} group.click The clickable tab UI element.
		 * @param {Object} group.options Any options to pass to the group/tab.
		 */
		clickTabUI: function (group) {
			var browser = this;
			if (group) {
				if (group.name) {
					if (group.tab) {
						if (group.click) {
							this.section[group.name] = new DashboardGroup({
								groupName: group.name,
								tabs: [group.tab],
							});
							this.section[group.name].commands.clickTabUI(browser, group.click, group.options);
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
				throw new Error('adminUIHomeScreen:clickTabUI: No group specified!');
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
