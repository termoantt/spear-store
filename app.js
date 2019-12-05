var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var warehouseRouter = require('./routes/warehouse');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', indexRouter);

const apiRoute = '/api/v1';

app.use(`${apiRoute}/warehouse`, warehouseRouter);

module.exports = app;
