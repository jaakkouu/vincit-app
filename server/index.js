const express = require('express')();
const http = require('http').Server(express);
const io = require('socket.io')(http);

var counter = 0;

io.on('connection', socket => {
    io.emit('client count', io.engine.clientsCount);
    socket.emit('update points', 20);

    // Functions
    socket.on('play', (points) => {
        points--; // remove 1 point
        let extraPoints = counter > 0 ? checkForPrice() : false;
        if(extraPoints){
            socket.emit('notify reward', extraPoints);
            points += extraPoints;
        }
        socket.emit('update points', points);
        counter++;
    });
});


function isWholeNumber(x) {
    return x % 1 == 0;
}

function checkForPrice() {
    let price = false;
    if(isWholeNumber(counter / 500)) {
        price = 250;
    } else if (isWholeNumber(counter / 100)) {
        price = 40;
    } else if (isWholeNumber(counter / 10)) {
        price = 5;
    }
    return price;
}

http.listen(3000, () => {
    console.log('Listening at: 3000');
});