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
        let extraPoints = checkForPrice();
        if(extraPoints){
            socket.emit('notify reward', extraPoints);
            points += extraPoints;
        }   
        socket.emit('update points', points);
        counter++;
    });
});

function checkForPrice() {
    let price = false;
    switch(true) {
        case counter % 10 == 0 && counter >= 10:
            price = 5;
            console.log("You won 5 points");
        break;
        case counter % 100 == 0 && counter >= 100:
            price = 40;
            console.log("You won 40 points");
        break;
        case counter % 500 == 0 && counter >= 500:
            price = 250;
            console.log("You won 250 points");
        break;
    }
    return price;
}

http.listen(3000, () => {
    console.log('Listening at: 3000');
});