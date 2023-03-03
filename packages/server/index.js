const express = require('express');
const mongoose = require('mongoose');
const { Socket } = require('socket.io');
const app = express();
const http = require('http');

require('dotenv').config();
const io = require('socket.io')(3002, {
  cors: {
    origin: ['http://localhost:3001'],
  },
});

const { MONGODB_URI = 'mongodb://localhost:27017/tictac', PORT = 3000 } =
  process.env;
mongoose.connect(MONGODB_URI);

const server = http.createServer(app);

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Handle incoming messages
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast message to all connected clients

    socket.emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
