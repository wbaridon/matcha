// Make connection with server via sockets
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
    username = document.getElementById('username'),
    submit = document.getElementById('submit'),
    output = document.getElementById('chat_output'),
    typing = document.getElementById('chat_typing'),
    users = {};

// Emit events

// On click, sends array via event 'chat'
submit.addEventListener('click', function() {
  socket.emit('chat', {
    message: message.value,
    username: username.value,
    id: socket.id
  });
  socket.emit('connected', Object.keys(users));
});

// On keypress, broadcasts that user is writting
message.addEventListener('keypress', function() {
  if (username.value != "")
    socket.emit('typing', username.value);
});

// If message input is blank, stop displaying 'is typing'
message.addEventListener('keyup', function() {
  if (!message.value)
    socket.emit('not_typing');
});

// Listen to events

// On event, clears message input + displays it in 'chat_output'
socket.on('chat', function(data) {
  typing.innerHTML = "";
  if (data.id == socket.id)
    message.value = "";
  if (data.message.trim() != "") // If message not empty
    output.innerHTML += '<p><strong>' + data.username + ' :</strong> ' + data.message + '</p>';
});

// On event, displays broadcasted typing message
socket.on('typing', function(data) {
  typing.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
})

socket.on('not_typing', function() {
  typing.innerHTML = "";
});