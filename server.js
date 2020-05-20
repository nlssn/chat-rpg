const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// What happens when a player is connected
io.on('connection', socket => {
   // Welcome the new player
   socket.emit('message', 'Welcome to chat-rpg');

   // Broadcast when a player connects
   socket.broadcast.emit('message', 'A player has joined the chat');

   // On disconnect
   socket.on('disconnect', () => {
      io.emit('message', 'A player has left the chat');
   });

   // Recievning a new chatMessage
   socket.on('chatMessage', msg => {
      // Send it to everyone
      io.emit('message', msg);
   });
});

// Start listening on specified PORT
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
   console.log(`Running on ${PORT}`);
});