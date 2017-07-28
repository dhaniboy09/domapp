module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('Users', [{
			firstName: 'David',
			lastName: 'West',
			email: 'david@yahoo.com',
			password: '$2a$10$P8D6W2lRUeWljpnieVdyQepDLMi0Jz.lBi07spMkcx0Hr4WbKCWcu',
			roleId: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			firstName: 'Gimli',
			lastName: 'Dexter',
			email: 'gdex@yahoo.com',
			password: '$2a$10$P8D6W2lRUeWljpnieVdyQepDLMi0Jz.lBi07spMkcx0Hr4WbKCWcu',
			roleId: 2,
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
