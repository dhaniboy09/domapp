module.exports = {
	'User sign up without credentials': (browser) => {
		browser
			.url('http://localhost:8000/')
			.waitForElementVisible('body', 5000)
			.setValue('input[name=firstName]', '')
			.setValue('input[name=lastName]', '')
			.setValue('input[name=email]', '')
			.setValue('input[name=password]', '')
			.setValue('input[name=passwordConfirm]', '')
			.click('#btn-signup')
			.waitForElementVisible('#sign-up-form', 5000)
			.assert.containsText('#sign-up-banner', 'Move on to Domapp');
	},
	'User sign up with wrong email': (browser) => {
		browser
			.url('http://localhost:8000/')
			.waitForElementVisible('body', 5000)
			.setValue('input[name=firstName]', 'Eric')
			.setValue('input[name=lastName]', 'Schimdt')
			.setValue('input[name=email]', 'e')
			.setValue('input[name=password]', '123456789')
			.setValue('input[name=passwordConfirm]', '123456789')
			.click('#btn-signup')
			.waitForElementVisible('#sign-up-form', 5000)
			.assert.containsText('#sign-up-banner', 'Move on to Domapp');
	},
	'User sign up with invalid password length': (browser) => {
		browser
			.url('http://localhost:8000/')
			.waitForElementVisible('body', 5000)
			.setValue('input[name=firstName]', 'Eric')
			.setValue('input[name=lastName]', 'Schimdt')
			.setValue('input[name=email]', 'eric.schimdt@hotmail.com')
			.setValue('input[name=password]', '123')
			.setValue('input[name=passwordConfirm]', '123')
			.click('#btn-signup')
			.waitForElementVisible('#sign-up-form', 5000)
			.assert.containsText('#sign-up-banner', 'Move on to Domapp');
	},
	'User sign up with unmatching password confirmation': (browser) => {
		browser
			.url('http://localhost:8000/')
			.waitForElementVisible('body', 5000)
			.setValue('input[name=firstName]', 'Eric')
			.setValue('input[name=lastName]', 'Schimdt')
			.setValue('input[name=email]', 'eric.schimdt@hotmail.com')
			.setValue('input[name=password]', '123456789')
			.setValue('input[name=passwordConfirm]', '12345678')
			.click('#btn-signup')
			.waitForElementVisible('#sign-up-form', 5000)
			.assert.containsText('#sign-up-banner', 'Move on to Domapp');
	},
	'User sign up with correct credentials': (browser) => {
		browser
			.url('http://localhost:8000/')
			.waitForElementVisible('body', 5000)
			.setValue('input[name=firstName]', 'Eric')
			.setValue('input[name=lastName]', 'Schimdt')
			.setValue('input[name=email]', 'eric.schuler@hotmail.com')
			.setValue('input[name=password]', '123456789')
			.setValue('input[name=passwordConfirm]', '123456789')
			.click('#btn-signup')
			.waitForElementVisible('div#d-wrap', 5000)
			.assert.containsText('#sheader', 'All Documents')
			.end();
	},
};
