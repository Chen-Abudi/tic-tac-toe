const express = require('express');
const mongoose = require('mongoose');
const { Socket } = require('socket.io');
const app = express();
require('dotenv').config();
const io = require('socket.io')(3002, {
  cors: {
    origin: ['http://localhost:3001'],
  },
});

const { MONGODB_URI = 'mongodb://localhost:27017/tictac', PORT = 3000 } =
  process.env;
mongoose.connect(MONGODB_URI);

io.on('connection', (Socket) => {
  console.log(Socket.id);
});

app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
