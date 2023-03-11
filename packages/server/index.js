const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const cors = require('cors');

require('dotenv').config();
const socketIO = require('socket.io')(3002, {
  cors: {
    origin: '*',
  },
});

const { MONGODB_URI = 'mongodb://localhost:27017/tictac', PORT = 3001 } =
  process.env;
mongoose.connect(MONGODB_URI);

// const server = http.createServer(app);

socketIO.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);
  // socket.on('join', (userName) => {
  //   console.log(userName);
  //   socket.userName = userName;
  //   console.log(userName);

  //   socket.join('chat room');
  // });
  // Handle incoming messages
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast message to all connected clients

    socket.emit('message', `Me: ${message}`);
    socket.broadcast.emit('message', `Received: ${message}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
