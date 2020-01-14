const express = require('express')();
const http = require('http').Server(express);
const io = require('socket.io')(http);

io.on('connection', socket => {
    io.emit('client count', io.engine.clientsCount);
    socket.emit('update points', 20);
    // Functions
    socket.on('play', (points) => {
        points--;
        socket.emit('update points', points);
    });
});

http.listen(3000, () => {
    console.log('Listening at: 3000');
});