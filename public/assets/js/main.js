const chatForm = document.getElementById('chat-form');

const socket = io();

socket.on('message', message => {
   console.log(message);
});

// Submit a new message
chatForm.addEventListener('submit', (e) => {
   e.preventDefault();

   // Get message text
   const msg = e.target.msg.value;

   // Emit message to server
   socket.emit('chatMessage', msg);
});