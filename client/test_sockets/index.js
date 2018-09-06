var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function() {
  console.log('listening to request on port 4000');
});

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

// Server link starts on connection
io.on('connection', function(socket) {
  // On event 'chat', server emits to all sockets
  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  });

  socket.on('usernames', function(data) {
    io.sockets.emit('usernames', data);
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  });

  socket.on('not_typing', function() {
    socket.broadcast.emit('not_typing');
  });
});
