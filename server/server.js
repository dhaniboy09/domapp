import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

// const express = require('express');
// const logger = require('morgan');
// const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve routes before the default catch all
//require('./server/routes')(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.
require('../server/routes')(app);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});
// app.get('*', (req, res) => res.status(200).send({
//   res.sendFile(path.join(__dirname, './index.html'));
// }));

module.exports = app;