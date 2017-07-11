import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// Set up the express app
const app = express();

const authentication = require('./middleware/authentication');

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve routes before the default catch all
// require('./server/routes')(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.use('/api', authentication.isAuthenticated);
require('../server/routes')(app);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('dist'));
	// app.get('*', (req, res) => {
	// 	res.sendFile(path.join(__dirname, '../dist/index.html'));
	// });
} else {
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, './index.html'));
	});
}


module.exports = app;
