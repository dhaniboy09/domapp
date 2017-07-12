export default {
	SampleUser1: {
		firstName: 'David',
		lastName: 'West',
		email: 'david@yahoo.com',
		password: '123456789',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	SampleUser2: {
		firstName: 'Tasha',
		lastName: 'Erica',
		email: 'tesdu@yahoo.com',
		password: '123456789',
		passwordConfirm: '123456789',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	SampleAdmin: {
		firstName: 'Tasha',
		lastName: 'Erica',
		email: 'africa@yahoo.com',
		password: '123456789',
		passwordConfirm: '123456789',
		roleId: 1,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	SampleInvalidUser: {
		firstName: '',
		lastName: '',
		email: 'lola',
		password: '',
		passwordConfirm: '',
		roleId: 1,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	SampleUser2LogIn: {
		email: 'tesdu@yahoo.com',
		password: '123456789'
	},
	SampleUser3LogIn: {
		email: 'tesa@yahoo.com',
		password: '123456789'
	},
	User: {
		email: 'gdex@yahoo.com',
		password: '123456789'
	},
	InvalidUser: {
		email: 'gdex',
		password: '123456789'
	},
	Admin: {
		email: 'david@yahoo.com',
		password: '123456789'
	},
	Document: {
		title: 'John Doe',
		content: 'This is a John Doe situation that i really cant handle',
		access: 'role',
		userRoleId: 2,
		userId: 2,
		createdAt: new Date(),
		updatedAt: new Date()
	}
};

