var objectAssign = require('object-assign');

module.exports = {
	elements: {
		/**
		 * The login email element.
		 */
		email: 'input[name=email]',

		/**
		 * The login password element.
		 */
		password: 'input[name=password]',

		/**
		 * The login submit button element.
		 */
		submitButton: 'button[type=submit]',
	},
	commands: [{
		/**
		 * Signs in to the Admin UI.
		 *
		 * @param {Object} config The login info.
		 * @param {string} config.user The login username/email.
		 * @param {string} config.password The login password.
		 * @param {boolean} config.wait Whether to wait for the home screen by default.  Optional, defaults to true.
		 */
		signin: function (config) {
			var _config = objectAssign({}, { user: 'user@test.e2e', password: 'test', wait: true }, config);
			this
				.setValue('@email', _config.user)
				.setValue('@password', _config.password)
				.click('@submitButton');
			if (_config.wait) this.api.page.adminUIApp().waitForHomeScreen();
			return this;
		},
		assertUI: function () {
			this
				.expect.element('@email').to.be.visible;
			this
				.expect.element('@password').to.be.visible;
			this
				.expect.element('@submitButton').to.be.visible;
			return this;
		},
	}],
};
