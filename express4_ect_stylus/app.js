var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var ectRenderer = require('ect')({
  watch: true,
  root: __dirname + '/views',
  ext:'.ect'
});

var stylus = require('express-stylus');
var nib = require('nib');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('view engine', 'ect');
app.engine('ect',ectRenderer.render);

// view CSS compiler setup
app.use(stylus({
  src: path.join(__dirname,'/stylus'),
  dest:path.join(__dirname,'/public/css'),
  use: [nib()],
  import: ['nib']
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
