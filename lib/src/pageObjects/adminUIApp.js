/*
	This page object describes global admin UI configuration and commands that are or should be
	most likely available in all pages.
 */
var objectAssign = require('object-assign');
var e2e = require('../../..');
var keystone = e2e.keystone;
var utils = require('keystone-utils');

module.exports = {
	url: 'http://' + keystone.get('host') + ':' + keystone.get('port') + '/keystone/',
	pause: 1000,
	commands: [{
		/**
		 * Navigates to the signin screen.
		 *
		 * @param {Object} config The config spec.
		 * @param {boolean} config.wait Whether to wait for the target UI.  Optional, defaults to true.
		 */
		gotoSigninScreen: function (config) {
			var _config = objectAssign({}, { wait: true }, config);
			this.navigate();
			if (_config.wait) this.waitForSigninScreen();
			return this;
		},

		/**
		 * Navigates to the home screen.
		 *
		 * @param {Object} config The config spec.
		 * @param {boolean} config.wait Whether to wait for the target UI.  Optional, defaults to true.
		 */
		gotoHomeScreen: function (config) {
			var _config = objectAssign({}, { wait: true }, config);
			this.navigate();
			if (_config.wait) this.waitForHomeScreen();
			return this;
		},

		/**
		 * Opens the list of items given the specified list config spec.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.section The section in the primary navbar to click on.
		 * @param {string} config.list The list in the secondary navbar to click on.
		 * @param {boolean} config.wait Whether to wait for the target UI.  Optional, defaults to true.
		 */
		openList: function (config) {
			var _config = objectAssign({}, { wait: true }, config);
			if (_config.section && _config.list) {
				this.clickPrimaryNavbar({ section: _config.section })
					.waitForForSecondaryNavbar()
					.clickSecondaryNavbar({ list: _config.list });
			} else {
				throw new Error('adminUIApp:must specify a navbar section and a list!');
			}
			if (_config.wait) this.waitForListScreen();
			return this;
		},

		/**
		 * Clicks the specified section in the primary navbar.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.section The section in the primary navbar to click on.
		 * @param {boolean} config.wait Whether to wait for the target UI.  Optional, defaults to true.
		 */
		clickPrimaryNavbar: function (config) {
			var _config = objectAssign({}, { wait: true }, config);
			if (_config.section) {
				this.click(this.getPrimaryNavbarSectionElement({ section: _config.section }));
			} else {
				throw new Error('adminUIApp:must specify a navbar section!');
			}
			if (_config.wait) this.waitForForSecondaryNavbar();
			return this;
		},

		/**
		 * Clicks the specified list in the secondary navbar.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} list The list in the secondary navbar to click on.
		 * @param {boolean} config.wait Whether to wait for the target UI.  Optional, defaults to true.
		 */
		clickSecondaryNavbar: function (config) {
			var _config = objectAssign({}, { wait: true }, config);
			if (_config.list) {
				this.click(this.getSecondaryNavbarListElement({ list: _config.list }));
			} else {
				throw new Error('adminUIApp:must specify a navbar list!');
			}
			if (_config.wait) this.waitForListScreen();
			return this;
		},

		/**
		 * Logout the current user.
		 *
		 * @param {Object} config The config spec.
		 * @param {boolean} config.wait Whether to wait for the signin screen by default.  Optional, defaults to true.
		 */
		signout: function (config) {
			var _config = objectAssign({}, { wait: true }, config);
			this.api.pause(500);
			this
				.waitForElementVisible('@logoutIcon')
				.click('@logoutIconLink');
			if (_config.wait) this.waitForSigninScreen();
			return this;
		},

		/**
		 * Waits for the signin screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForSigninScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			return this.waitForElementVisible('@signinScreen', _config.timeout);
		},

		/**
		 * Waits for the home screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForHomeScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			return this.waitForElementVisible('@homeScreen', _config.timeout);
		},

		/**
		 * Waits for the create item form screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForInitialFormScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			return this.waitForElementVisible('@initialFormScreen', _config.timeout);
		},

		/**
		 * Waits for the delete confirmation screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForDeleteConfirmationScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			return this.waitForElementVisible('@deleteConfirmationScreen', _config.timeout);
		},

		/**
		 * Waits for the reset confirmation screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForResetConfirmationScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			return this.waitForElementVisible('@resetConfirmationScreen', _config.timeout);
		},

		/**
		 * Waits for the item list screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForListScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			return this.waitForElementVisible('@listScreen', _config.timeout);
		},

		/**
		 * Waits for the item edit form screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForItemScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			return this.waitForElementVisible('@itemScreen', _config.timeout);
		},

		/**
		 * Waits for the secondary navbar UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForForSecondaryNavbar: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			return this.waitForElementVisible('@secondaryNavbar', _config.timeout);
		},

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
		 * Asserts that the specified primary navbar section is visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.section The section that should be visible in the primary navbar.
		 */
		assertPrimaryNavbarSectionVisible: function (config) {
			return this.expect.element(this.getPrimaryNavbarSectionElement({ section: config.section })).to.be.visible;
		},

		/**
		 * Asserts that the specified secondary navbar list is visible.  Make sure that the parent
		 * primary navbar section is clicked on first.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.list The list that should be visible in the secondary navbar.
		 */
		assertSecondaryNavbarListVisible: function (config) {
			return this.expect.element(this.getSecondaryNavbarListElement({ list: config.list })).to.be.visible;
		},

		/**
		 * Clicks the specified UI element.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.element The element whose UI should be clicked.
		 */
		clickUIElement: function (config) {
			return this.click('@' + config.element);
		},

		/**
		 * Asserts that the specified css selector is visible.  This should be used for testing
		 * frontend functionality only!
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.css The css selector to check for visibility.
		 */
		assertCssIsVisible: function (config) {
			return this.expect.element(config.css).to.be.visible;
		},

		/**
		 * Asserts that the specified css contains the specified text.  This should be used for testing
		 * frontend functionality only!
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.css The css selector containing the text.
		 * @param {string} config.text The exact text that should be found at the css selector location.
		 */
		assertCssTextEquals: function (config) {
			return this.expect.element(config.css).text.to.equal(config.text);
		},

		/**
		 * Asserts that the specified css contains the specified text.  This should be used for testing
		 * frontend functionality only!
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.css The css selector containing the text.
		 * @param {string} config.text The exact or partial text that should be found at the css selector location.
		 */
		assertCssTextContains: function (config) {
			return this.expect.element(config.css).text.to.contain(config.text);
		},


		//
		// PRIVATE METHODS
		//
		/**
		 * Gets the primary navbar section element.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.section The navbar section to get the element for.
		 */
		getPrimaryNavbarSectionElement: function (config) {
			var label = utils.keyToLabel(config.section);
			return '.primary-navbar li[data-section-label="' + label + '"]';
		},

		/**
		 * Gets the secondary navbar list element.
		 *
		 * @param {Object} config The config spec.
		 * @param {string} config.list The navbar list to get the element for.
		 */
		getSecondaryNavbarListElement: function (config) {
			var path = utils.keyToPath(config.list, true);
			return '.secondary-navbar li[data-list-path="' + path + '"]';
		},
	}],
	/**
	 * The admin UI app elements.
	 */
	elements: {
		// ADMIN UI APP SCREENS
		/**
		 * The signin screen element
		 */
		signinScreen: '#signin-view',

		/**
		 * The home screen element
		 */
		homeScreen: 'div[data-screen-id="home"]',

		/**
		 * The list screen element
		 */
		listScreen: 'div[data-screen-id="list"]',

		/**
		 * The edit item screen element
		 */
		itemScreen: 'div[data-screen-id="item"]',

		/**
		 * The create item form screen element
		 */
		initialFormScreen: '.Modal-dialog',

		/**
		 * The delete confirmation screen element
		 */
		deleteConfirmationScreen: '.Modal-dialog',

		/**
		 * The reset confirmation screen element
		 */
		resetConfirmationScreen: '.Modal-dialog',

		// APP LINKS
		/**
		 * The home icon element.
		 */
		homeIcon: '.primary-navbar [data-section-label="octicon-home"]',

		/**
		 * The home icon link element.
		 */
		homeIconLink: '.primary-navbar [data-section-label="octicon-home"] a',

		/**
		 * The frontend page icon element.
		 */
		frontPageIcon: '.primary-navbar [data-section-label="octicon-globe"]',

		/**
		 * The frontend page icon link element.
		 */
		frontPageIconLink: '.primary-navbar [data-section-label="octicon-globe"] a',

		/**
		 * The logout icon element.
		 */
		logoutIcon: '.primary-navbar [data-section-label="octicon-sign-out"]',

		/**
		 * The logout icon link element.
		 */
		logoutIconLink: '.primary-navbar [data-section-label="octicon-sign-out"] a',

		/**
		 * The primary navbar element.
		 */
		primaryNavbar: '.primary-navbar',

		/**
		 * The secondary navbar element.
		 */
		secondaryNavbar: '.secondary-navbar',
	},
};
