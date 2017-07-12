module.exports = {
  up: (queryInterface) => {
      return queryInterface.bulkInsert('Documents', [{
        title: 'John Doe',
        content: 'This is a John Doe situation that i really cant head',
        access: 'public',
        userRoleId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hayley West',
        content: 'This is a Hayley West',
        access: 'private',
        userRoleId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  
  },

  down: (queryInterface) => {
      return queryInterface.bulkDelete('Documents', null, {});
  }
};
