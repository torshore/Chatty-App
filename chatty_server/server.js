const express      = require('express');
const SocketServer = require('ws').Server;
const PORT         = 3001;
const uuid         = require('node-uuid');
const server       = express()
  .use(express.static('../'))
  .listen(
    PORT, '0.0.0.0', 'localhost',
    () => console.log(`Listening on ${ PORT }`)
);

// Create the WebSockets server
const wss = new SocketServer({ server });
let currentContents = '';

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  const clientCount = {
    "type": "incomingclientCount",
    "quantity": wss.clients.size
  }
  console.log(25, clientCount)
  wss.broadcast(JSON.stringify(clientCount));

  ws.on('message', (msg) => {
    console.log( 23, 'received: %s', msg);
    const newMsg = JSON.parse(msg);
      switch(newMsg.type) {
        case "postMessage":
          newMsg.type = "incomingMessage";
          newMsg.id = uuid.v4();
          wss.broadcast(JSON.stringify(newMsg));
          break;
        case "postNotification":
          newMsg['type'] = "incomingNotification";
          newMsg.id = uuid.v4();
          wss.broadcast(JSON.stringify(newMsg));
        break;
      }
    console.log(31, newMsg);
    // }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    console.log(`Clients connected: ${clientCount.quantity}`)
    wss.broadcast(JSON.stringify(clientCount))
    console.log(52, clientCount)
});
});


wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    console.log("sending to friends!");
    data.type =
    client.send(data); // send data to all connected users
  });
};

const sendMessages = (message) => {
  currentContents = message;
  wss.broadcast(message);  //takes textarea and broadcasts
}