/* jshint node:true */
'use strict';

var address = 'http://127.0.0.1:3000';
var socket = require('socket.io-client')(address);

socket.on('connect', function(){
  socket.on('msg', function(msg){
    console.log(msg);
  });

  socket.emit('startGame', 'slow');

  socket.on('gameLog', function(gameLog){
    // do the regex here
    console.log(gameLog);
  });

  socket.on('disconnect', function(){
    console.log('disconnected');
  });
});
