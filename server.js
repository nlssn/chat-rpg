const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'GrandWizard89';

// What happens when a player is connected
io.on('connection', socket => {
   socket.on('joinRoom', ({username, room}) => {
      const user = userJoin(socket.id, username, room);
      socket.join(user.room);

      // Welcome the new player
      socket.emit('message', formatMessage(botName, `Welcome to ${user.room}`));

      // Broadcast when a player connects
      socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));
   
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
         room: user.room,
         users: getRoomUsers(user.room)
      });
   });

   // Recievning a new chatMessage
   socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);

      io.to(user.room).emit('message', formatMessage(user.username, msg));
   });

   // On disconnect
   socket.on('disconnect', () => {
      const user = userLeave(socket.id);

      if (user) {
         io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
      }

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
         room: user.room,
         users: getRoomUsers(user.room)
      });
   });
});

// Start listening on specified PORT
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
   console.log(`Running on ${PORT}`);
});