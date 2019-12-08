const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const warehouseRouter = require('./routes/warehouse');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', indexRouter);

const apiRoute = '/api/v1';

app.use(`${apiRoute}/warehouse:region`, warehouseRouter);

module.exports = app;
