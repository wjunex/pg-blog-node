var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors')  // 解决跨域问题

// 引入的路由
var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blog')
var inspiration = require('./routes/inspiration')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())  // 解决跨域问题

app.use('/', indexRouter);
app.use('/api/blog', blogRouter);
app.use('/api/inspiration', inspiration);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  const errorResponse = {
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
    data: null
  };
  res.status(errorResponse.status).json(errorResponse);
});

module.exports = app;
