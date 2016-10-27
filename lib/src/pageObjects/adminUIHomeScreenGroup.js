var HomeScreenTab = require('./adminUIHomeScreenTab');

/**
 * This is a private module.  It should not be used directly by users.
 *
 * @private
 */
module.exports = function HomeScreenGroup (config) {
	var tabs = {};
	config.tabs.forEach(function (tab) {
		if (tab.listName) {
			if (tab.items) {
				tabs[tab.listName] = new HomeScreenTab(tab);
			} else {
				throw new Error('HomeScreenGroup:config: No tab items specified!');
			}
		} else {
			throw new Error('HomeScreenGroup:config: No tab list name specified!');
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
			groupHeading: '.dashboard-group__heading',
		},
		tabs: tabs,
		commands: {
			assertTabUIVisible: function (browser, options) {
				browser.expect.element(selectElem('groupHeading')).to.be.visible;
				for (var tab in self.tabs) {
					if (self.tabs.hasOwnProperty(tab)) {
						self.tabs[tab].commands.assertTabUIVisible(browser, options);
					}
				}
				return browser;
			},
			assertTabUINotVisible: function (browser, options) {
				browser.expect.element(selectElem('groupHeading')).to.not.be.visible;
				for (var tab in self.tabs) {
					if (self.tabs.hasOwnProperty(tab)) {
						self.tabs[tab].commands.assertTabUINotVisible(browser, options);
					}
				}
				return browser;
			},
			assertTabDOMPresent: function (browser, options) {
				browser.expect.element(selectElem('groupHeading')).to.be.present;
				for (var tab in self.tabs) {
					if (self.tabs.hasOwnProperty(tab)) {
						self.tabs[tab].commands.assertTabDOMPresent(browser, options);
					}
				}
				return browser;
			},
			assertTabDOMNotPresent: function (browser, options) {
				browser.expect.element(selectElem('groupHeading')).to.not.be.present;
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
			clickTabUI: function (browser, listName, clickable, options) {
				var foundTabListName = false;
				for (var tab in self.tabs) {
					if (self.tabs.hasOwnProperty(tab) && tab === listName) {
						self.tabs[tab].commands.clickTabUI(browser, clickable, options);
						foundTabListName = true;
					}
				}
				if (!foundTabListName) {
					throw new Error('HomeScreenGroup:config: No tab list name found matching: ' + listName + '!');
				}
				return browser;
			},
		},
	};

	return self;
};
