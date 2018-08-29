const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const websocket = require('ws');

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
const wss = new websocket.Server({ server, clientTracking: true });

let counter = 1;

const getAllClients = function getAllConnectedClients() {
  const { clients } = wss;
  const users = [];

  clients.forEach((client) => {
    users.push({ userId: client.userId, userName: client.userName });
  });

  console.log(users);

  return users;
};

const sendToAllClients = function sendAllClientsMessage(message) {
  const { clients } = wss;
  clients.forEach((client) => {
    client.send(message);
  });
};

const responseCase = function responseCase(message, ws) {
  switch (message.type) {
    case 'name':
      ws.userName = message.name;
      ws.userId = counter;
      counter += 1;
      const msg = { type: 'users', users: getAllClients() };
      sendToAllClients(JSON.stringify(msg), wss);
      break;
    default:
      break;
  }
};

wss.on('connection', (ws, req) => {
  ws.on('message', (message) => {
    if (typeof message === 'string') {
      const msg = JSON.parse(message);
      responseCase(msg, ws);
    } else {
      sendToAllClients(message);
    }
  });
});

server.listen(port, () => console.log('Listening on Port ', port));
