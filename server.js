const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Start listening on specified PORT
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
   console.log(`Running on ${PORT}`);
});