const express = require('express');

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var reviewsRouter = require('./routes/reviews.js');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var qaRouter = require('./routes/qa');
var app = express();
const proxy = require('http-proxy-middleware');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  next();
});



app.use('/reviews', reviewsRouter);

// redirecting to app server
app.use('qa/hotels/:hotelId/questions/:questionId', proxy({ target: 'http://node-express-env-service-qa.swpb5j5env.us-west-2.elasticbeanstalk.com/', changeOrigin: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/qa', qaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
