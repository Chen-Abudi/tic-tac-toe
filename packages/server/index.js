const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const { MONGODB_URI = 'mongodb://localhost:27017/tictac',PORT = 3000  } = process.env;
mongoose.connect(MONGODB_URI);

app.use(express.json());

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
