module.exports = {
	'Admin User sign in with correct credentials': (browser) => {
		browser
			.url('http://localhost:8000/signin')
			.waitForElementVisible('body', 90000)
			.setValue('input[name=email]', 'dhs@yahoo.com')
			.setValue('input[name=password]', 'nkg643')
			.click('#button-signin')
			.waitForElementVisible('.document-panel', 90000)
			.assert.containsText('#sheader', 'All Documents');
	},
	'Admin User searches for users': (browser) => {
		browser
			.url('http://localhost:8000/allusers')
			.waitForElementVisible('body', 90000)
			.setValue('#search', 'Rose')
			.waitForElementVisible('#users-table', 90000)
			.clearValue('input[name=search]')
			.setValue('#search', 'Todd')
			.click('#btn-userdelete')
			.waitForElementVisible('.react-confirm-alert', 90000)
			.click('#btn-cancel')
			.waitForElementVisible('#users-table', 90000)
			.end();
	},
};
