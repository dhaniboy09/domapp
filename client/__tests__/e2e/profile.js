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
	'User edits profile with blank email': (browser) => {
		browser
			.url('http://localhost:8000/settings')
			.waitForElementVisible('.settings-panel-header', 90000)
			.click('#btn-Edit')
			.clearValue('input[name=firstName]')
			.setValue('input[name=firstName]', 'greece')
			.clearValue('input[name=lastName]')
			.setValue('input[name=lastName]', 'lockhart')
			.clearValue('input[name=email]')
			.setValue('input[name=email]', 'user')
			.click('#btn-Update')
			.waitForElementVisible('#email-error', 90000);
	},
	'User edits profile': (browser) => {
		browser
			.url('http://localhost:8000/settings')
			.waitForElementVisible('.settings-panel-header', 90000)
			.click('#btn-Edit')
			.clearValue('input[name=firstName]')
			.setValue('input[name=firstName]', 'greece')
			.clearValue('input[name=lastName]')
			.setValue('input[name=lastName]', 'lockhart')
			.setValue('input[name=email]', '')
			.click('#btn-Update')
			.waitForElementVisible('.toast', 90000);
	},
	'User does not enter password': (browser) => {
		browser
			.url('http://localhost:8000/settings')
			.waitForElementVisible('body', 90000)
			.setValue('input[name=password]', '123456789')
			.setValue('input[name=passwordConfirm]', '')
			.click('#btn-updatePassword')
			.waitForElementVisible('.password-update-error', 90000);
	},
	'User changes password': (browser) => {
		browser
			.url('http://localhost:8000/settings')
			.waitForElementVisible('body', 90000)
			.clearValue('input[name=password]')
			.setValue('input[name=password]', '123456789')
			.clearValue('input[name=passwordConfirm]')
			.setValue('input[name=passwordConfirm]', '123456789')
			.click('#btn-updatePassword')
			.waitForElementVisible('.toast', 90000)
			.end();
	},
};
