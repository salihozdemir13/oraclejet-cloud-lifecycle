var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const http = require('http');
const url = require('url');
const fs = require('fs');
const request = require('request');

var APP_VERSION = "0.0.12";

var URL_PREFIX =''
if (process.env.JET_APP_URL_PREFIX) {
    URL_PREFIX = process.env.JET_APP_URL_PREFIX
}    
console.log(`App Custom: JET_APP_URL_PREFIX =${URL_PREFIX}`)

exports.init = function (app) {
  console.log(`Custom Module (version ${APP_VERSION}) has been loaded and is initializing`)

  console.log(`Register handler for path ${URL_PREFIX}/aboutCustom`)
  app.get(URL_PREFIX+'/aboutCustom', function (req, res) {
    var about = {
      "about": "about operation on soaring portal backend",
      "PORT": process.env.PORT,
      "CUSTOMER_PORTAL_URL": process.env.CUSTOMER_PORTAL_URL
      , "APP_VERSION ": APP_VERSION
    }
    res.json(about);
  })

  console.log(`Register handler for path ${URL_PREFIX}/environmentSettings`)
  app.get(URL_PREFIX+'/environmentSettings', function (req, res) {
    var settings = {
      "CUSTOMER_PORTAL_URL": process.env.CUSTOMER_PORTAL_URL
      , "APP_VERSION ": APP_VERSION
    }
    res.json(settings);
  })


}

  
