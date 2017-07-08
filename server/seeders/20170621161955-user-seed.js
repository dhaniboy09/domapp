module.exports = {
  up: (queryInterface) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: 'David',
        lastName: 'West',
        email: 'david@yahoo.com',
        password: '123456789',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Gimli',
        lastName: 'Dexter',
        email: 'gdex@yahoo.com',
        password: '123456789',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },], {});
    
  },

  down: (queryInterface) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
