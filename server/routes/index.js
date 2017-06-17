const Roles = require('../controllers/roles');
const Users = require('../controllers/users');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  //Roles 
  app.post('/api/roles', Roles.createRole);
  //Users
  app.post('/api/users', Users.createUser);
  app.get('/api/users/:id', Users.getUser);
  app.get('/api/users/', Users.getAllUsers);
  app.put('api/users/:id', Users.updateUser);
};