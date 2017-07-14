module.exports = {
	'User sign in with correct credentials': (browser) => {
		browser
			.url('http://localhost:8000/signin')
			.waitForElementVisible('body', 2000)
			.setValue('input[name=email]', 'tc@yahoo.com')
			.setValue('input[name=password]', '123456789')
			.click('#button-signin')
			.waitForElementVisible('#allDocuments-header', 5000)
			.assert.containsText('#sheader', 'All Documents');
	},
	'User creates a document': (browser) => {
		browser
			.waitForElementVisible('body', 2000)
			.click('#btn-newModal')
			.setValue('input[name=title]', 'Night Watch Tins')
			.setValue('select[name=access]', 'public')
			.setValue('textarea[name=content]', 'This Night Watch at work')
			.click('#btn-createdocument')
			.waitForElementVisible('#allDocuments-header', 5000)
			.assert.containsText('#sheader', 'All Documents');
	},
	'User deletes a document': (browser) => {
		browser
			.waitForElementVisible('body', 2000)
			.click('#btn-deletedocument')
			.waitForElementVisible('.react-confirm-alert', 5000)
			.click('#btn-confirm')
			.waitForElementVisible('.toast', 5000)
			.end();
	},
};
