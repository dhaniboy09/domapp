module.exports = {
	'User sign in without credentials': (browser) => {
		browser
			.url('http://localhost:8000/signin')
			.waitForElementVisible('body', 90000)
			.setValue('input[name=email]', '')
			.setValue('input[name=password]', '')
			.click('#button-signin')
			.waitForElementVisible('.welcome-text', 90000)
			.assert
			.containsText('h5', 'Welcome, Sign In to Continue');
	},
	'User sign in with wrong email': (browser) => {
		browser
			.url('http://localhost:8000/signin')
			.waitForElementVisible('body', 90000)
			.setValue('input[name=email]', 'example@')
			.setValue('input[name=password]', '123456789')
			.click('#button-signin')
			.waitForElementVisible('.welcome-text', 90000)
			.assert.containsText('h5', 'Welcome, Sign In to Continue');
	},
	'User sign in with wrong password': (browser) => {
		browser
			.url('http://localhost:8000/signin')
			.waitForElementVisible('body', 90000)
			.setValue('input[name=email]', 'tc@yahoo.com')
			.setValue('input[name=password]', '123')
			.click('#button-signin')
			.waitForElementVisible('.welcome-text', 90000)
			.assert.containsText('h5', 'Welcome, Sign In to Continue');
	},
	'User sign in with correct credentials': (browser) => {
		browser
			.url('http://localhost:8000/signin')
			.waitForElementVisible('body', 90000)
			.setValue('input[name=email]', 'tc@yahoo.com')
			.setValue('input[name=password]', '123456789')
			.click('#button-signin')
			.waitForElementVisible('.document-panel', 90000)
			.assert.containsText('#sheader', 'All Documents')
			.end();
	},
};
