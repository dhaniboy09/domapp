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
	'User deletes a document': (browser) => {
		browser
			.waitForElementVisible('body', 90000)
			.click('#btn-deletedocument')
			.waitForElementVisible('.react-confirm-alert', 90000)
			.click('#btn-confirm')
			.waitForElementVisible('.toast', 90000);
	},
	'User views single document': (browser) => {
		browser
			.waitForElementVisible('body', 90000)
			.click('#btn-singledocument')
			.waitForElementVisible('.title-content-panel', 90000)
			.assert.containsText('.editor-title-header', 'Title');
	},
	'User cancel a document edit': (browser) => {
		browser
			.waitForElementVisible('body', 90000)
			.click('#btn-editDoc')
			.setValue('input[name=title]', 'Night Watch Tins')
			.setValue('select[name=access]', 'public')
			.setValue('#e-content', 'This Night Watch at work')
			.click('#btn-closeEditor')
			.waitForElementVisible('.f-center', 90000)
			.assert.containsText('.document-panel-header', 'Document Details');
	},
	'User edits a document': (browser) => {
		browser
			.waitForElementVisible('body', 90000)
			.click('#btn-editDoc')
			.setValue('input[name=title]', 'Night Watch Tins')
			.setValue('select[name=access]', 'public')
			.setValue('#e-content', 'This Night Watch at work')
			.click('#btn-updateDocument')
			.waitForElementVisible('.f-center', 90000)
			.assert.containsText('.document-panel-header', 'Document Details')
			.end();
	},
};
