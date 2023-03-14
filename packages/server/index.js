const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const socketIO = require("socket.io")(3002, {
  cors: {
    origin: "*",
  },
});

const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

let clients = [];

function clientsPaginated(page, perPage, clientId) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedClients = clients.slice(start, end);

  if (paginatedClients.includes(clientId)) {
    const clientIdx = paginatedClients.indexOf(clientId);
    paginatedClients.splice(clientIdx, 1);
    const nextClient = clients[end + 1];
    if (nextClient) {
      paginatedClients.push(nextClient);
    }
  }

  return paginatedClients;
}

app.get("/clients", (req, res) => {
  const { page = 1, perPage = 10, clientId } = req.query;
  const paginatedClients = clientsPaginated(page, perPage, clientId);

  res.json(paginatedClients);
});

socketIO.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);
  clients.push(socket.id);

  socketIO.emit("newClientConnected", socket.id);

  socket.on("message", ({ sendTo, body }) => {
    console.log("Message received: ", body, sendTo);
    socketIO.emit(sendTo, body);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    clients = clients.filter((client) => client !== socket.id);
    socketIO.emit("clientDisconnected", socket.id);
  });
});
