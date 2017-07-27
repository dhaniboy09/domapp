module.exports = {
	'Admin User sign in with correct credentials': (browser) => {
		browser
			.url('http://localhost:8000/signin')
			.waitForElementVisible('body', 2000)
			.setValue('input[name=email]', 'dhs@yahoo.com')
			.setValue('input[name=password]', 'nkg643')
			.click('#button-signin')
			.waitForElementVisible('#allDocuments-header', 5000)
			.assert.containsText('#sheader', 'All Documents');
	},
	'Admin User searches for users': (browser) => {
		browser
			.url('http://localhost:8000/allusers')
			.waitForElementVisible('body', 2000)
			.setValue('#search', 'Rose')
			.waitForElementVisible('#users-table', 15000)
			.clearValue('input[name=search]')
			.setValue('#search', 'Todd')
			.click('#btn-userdelete')
			.waitForElementVisible('.react-confirm-alert', 15000)
			.click('#btn-cancel')
			.waitForElementVisible('#users-table', 15000)
			.end();
	},
};
