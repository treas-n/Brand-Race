const exp = require('constants');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');

/* Navigation */
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.get('/gameType', (request, response) => {
    response.sendFile(__dirname + '/gameType.html');
})

app.get('/createRace', (request, response) => {
    response.sendFile(__dirname + '/createRace.html');
});

app.get('/joinRace', (request, response) => {
    response.sendFile(__dirname + '/joinRace.html');
});

app.post ('/gameDetails', (request, response) => {
    /* Validate and handle form submission */
    response.sendFile(__dirname + '/gameDetails.html') ;

    var timeout = setTimeout(function () {
        app.get('/getReady', (req, res) => {
            res.sendFile(__dirname + '/getReady.html');
            clearTimeout(timeout);
        });
    }, 3000);


});

app.post('/getReady', (request, response) => {
    response.sendFile(__dirname + '/getReady.html');
});

app.get('/game', (request, response) => {
    response.sendFile(__dirname + '/game.html');
});

server.listen(3001, () => {
    console.log('listening on *:3001');
})

/* Serve CSS files */
const cssDirectory = path.join(__dirname , 'css');
const serveStaticCSS = express.static(cssDirectory);
const cssRoutePath = '/css';

app.use(cssRoutePath, serveStaticCSS);