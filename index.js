var express = require('express');
var socket = require('socket.io');
// App Setup
var app = express();
var server = app.listen(4000, function () {
  console.log("Listening to 4000 port");
});


// Static FIles
app.use(express.static('public'));

// Socket Setup
var socketIo = socket(server);

socketIo.on('connection', function (socket) {
  console.log('Socket IO has been Fired', socket.id);
  socket.on('chat', function (data) {
    socketIo.sockets.emit('chat', data);
  });
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  })
});
