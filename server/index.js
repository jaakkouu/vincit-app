const express = require("express")();
const http = require("http").Server(express);
const socketio = require("socket.io")(http);

socketio.on("connection", socket => {
    
});

http.listen(3000, () => {
    console.log("Listening at :3000...");
});