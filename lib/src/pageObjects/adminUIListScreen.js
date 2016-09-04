module.exports = {
	elements: {
		noItemsFoundNoText: '.BlankState__heading',
		singleItemDeleteIcon: '.ItemList__control--delete',
		itemDeleteIcon: '.Table.ItemList .ItemList__col--control.ItemList__col--delete',
		searchInputField: '[data-search-input-field]',
		searchInputFieldClearIcon: '[data-search-input-field-clear-icon]',
		filterDropdown: '#listHeaderFilterButton',
		columnDropdown: '#listHeaderColumnButton',
		downloadDropdown: '#listHeaderDownloadButton',
		expandTableIcon: 'div.InputGroup_section:nth-child(5) > button:nth-child(1)',
		createItemButton: 'button[data-e2e-list-create-button]',
		createFirstItemButton: 'button[data-e2e-list-create-button="no-results"]',
		createMoreItemsButton: 'button[data-e2e-list-create-button="header"]',
		paginationCount: '.Pagination__count',
		firstUserItemIsNotAdmin: {
			locateStrategy: 'xpath',
			selector: '//tbody/tr[1]/td[4]/div/span[contains(@class, "octicon-x")]',
		},
		firstUserItemIsMember: {
			locateStrategy: 'xpath',
			selector: '//tbody/tr[1]/td[5]/div/span[contains(@class, "octicon-check")]',
		},
		secondUserItemIsAdmin: {
			locateStrategy: 'xpath',
			selector: '//tbody/tr[2]/td[4]/div/span[contains(@class, "octicon-check")]',
		},
		secondUserItemIsNotMember: {
			locateStrategy: 'xpath',
			selector: '//tbody/tr[2]/td[5]/div/span[contains(@class, "octicon-x")]',
		},
	},
	commands: [{
		assertNthColumnHeaderContains: function (n, value) {
			return this.expect.element(getNthColumnHeaderSelector(n)).text.to.contain(value);
		},
		assertNthColumnHeaderEquals: function (n, value) {
			return this.expect.element(getNthColumnHeaderSelector(n)).text.to.equal(value);
		},
		assertIthItemJthColumnContains: function (i, j, value) {
			return this.expect.element(getIthItemJthColumnSelector(i, j)).text.to.contain(value);
		},
		assertIthItemJthColumnEquals: function (i, j, value) {
			return this.expect.element(getIthItemJthColumnSelector(i, j)).text.to.equal(value);
		},
		createItem: function () {
			return this
				.click('@createItemButton');
		},
		createFirstItem: function () {
			return this
				.click('@createFirstItemButton');
		},
		createMoreItems: function () {
			return this
				.click('@createMoreItemsButton');
		},
		deleteNthItem: function (n) {
			return this
				.click(getNthItemDeleteIconSelector(n));
		},
		navigateToNthItem: function (n) {
			return this
				.click(getNthItemLinkSelector(n));
		},

		// The following block of commands simply provide more user-friendly names for specific cases of the above commands.
		// The commands in this block should only call commands which are defined above.

		assertFirstItemNameEquals: function (value) {
			this.assertIthItemJthColumnEquals(1, 1, value);
		},
		assertFirstItemNameContains: function (value) {
			this.assertIthItemJthColumnContains(1, 1, value);
		},
		deleteFirstItem: function () {
			return this.deleteNthItem(1);
		},
		navigateToFirstItem: function () {
			return this.navigateToNthItem(1);
		},
	}],
};

function getNthItemDeleteIconSelector (n) {
	return '.ItemList-wrapper tbody tr:nth-of-type(' + n + ') td:nth-of-type(1) button';
}

function getNthItemLinkSelector (n) {
	return '.ItemList-wrapper tbody tr:nth-of-type(' + n + ') td:nth-of-type(2) a';
}

function getNthColumnHeaderSelector (n) {
	return '.ItemList-wrapper thead th:nth-of-type(' + (n + 1) + ')';
}

function getIthItemJthColumnSelector (i, j) {
	return '.ItemList-wrapper tbody tr:nth-of-type(' + i + ') td:nth-of-type(' + (j + 1) + ')';
}
