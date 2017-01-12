/*
	This page object describes global admin UI configuration and commands that are or should be
	most likely available in all pages.
 */
var objectAssign = require('object-assign');
var e2e = require('../../..');
var keystone = e2e.keystone;
var utils = require('keystone-utils');
var self;

/**
 * This module defines the commands an e2e test client may execute against keystone's Admin UI main app.
 * When using the assertElement* or clickUIElement commands, you may specify one of the predefined element
 * selector properties by prefixing it with the '@' sign or you can specify a string representing your own
 * element selector.  See {@link https://github.com/keystonejs/keystone/tree/master/test/e2e/adminUI/tests/group002App|usage example}.
 *
 * @module adminUIApp
 */
module.exports = self = {
	url: 'http://' + keystone.get('host') + ':' + keystone.get('port') + '/keystone/',
	screenTransitionTimeout: 1000,
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
					throw new Error('adminUIApp:must specify an element!');
				}
			} else {
				throw new Error('adminUIApp:invalid config specification!');
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
					throw new Error('adminUIApp:must specify an element!');
				}
			} else {
				throw new Error('adminUIApp:invalid config specification!');
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
					throw new Error('adminUIApp:must specify an element!');
				}
			} else {
				throw new Error('adminUIApp:invalid config specification!');
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
					throw new Error('adminUIApp:must specify an element!');
				}
			} else {
				throw new Error('adminUIApp:invalid config specification!');
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
					throw new Error('adminUIApp:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIApp:invalid config specification!');
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
					throw new Error('adminUIApp:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIApp:invalid config specification!');
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
					throw new Error('adminUIApp:must specify an element and text!');
				}
			} else {
				throw new Error('adminUIApp:invalid config specification!');
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
					throw new Error('adminUIApp:must specify a config element, attribute, and value!');
				}
			} else {
				throw new Error('adminUIApp:invalid config specification!');
			}
			return this;
		},

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
			this.waitForElementVisible('@logoutIcon');
			this.api.pause(self.screenTransitionTimeout);
			this.click('@logoutIconLink');
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
			this.waitForElementVisible('@signinScreen', _config.timeout);
			this.api.pause(self.screenTransitionTimeout);
			return this;
		},

		/**
		 * Waits for the home screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForHomeScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			this.waitForElementVisible('@homeScreen', _config.timeout);
			this.api.pause(self.screenTransitionTimeout);
			return this;
		},

		/**
		 * Waits for the create item form screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForInitialFormScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			this.waitForElementVisible('@initialFormScreen', _config.timeout);
			this.api.pause(self.screenTransitionTimeout);
			return this;
		},

		/**
		 * Waits for the delete confirmation screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForDeleteConfirmationScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			this.waitForElementVisible('@deleteConfirmationScreen', _config.timeout);
			this.api.pause(self.screenTransitionTimeout);
			return this;
		},

		/**
		 * Waits for the reset confirmation screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForResetConfirmationScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			this.waitForElementVisible('@resetConfirmationScreen', _config.timeout);
			this.api.pause(self.screenTransitionTimeout);
			return this;
		},

		/**
		 * Waits for the item list screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForListScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			this.waitForElementVisible('@listScreen', _config.timeout);
			this.api.pause(self.screenTransitionTimeout);
			return this;
		},

		/**
		 * Waits for the item edit form screen UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForItemScreen: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			this.waitForElementVisible('@itemScreen', _config.timeout);
			this.api.pause(self.screenTransitionTimeout);
			return this;
		},

		/**
		 * Waits for the secondary navbar UI to be visible.
		 *
		 * @param {Object} config The config spec.
		 * @param {number} config.timeout Optional timeout to wait for.
		 */
		waitForForSecondaryNavbar: function (config) {
			var _config = objectAssign({}, { timeout: this.api.globals.waitForConditionTimeout }, config);
			this.waitForElementVisible('@secondaryNavbar', _config.timeout);
			this.api.pause(self.screenTransitionTimeout);
			return this;
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
			return this.click(config.element);
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
  	 * @property {string} signinScreen The element used to ID the signin screen.
  	 * @property {string} homeScreen The element used to ID the home screen.
  	 * @property {string} listScreen The element used to ID the list screen.
  	 * @property {string} itemScreen The element used to ID the edit item screen.
  	 * @property {string} initialFormScreen The element used to ID the create item form screen.
  	 * @property {string} deleteConfirmationScreen The element used to ID the delete confirmation screen.
  	 * @property {string} resetConfirmationScreen The element used to ID the reset confirmation screen.
  	 * @property {string} homeIcon The element used to ID the home icon.
  	 * @property {string} homeIconLink The element used to ID the home icon link.
  	 * @property {string} frontPageIcon The element used to ID the frontend page icon.
  	 * @property {string} frontPageIconLink The element used to ID the frontend page icon link.
  	 * @property {string} logoutIcon The element used to ID the logout icon.
  	 * @property {string} logoutIconLink The element used to ID the logout icon link.
  	 * @property {string} primaryNavbar The element used to ID the primary navbar.
  	 * @property {string} secondaryNavbar The element used to ID the secondary navbar.
	 */
	elements: {
		// ADMIN UI APP SCREENS
		signinScreen: '#signin-view',
		homeScreen: 'div[data-screen-id="home"]',
		listScreen: 'div[data-screen-id="list"]',
		itemScreen: 'div[data-screen-id="item"]',
		initialFormScreen: 'div[data-screen-id="modal-dialog"]',
		deleteConfirmationScreen: 'div[data-screen-id="modal-dialog"]',
		resetConfirmationScreen: 'div[data-screen-id="modal-dialog"]',

		// APP LINKS
		homeIcon: '.primary-navbar [data-section-label="octicon-home"]',
		homeIconLink: '.primary-navbar [data-section-label="octicon-home"] a',
		frontPageIcon: '.primary-navbar [data-section-label="octicon-globe"]',
		frontPageIconLink: '.primary-navbar [data-section-label="octicon-globe"] a',
		logoutIcon: '.primary-navbar [data-section-label="octicon-sign-out"]',
		logoutIconLink: '.primary-navbar [data-section-label="octicon-sign-out"] a',
		primaryNavbar: '.primary-navbar',
		secondaryNavbar: '.secondary-navbar',
	},
};
