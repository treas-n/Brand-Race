const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (request, response) => {
    response.sendFile(__dirname + 'index.html');
});

server.listen(3001, () => {
    console.log('listening on *:3001');
})