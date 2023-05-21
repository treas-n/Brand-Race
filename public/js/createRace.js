//const { event } = require("jquery");

$(function () {
    var socket = io();
    var input = $('#username');
    var form = $('#input-username > form');

    form.on('submit', function (event) {
        event.preventDefault();

        var username = input.val();
        var gameID = hashCode(username);
        
        socket.emit('gameDetails', username, gameID);

    });


    // Hash function to generate a hash code for a string
function hashCode(str) {
    var hash = 0;
    if (str.length === 0) {
      return hash;
    }
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    hash = Math.abs(hash);

    return hash;
  }  
});