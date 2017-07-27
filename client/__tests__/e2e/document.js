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
	'User deletes a document': (browser) => {
		browser
			.waitForElementVisible('body', 2000)
			.click('#btn-deletedocument')
			.waitForElementVisible('.react-confirm-alert', 15000)
			.click('#btn-confirm')
			.waitForElementVisible('.toast', 15000);
	},
	'User views single document': (browser) => {
		browser
			.waitForElementVisible('body', 2000)
			.click('#btn-singledocument')
			.waitForElementVisible('.title-content-panel', 5000)
			.assert.containsText('.editor-title-header', 'Title');
	},
	'User cancel a document edit': (browser) => {
		browser
			.waitForElementVisible('body', 2000)
			.click('#btn-editDoc')
			.setValue('input[name=title]', 'Night Watch Tins')
			.setValue('select[name=access]', 'public')
			.setValue('#e-content', 'This Night Watch at work')
			.click('#btn-closeEditor')
			.waitForElementVisible('.f-center', 5000)
			.assert.containsText('.document-panel-header', 'Document Details');
	},
	'User edits a document': (browser) => {
		browser
			.waitForElementVisible('body', 2000)
			.click('#btn-editDoc')
			.setValue('input[name=title]', 'Night Watch Tins')
			.setValue('select[name=access]', 'public')
			.setValue('#e-content', 'This Night Watch at work')
			.click('#btn-updateDocument')
			.waitForElementVisible('.f-center', 5000)
			.assert.containsText('.document-panel-header', 'Document Details')
			.end();
	},
};
