var dashboardGroup = require('./adminUIDashboardGroup');

var accessdashboardGroup = dashboardGroup({
	groupName: 'Access',
	tabs: [
		{ name: 'users', items: '2 Items' },
	],
});

var fieldsdashboardGroup = dashboardGroup({
	groupName: 'Fields',
	tabs: [
		{ name: 'booleans', items: '0 Items' },
		{ name: 'codes', items: '0 Items' },
		{ name: 'emails', items: '0 Items' },
		{ name: 'names', items: '0 Items' },
		{ name: 'numbers', items: '0 Items' },
		{ name: 'selects', items: '0 Items' },
	],
});

var otherdashboardGroup = dashboardGroup({
	groupName: 'Other',
	tabs: [
		{ name: 'other-lists', items: '0 Items' },
	],
});

module.exports = {
	commands: [{
		/**
		 * Asserts that the specified list screen element UI is visible.
		 *
		 * @param {string} element The element whose UI should be visible.
		 */
		assertElementIsVisible: function (element) {
			return this.expect.element('@' + element).to.be.visible;
		},

		/**
		 * Asserts that the specified list screen element UI is not visible.
		 *
		 * @param {string} element The element whose UI should not be visible.
		 */
		assertElementIsNotVisible: function (element) {
			return this.expect.element('@' + element).to.not.be.visible;
		},

		/**
		 * Asserts that the specified list screen element DOM is present.
		 *
		 * @param {string} element The element whose DOM should be present.
		 */
		assertElementIsPresent: function (element) {
			return this.expect.element('@' + element).to.be.present;
		},

		/**
		 * Asserts that the specified list screen element DOM is not present.
		 *
		 * @param {string} element The element whose DOM should not be present.
		 */
		assertElementIsNotPresent: function (element) {
			return this.expect.element('@' + element).to.not.be.present;
		},

		/**
		 * Asserts that the specified list screen element text equals the specified value.
		 *
		 * @param {string} element The element whose text should be compared to the input text.
		 * @param {String} text The text to compare against.
		 */
		assertElementTextEquals: function (element, text) {
			return this.expect.element('@' + element).text.to.equal(text);
		},

		/**
		 * Asserts that the specified list screen element text not equals the specified value.
		 *
		 * @param {string} element The element whose text should be compared to the input text.
		 * @param {String} text The text to compare against.
		 */
		assertElementTextNotEquals: function (element, text) {
			return this.expect.element('@' + element).text.to.not.equal(text);
		},

		/**
		 * Asserts that the specified list screen element text contains the specified value.
		 *
		 * @param {string} element The element whose text should contain the input text.
		 * @param {String} text The text to compare against.
		 */
		assertElementTextContains: function (element, text) {
			return this.expect.element('@' + element).text.to.contain(text);
		},

		/**
		 * Asserts that the specified app screen element has the specified attribute.
		 *
		 * @param {string} element The element whose UI should be visible.
		 * @param {string} attribute The attribute that should be present in the element.
		 * @param {string} value The value that the attribute should have.
		 */
		assertElementHasAttribute: function (element, attribute, value) {
			return this.expect.element('@' + element).to.have.attribute(attribute).which.contains(value);
		},
	}],
	elements: {
		dashboardHeader: '.dashboard-heading',
	},
	sections: {
		accessGroup: accessdashboardGroup,
		fieldsGroup: fieldsdashboardGroup,
		otherGroup: otherdashboardGroup,
	},
};
