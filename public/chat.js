// Make Connecion
var socket = io.connect('http://localhost:4000');

// Query Elements

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    btn = document.getElementById('send');

// Emit Events
btn.addEventListener('click', function () {
  feedback.innerHTML = '';
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = '';
});
message.addEventListener('keypress', function () {
    socket.emit('typing', {
      handle: handle.value
    })
})

// Listen to Events

socket.on('chat', function (data) {
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})
socket.on('typing', function (data) {
  feedback.innerHTML = '<p><em>' + data.handle + ' is Typing... </em></p>';
})
