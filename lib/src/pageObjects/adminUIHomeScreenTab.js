var utils = require('keystone-utils');

/**
 * This is a private module.  It should not be used directly by users.
 *
 * @private
 */
module.exports = function HomeScreenTab (config) {
	var selectElem = function (elem) {
		return self.selector + ' ' + self.elements[elem];
	};

	var listPath = utils.keyToPath(config.listName, true);
	var listLabel = utils.keyToLabel(listPath);

	var self = {
		selector: '.dashboard-group__list[data-list-path="' + listPath + '"]',
		/**
		 * Home screen tab elements.
		 */
		elements: {
			/**
			 * The tab label element.
			 */
			tabLabel: '.dashboard-group__list-label',

			/**
			 * The tab item count element.
			 */
			tabItemCount: '.dashboard-group__list-count',

			/**
			 * The tab plus icon element.
			 */
			tabPlusIconLink: 'a.dashboard-group__list-create.octicon.octicon-plus',
		},
		commands: {
			assertTabUIVisible: function (browser, options) {
				browser
					.expect.element(selectElem('tabLabel')).to.be.visible;
				browser
					.expect.element(selectElem('tabPlusIconLink')).to.be.visible;
				browser
					.expect.element(selectElem('tabItemCount')).to.be.visible;
				return browser;
			},
			assertTabUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('tabLabel')).to.not.be.visible;
				browser
					.expect.element(selectElem('tabPlusIconLink')).to.not.be.visible;
				browser
					.expect.element(selectElem('tabItemCount')).to.not.be.visible;
				return browser;
			},
			assertTabDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('tabLabel')).to.be.present;
				browser
					.expect.element(selectElem('tabPlusIconLink')).to.be.present;
				browser
					.expect.element(selectElem('tabItemCount')).to.be.present;
				return browser;
			},
			assertTabDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('tabLabel')).to.not.be.present;
				browser
					.expect.element(selectElem('tabPlusIconLink')).to.not.be.present;
				browser
					.expect.element(selectElem('tabItemCount')).to.not.be.present;
				return browser;
			},
			assertTabTextEquals: function (browser, options) {
				browser
					.expect.element(selectElem('tabLabel')).text.to.equal(listLabel);
				browser
					.expect.element(selectElem('tabItemCount')).text.to.equal(config.items);
				return browser;
			},
			assertTabTextContains: function (browser, options) {
				browser
					.expect.element(selectElem('tabLabel')).text.to.contain(listLabel);
				browser
					.expect.element(selectElem('tabItemCount')).text.to.contain(config.items);
				return browser;
			},
			clickTabUI: function (browser, clickable, options) {
				browser
					.click(selectElem(clickable));
				var wait = options && options.wait || true;
				if (wait) {
					if (clickable === 'tabLabel' || clickable === 'tabItemCount') {
						browser.api.page.adminUIApp().waitForListScreen();
					} else if (clickable === 'tabPlusIconLink') {
						browser.api.page.adminUIApp().waitForInitialFormScreen();
					}
				}
				return browser;
			},
		},
	};

	return self;
};
