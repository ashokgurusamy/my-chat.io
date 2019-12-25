const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const PORT = process.env.PORT || 5000; //To run on which port
const router = require("./router");

const app = express();
const server = http.createServer(app); //initialize the server
const io = socketio(server); //instance of socketio. to make socket.io server working

//To know the client connection instance created
io.on("connection", socket => {
  console.log("have new connection");

  socket.on("disconncet", () => {
    console.log("user gone");
  });
});
//End

app.use(router);
server.listen(PORT, () => console.log(`server running on ${PORT}`));
//server.listen(PORT, () => console.log("server has started  on port ${PORT}")); //to make server working
