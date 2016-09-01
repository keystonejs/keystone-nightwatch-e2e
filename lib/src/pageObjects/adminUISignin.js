module.exports = {
	elements: {
		emailInput: {
			selector: 'input[name=email]',
		},
		passwordInput: {
			selector: 'input[name=password]',
		},
		submitButton: {
			selector: 'button[type=submit]',
		},
	},
	commands: [{
		signin: function (user, password) {
			return this
				.setValue('@emailInput', user || 'user@test.e2e')
				.setValue('@passwordInput', password || 'test')
				.click('@submitButton');
		},
		assertUI: function () {
			this
				.expect.element('@emailInput').to.be.visible;
			this
				.expect.element('@passwordInput').to.be.visible;
			this
				.expect.element('@submitButton').to.be.visible;
			return this;
		},
	}],
};
