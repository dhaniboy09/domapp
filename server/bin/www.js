// This will be our application entry. We'll setup our server here.
import http from 'http';
import app from '../server';
import server from '../app';

// const http = require('http');
// const app = require('../app'); // The express app we just created
if (process.env.NODE_ENV === 'production') {
	const port = parseInt(process.env.PORT, 10) || 8000;
	app.set('port', port);
	const server = http.createServer(app);
	server.listen(port);
} else {
	const port = parseInt(process.env.PORT, 10) || 8000;
	app.set('port', port);
	const server = http.createServer(server);
	server.listen(port);
}