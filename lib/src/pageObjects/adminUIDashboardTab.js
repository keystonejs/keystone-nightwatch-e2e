var utils = require('keystone-utils');

module.exports = function DashboardTab (config) {
	var selectElem = function (elem) {
		return self.selector + ' ' + self.elements[elem];
	};

	var listPath = utils.keyToPath(config.list, true);
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
			label: '.dashboard-group__list-label',

			/**
			 * The tab item count element.
			 */
			itemCount: '.dashboard-group__list-count',

			/**
			 * The tab plus icon element.
			 */
			plusIconLink: 'a.dashboard-group__list-create.octicon.octicon-plus',
		},
		commands: {
			assertTabUIVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.visible;
				browser
					.expect.element(selectElem('plusIconLink')).to.be.visible;
				browser
					.expect.element(selectElem('itemCount')).to.be.visible;
				return browser;
			},
			assertTabUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.visible;
				browser
					.expect.element(selectElem('plusIconLink')).to.not.be.visible;
				browser
					.expect.element(selectElem('itemCount')).to.not.be.visible;
				return browser;
			},
			assertTabDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.present;
				browser
					.expect.element(selectElem('plusIconLink')).to.be.present;
				browser
					.expect.element(selectElem('itemCount')).to.be.present;
				return browser;
			},
			assertTabDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.present;
				browser
					.expect.element(selectElem('plusIconLink')).to.not.be.present;
				browser
					.expect.element(selectElem('itemCount')).to.not.be.present;
				return browser;
			},
			assertTabTextEquals: function (browser, options) {
				browser
					.expect.element(selectElem('label')).text.to.equal(listLabel);
				browser
					.expect.element(selectElem('itemCount')).text.to.equal(config.items);
				return browser;
			},
			assertTabTextContains: function (browser, options) {
				browser
					.expect.element(selectElem('label')).text.to.contain(listLabel);
				browser
					.expect.element(selectElem('itemCount')).text.to.contain(config.items);
				return browser;
			},
			clickTabUI: function (browser, clickable, options) {
				browser
					.click(selectElem(clickable));
				var wait = options && options.wait || true;
				if (wait) {
					if (clickable === 'label' || clickable === 'itemCount') {
						browser.api.page.adminUIApp().waitForListScreen();
					} else if (clickable === 'plusIconLink') {
						browser.api.page.adminUIApp().waitForInitialFormScreen();
					}
				}
				return browser;
			},
		},
	};

	return self;
};
