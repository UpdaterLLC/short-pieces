var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

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

// setup session
// refresh session when user loged in by req.session.regenerate()
console.log(process.env.EXPRESS_SESSION_SECRET || require('uuid').v4());
app.use(session({
  store: new RedisStore({}),
  secret: process.env.EXPRESS_SESSION_SECRET || require('uuid').v4(),
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 600000, //in mili-sec
    httpOnly: true, //in http
    secure: false, //not in ssl
    sameSite: true,
  }
}));

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
app.use(function(req, res, next) {
  // this is the one in the end of middlewares.
  // so there's no route to requested path.
  // seems to be 404, forward to error handler.
  console.error('path not found ');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//----------------
// error handlers
//----------------

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.error('ERROR: ', err);
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
  console.error('ERROR: ', err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
