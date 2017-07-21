const Roles = require('../controllers/roles');
const Users = require('../controllers/users');
const Documents = require('../controllers/documents');

module.exports = (app) => {
	app.get('/api/', (req, res) => res.status(200).send({
		message: 'Welcome to the DMS API!',
	}));

	// Roles
	app.post('/api/v1/roles', Roles.createRole);

	// Users
	app.post('/auth/v1/users', Users.createUser);
	app.get('/api/v1/users/:id', Users.getUser);
	app.get('/api/v1/users/', Users.getAllUsers);
	app.put('/api/v1/users/:id', Users.updateUser);
	app.put('/api/v1/users/password/:id', Users.updatePassword);
	app.delete('/api/v1/users/:id', Users.deleteUser);
	app.post('/auth/v1/users/login', Users.logIn);
	app.get('/api/v1/search/users', Users.searchUsers);
	app.get('/api/v1/users/:id/documents', Users.getUserDocuments);

	// Documents
	app.post('/api/v1/documents', Documents.createDocument);
	app.get('/api/v1/documents', Documents.getAllDocuments);
	app.get('/api/v1/documents/:id', Documents.getDocument);
	app.put('/api/v1/documents/:id', Documents.updateDocument);
	app.delete('/api/v1/documents/:id', Documents.deleteDocument);
	app.get('/api/v1/search/documents', Documents.searchDocument);
};
