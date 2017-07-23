import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

// const express = require('express');
// const logger = require('morgan');
// const bodyParser = require('body-parser');
require('dotenv').config();
// Set up the express app
const app = express();
const compiler = webpack(webpackConfig);
const authentication = require('./middleware/authentication');

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(webpackMiddleware(compiler, {
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

// Serve routes before the default catch all
// require('./server/routes')(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.use('/api', authentication.isAuthenticated);
require('../server/routes')(app);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

module.exports = app;