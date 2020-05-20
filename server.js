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
   console.log('A new connection was established');
});

// Start listening on specified PORT
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
   console.log(`Running on ${PORT}`);
});