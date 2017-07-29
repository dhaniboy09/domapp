export default {
	// nyc --reporter=html --reporter=text
	SampleUser1: {
		firstName: 'David',
		lastName: 'West',
		email: 'david@yahoo.com',
		password: '123456789',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	FakeUser: {
		id: 1,
		firstName: 'David',
		lastName: 'West',
		email: 'david@yahoo.com',
		password: '123456789',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	FakeUser02: {
		id: 1,
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
	FakeRoleDocument: {
		title: 'John Doe',
		content: 'This is a John Doe situation that i really cant handle',
		access: 'role',
		userRoleId: 2,
		userId: 2,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	FakeAdminDocument: {
		id: 10,
		title: 'John Doe',
		content: 'This is a John Doe situation that i really cant handle',
		access: 'private',
		userRoleId: 2,
		userId: 1,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	FakePublicDocument: {
		title: 'John Doe',
		content: 'This is a John Doe situation that i really cant handle',
		access: 'public',
		userRoleId: 2,
		userId: 2,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	FakeTestDocument01: {
		id: 1,
		title: 'John',
		content: 'This is a John Doe situation that i really cant handle',
		access: 'public',
		userRoleId: 2,
		userId: 2,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	FakeTestDocument02: {
		id: 2,
		title: 'John',
		content: 'This is a John Doe situation that i really cant handle',
		access: 'public',
		userRoleId: 2,
		userId: 2,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	FakeDocumentList: [
		{
			title: 'John Doe',
			content: 'This is a John Doe situation that i really cant handle',
			access: 'public',
			userRoleId: 2,
			userId: 2,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			title: 'John Eoe',
			content: 'This is a John Doe situation that i really cant handle',
			access: 'public',
			userRoleId: 2,
			userId: 2,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			title: 'John Foe',
			content: 'This is a John Doe situation that i really cant handle',
			access: 'public',
			userRoleId: 2,
			userId: 2,
			createdAt: new Date(),
			updatedAt: new Date()
		}
	],
	FakeUserList: [
		{
			firstName: 'James',
			lastName: 'Fisher',
			email: 'jf@yahoo.com',
			password: '123456789',
			passwordConfirm: '123456789',
			roleId: 2,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			firstName: 'Yolanda',
			lastName: 'Adams',
			email: 'ya@yahoo.com',
			password: '123456789',
			passwordConfirm: '123456789',
			roleId: 2,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			firstName: 'Tiny',
			lastName: 'Temper',
			email: 'tt@yahoo.com',
			password: '123456789',
			passwordConfirm: '123456789',
			roleId: 2,
			createdAt: new Date(),
			updatedAt: new Date()
		}
	],
	FakePagination: {
		totalCount: 3,
		pages: 1,
		currentPage: 1,
		pageSize: 4
	}
};

