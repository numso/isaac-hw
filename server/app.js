/* jshint node:true */
'use strict';

var    http = require('http');
var      fs = require('fs');
var express = require('express');
var  stylus = require('stylus');
var      io = require('socket.io');

var app = express();
var server = http.Server(app);
io = io(server);

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(stylus.middleware({
    debug: true,
    src: 'client',
    dest: 'client'
  }));
  app.use(express.static('client'));
  app.use(express.errorHandler());
});

// fs.readdirSync(__dirname + '/routes').forEach(
//   function (file) {
//     require('./routes/' + file)(app);
//   }
// );

fs.readdirSync(__dirname + '/socket').forEach(
  function (file) {
    require('./socket/' + file)(io);
  }
);

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
