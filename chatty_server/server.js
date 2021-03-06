// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

let numClients = 0;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function broadcast(msg) {
  for (let client of wss.clients) {
    client.send(JSON.stringify(msg));
  }
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  numClients++;
  ws.on('message', function incoming(data) {
    var message = JSON.parse(data)
    if (message.type === 'postMessage') {
      message.type = 'incomingMessage';
    } else if (message.type === 'postNotification') {
      message.type = 'incomingNotification';
    }
    broadcast(message);
  })

  function getColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const randomColor = {
    type: 'clientColor',
    color: getColor()
  }
  broadcast(randomColor);

  const onlineUser = {
    type: 'numberOfClients',
    clientSize: numClients
  }
  broadcast(onlineUser);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    numClients--;
    onlineUser.clientSize = numClients;
    broadcast(onlineUser)
    console.log(onlineUser);
    console.log('Client disconnected')
  })
});