var DashboardTab = require('./adminUIDashboardTab');

module.exports = function DashboardGroup (config) {
	var tabs = {};
	config.tabs.forEach(function (tab) {
		if (tab.listName) {
			if (tab.items) {
				tabs[tab.listName] = new DashboardTab(tab);
			} else {
				throw new Error('DashboardGroup:config: No tab items specified!');
			}
		} else {
			throw new Error('DashboardGroup:config: No tab list name specified!');
		}
	});

	var selectElem = function (elem) {
		return self.selector + ' ' + self.elements[elem];
	};

	var self = {
		selector: '.dashboard-group[data-section-label="' + config.groupName + '"]',
		/**
		 * Home screen group elements.
		 */
		elements: {
			/**
			 * The group heading element.
			 */
			heading: '.dashboard-group__heading',
		},
		tabs: tabs,
		commands: {
			assertTabUIVisible: function (browser, options) {
				browser.expect.element(selectElem('heading')).to.be.visible;
				for (var tab in self.tabs) {
					if (self.tabs.hasOwnProperty(tab)) {
						self.tabs[tab].commands.assertTabUIVisible(browser, options);
					}
				}
				return browser;
			},
			assertTabUINotVisible: function (browser, options) {
				browser.expect.element(selectElem('heading')).to.not.be.visible;
				for (var tab in self.tabs) {
					if (self.tabs.hasOwnProperty(tab)) {
						self.tabs[tab].commands.assertTabUINotVisible(browser, options);
					}
				}
				return browser;
			},
			assertTabDOMPresent: function (browser, options) {
				browser.expect.element(selectElem('heading')).to.be.present;
				for (var tab in self.tabs) {
					if (self.tabs.hasOwnProperty(tab)) {
						self.tabs[tab].commands.assertTabDOMPresent(browser, options);
					}
				}
				return browser;
			},
			assertTabDOMNotPresent: function (browser, options) {
				browser.expect.element(selectElem('heading')).to.not.be.present;
				for (var tab in self.tabs) {
					if (self.tabs.hasOwnProperty(tab)) {
						self.tabs[tab].commands.assertTabDOMNotPresent(browser, options);
					}
				}
				return browser;
			},
			assertTabTextEquals: function (browser, options) {
				for (var tab in self.tabs) {
					if (self.tabs.hasOwnProperty(tab)) {
						self.tabs[tab].commands.assertTabTextEquals(browser, options);
					}
				}
				return browser;
			},
			assertTabTextContains: function (browser, options) {
				for (var tab in self.tabs) {
					if (self.tabs.hasOwnProperty(tab)) {
						self.tabs[tab].commands.assertTabTextContains(browser, options);
					}
				}
				return browser;
			},
			clickTabUI: function (browser, clickable, options) {
				for (var tab in self.tabs) {
					if (self.tabs.hasOwnProperty(tab)) {
						self.tabs[tab].commands.clickTabUI(browser, clickable, options);
					}
				}
				return browser;
			},
		},
	};

	return self;
};
