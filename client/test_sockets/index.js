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

// Create users sockets array
var users = {};

// Server link starts on connection
io.on('connection', function(socket) {
  socket.on('connected', function(data) {
    socket.user = data.user;
    // add this socket to the Set of sockets for this user
    if (!users[socket.user]) {
      users[socket.user] = new Set();
    }
    users[socket.user].add(socket.id);
    updateUsers();
    console.log(users[socket.user]);
  });

  function updateUsers() {
    io.emit("users", Object.keys(users));
  }

  // On event 'chat', server emits to all sockets
  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  });

  socket.on('not_typing', function() {
    socket.broadcast.emit('not_typing');
  });

  socket.on("disconnect", function(data) {
    if(!socket.user) {
      return;
    }
    // remove socket for this user
    // and remove user if socket count hits zero
    if (users[socket.user]) {
      users[socket.user].delete(socket);
      if (users[socket.user].size === 0) {
        delete users[socket.user];
      }
    }
    updateUsers();
  });
});
