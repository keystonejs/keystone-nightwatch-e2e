/**
 * This module defines the commands an e2e test client may execute against keystone's delete confirmation screen.
 * When using the assertElement* commands, you may specify one of the predefined element selector properties
 * by prefixing it with the '@' sign or you can specify a string representing your own element selector.
 * See {@link https://github.com/keystonejs/keystone/blob/master/test/e2e/adminUI/tests/group005Item/uxTestItemView.js|usage example}.
 *
 * @module adminUIDeleteConfirmationScreen
 */
module.exports = {
	elements: {
		deleteButton: 'button[data-button-type="confirm"]',
		cancelButton: 'button[data-button-type="cancel"]',
	},
	commands: [{
		/**
		 * Clicks the delete button.
		 */
		delete: function () {
			return this
				.click('@deleteButton');
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
