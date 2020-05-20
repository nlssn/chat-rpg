const chatForm = document.getElementById('chat-form');

const socket = io();

// Message from server
socket.on('message', message => {
   outputMessage(message);
});

// Submit a new message
chatForm.addEventListener('submit', (e) => {
   e.preventDefault();

   // Get message text
   const msg = e.target.msg.value;

   // Emit message to server
   socket.emit('chatMessage', msg);

   // Clear the input
   e.target.elements.msg.value = '';
   e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
   const div = document.createElement('div');
   div.classList.add('message');
   div.innerHTML = `
   <p class="meta">${message.username} <span>${message.time}</span></p>
   <p class="text">${message.text}</p>
   `;
   document.getElementById('chat-messages').appendChild(div);
}