/**
 * This module defines the commands an e2e test client may execute against keystone's reset confirmation screen.
 * When using the assertElement* commands, you may specify one of the predefined element selector properties
 * by prefixing it with the '@' sign or you can specify a string representing your own element selector.
 * See {@link https://github.com/keystonejs/keystone/blob/master/test/e2e/adminUI/tests/group005Item/uxTestItemView.js|usage example}.
 *
 * @module adminUIResetConfirmationScreen
 */
module.exports = {
	elements: {
		resetButton: 'button[data-button-type="confirm"]',
		cancelButton: 'button[data-button-type="cancel"]',
	},
	commands: [{
		/**
		 * Clicks the reset button.
		 */
		reset: function () {
			return this
				.click('@resetButton');
		},

		/**
		 * Clicks the cancel button.
		 */
		cancel: function () {
			return this
				.click('@cancelButton');
		},
	}],
};
