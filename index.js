const exp = require('constants');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');


app.use(express.static('public'));

/* Navigation */
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/html/index.html');
});

app.get('/gameType', (request, response) => {
    response.sendFile(__dirname + '/html/gameType.html');
})

app.get('/createRace', (request, response) => {
    response.sendFile(__dirname + '/html/createRace.html');
});

app.get('/joinRace', (request, response) => {
    response.sendFile(__dirname + '/html/joinRace.html');
});

app.get ('/gameDetails', (request, response) => {
    /* Validate and handle form submission */
    response.sendFile(__dirname + '/html/gameDetails.html') ;
    var timeout = setTimeout(nextPage, 3000);


    function nextPage() {
        response.sendFile(__dirname + '/getReady.html');
        clearTimeout(timeout);
    }

});

app.post('/getReady', (request, response) => {
    response.sendFile(__dirname + '/html/getReady.html');
});

app.get('/game', (request, response) => {
    response.sendFile(__dirname + '/html/game.html');
});

server.listen(3001, () => {
    console.log('listening on *:3001');
})

/* Serve CSS files 
const cssDirectory = path.join(__dirname , 'css');
const serveStaticCSS = express.static(cssDirectory);
const cssRoutePath = '/css';

app.use(cssRoutePath, serveStaticCSS);

/* Serve other JS files 
const jsDirectory = path.join(__dirname , 'js');
const serveStaticJS = express.static(jsDirectory);
const jsRoutePath = '/js';

app.use(jsRoutePath, serveStaticJS);*/
