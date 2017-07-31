module.exports = {
	'User sign in with correct credentials': (browser) => {
		browser
			.url('http://localhost:8000/signin')
			.waitForElementVisible('body', 90000)
			.setValue('input[name=email]', 'tc@yahoo.com')
			.setValue('input[name=password]', '123456789')
			.click('#button-signin')
			.waitForElementVisible('.document-panel', 90000)
			.assert.containsText('#sheader', 'All Documents');
	},
	'User creates a document with empty title and content': (browser) => {
		browser
			.waitForElementVisible('body', 90000)
			.click('#btn-newModal')
			.setValue('input[name=title]', '')
			.setValue('select[name=access]', 'public')
			.setValue('#tiny-edit', '')
			.click('#btn-createdocument')
			.waitForElementVisible('.f-center', 90000)
			.assert.containsText('h5', 'New Document');
	},
	'User creates a document': (browser) => {
		browser
			.waitForElementVisible('body', 90000)
			.click('#btn-newModal')
			.setValue('input[name=title]', 'Night Watch Tins')
			.setValue('select[name=access]', 'public')
			.setValue('#tiny-edit', 'This Night Watch at work')
			.click('#btn-createdocument')
			.waitForElementVisible('#allDocuments-panel', 90000)
			.assert.containsText('#sheader', 'All Documents')
			.end();
	},
};
