const exp = require('constants');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');


app.use(express.static('public'));
app.use(express.static('node_modules/socket.io/client-dist/socket.io.js'));
app.use('/jquery', express.static('node_modules/jquery/dist'));

/* Navigation */
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/html/index.html');
    console.log('Home page');
});

app.get('/gameType', (request, response) => {
    response.sendFile(__dirname + '/html/gameType.html');
    console.log('Game type page');
})

app.get('/createRace', (request, response) => {
    response.sendFile(__dirname + '/html/createRace.html');
    console.log('Create race page');
});

app.get('/joinRace', (request, response) => {
    response.sendFile(__dirname + '/html/joinRace.html');
    console.log('Join race page');
});

app.get ('/gameDetails', (request, response) => {
    /* Validate and handle form submission */
    response.sendFile(__dirname + '/html/gameDetails.html') ;
    var timeout = setTimeout(nextPage, 3000);

    
    function nextPage() {
        response.sendFile(__dirname + '/html/getReady.html');
        clearTimeout(timeout);
    }

});

app.post('/getReady', (request, response) => {
    response.sendFile(__dirname + 'html/getReady.html');
});

app.get('/game', (request, response) => {
    response.sendFile(__dirname + '/html/game.html');
});

io.on('connection', (socket) => {
    console.log('-- A user connected');
    
    
    socket.on('gameDetails', (username, gameID) => {
        console.log("Username: " +username+ " Game ID: " + gameID);

        io.emit('/gameDetails', username, gameID);
        
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    })
    
    //console.log(username);
})

server.listen(3001, () => {
    console.log('listening on *:3001');
})













/* Serve CSS files 
const cssDirectory = path.join(__dirname , 'publiccss');
const serveStaticCSS = express.static(cssDirectory);
const cssRoutePath = '/public/css';

app.use(cssRoutePath, serveStaticCSS);

/* Serve other JS files 
const jsDirectory = path.join(__dirname , 'public/js');
const serveStaticJS = express.static(jsDirectory);
const jsRoutePath = '/public/js';

app.use(jsRoutePath, serveStaticJS);*/
