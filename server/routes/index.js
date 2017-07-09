const Roles = require('../controllers/roles');
const Users = require('../controllers/users');
const Documents = require('../controllers/documents');

module.exports = (app) => {
	app.get('/api/', (req, res) => res.status(200).send({
		message: 'Welcome to the DMS API!',
	}));

	// Roles
	app.post('/api/roles', Roles.createRole);

	// Users
	app.post('/auth/users', Users.createUser);
	app.get('/api/users/:id', Users.getUser);
	app.get('/api/users/', Users.getAllUsers);
	app.put('/api/users/:id', Users.updateUser);
	app.put('/api/users/profile/:id', Users.updatePassword);
	app.delete('/api/users/:id', Users.deleteUser);
	app.post('/auth/users/login', Users.logIn);
	app.get('/api/search/users/:searchQuery', Users.searchUsers);
	app.get('/api/users/:id/documents', Users.getUserDocuments);

	// Documents
	app.post('/api/documents', Documents.createDocument);
	app.get('/api/documents', Documents.getAllDocuments);
	app.get('/api/documents/:id', Documents.getDocument);
	app.put('/api/documents/:id', Documents.updateDocument);
	app.delete('/api/documents/:id', Documents.deleteDocument);
	app.get('/api/search/documents/:searchQuery', Documents.searchDocument);
};
