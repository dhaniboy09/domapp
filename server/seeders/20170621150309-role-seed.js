module.exports = {
  up: (queryInterface) => {
   queryInterface.bulkInsert('Roles', [{
    roleName: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    roleName: "fellow",
    createdAt: new Date(),
    updatedAt: new Date(),
   }
   ],{})
  },

  down: (queryInterface) => {
      // queryInterface.bulkDelete('Roles', null, {});
  }
};
