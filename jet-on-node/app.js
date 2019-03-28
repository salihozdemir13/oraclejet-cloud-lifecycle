var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var APP_VERSION = "0.0.9";

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/about', function (req, res) {
  var about = {
    "about": "about operation on soaring portal backend",
    "PORT": process.env.PORT,
    "PRODUCT_PORTAL_URL": process.env.PRODUCT_PORTAL_URL,
    "CUSTOMER_PORTAL_URL": process.env.CUSTOMERS_PORTAL_URL,
    "FINANCE_PORTAL_URL": process.env.FINANCE_PORTAL_URL,
    "ORDERS_PORTAL_URL": process.env.ORDERS_PORTAL_URL,
    "LOYALTY_PORTAL_URL": process.env.LOYALTY_PORTAL_URL,
    "APP_VERSION ": APP_VERSION
  }
  res.json(about);
})

app.get('/environmentSettings', function (req, res) {
  var settings = {
    "PORT": process.env.PORT,
    "PRODUCT_PORTAL_URL": process.env.PRODUCT_PORTAL_URL,
    "CUSTOMER_PORTAL_URL": process.env.CUSTOMERS_PORTAL_URL,
    "FINANCE_PORTAL_URL": process.env.FINANCE_PORTAL_URL,
    "LOYALTY_PORTAL_URL": process.env.LOYALTY_PORTAL_URL,
    "ORDERS_PORTAL_URL": process.env.ORDERS_PORTAL_URL,
    "APP_VERSION ": APP_VERSION
  }
  res.json(settings);
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});



module.exports = app;