const express = require('express')();
const http = require('http').Server(express);
const io = require('socket.io')(http);

var counter = 0,
    nextTen = 10,
    nextHundred = 100,
    nextHalf = 500;

io.on('connection', socket => {
    io.emit('client count', io.engine.clientsCount);
    
    init(socket); // set points and calculate next price

    // Functions
    socket.on('play', (points) => {
        points--; // remove 1 point
        counter++;
        let extraPoints = counter > 0 ? checkForPrice() : false;
        if(extraPoints){
            socket.emit('notify reward', extraPoints);
            points += extraPoints;
        } 
        socket.emit('notify possibilty', nextPossiblePrice()); // calculate next possible winning
        socket.emit('update points', points);
    });
    socket.on('reload', () => init(socket));
});

function init(socket) {
    socket.emit('update points', 20);
    socket.emit('notify possibilty', nextPossiblePrice());
}

function nextPossiblePrice() {
    return Math.min(
        Math.abs(nextTen - counter), 
        Math.abs(nextHundred - counter), 
        Math.abs(nextHalf - counter)
    );
}

function isWholeNumber(x) {
    return x % 1 == 0;
}

function checkForPrice() {
    let price = false;
    if(isWholeNumber(counter / 500)) {
        price = 250;
        nextHalf += 500;
    } else if (isWholeNumber(counter / 100)) {
        price = 40;
        nextHundred += 100;
    } else if (isWholeNumber(counter / 10)) {
        price = 5;
        nextTen += 10;
    }
    return price;
}

http.listen(3000, () => {
    console.log('Listening at: 3000');
});