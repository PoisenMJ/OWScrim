var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
const passportSetup = require('./config/passport-setup');
var keys = require('./config/keys');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieSecret]
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.uri, { useNewUrlParser: true }, () => {
  console.log('Connect to mongo database:::');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);


//
// WHEN TYPING IN SR MANUALLY ADD GLYPH ICON LIKE FONT AWESOME NEXT TO SR
//
//



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
