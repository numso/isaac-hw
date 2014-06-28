/* jshint node:true */
'use strict';

var fs = require('fs');
var logs = fs.readFileSync(__dirname + '/../data/minecraft-logs', 'utf8');
logs = logs.split('\n');

module.exports = function (io) {
  io.on('connection', function (socket) {
    socket.emit('msg', 'Welcome. If you emit startGame to me then I will send you a lot of gameLog messages. When you emit startGame, you can send "slow", "fast", or "instant" to control the speed of the logs.');

    socket.on('startGame', function (speed) {
      emitLogs(socket, speed);
    });
  });
};


function emitLogs(socket, speed) {
  var time = 0;
  speed = speed || 'slow';

  for (var i = 0; i < logs.length; ++i) {
    sendMsg(socket, logs[i], time);
    if (speed === 'slow') {
      time += Math.floor(Math.random() * 1000) + 100;
    } else if (speed === 'fast') {
      time += Math.floor(Math.random() * 300) + 50;
    }
  }
}

function sendMsg(socket, msg, time) {
  setTimeout(function () {
    socket.emit('gameLog', msg);
  }, time);
}
