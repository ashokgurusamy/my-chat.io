const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000; //To run on which port
const router = require("./router");

const app = express();
const server = http.createServer(app); //initialize the server
const io = socketio(server); //instance of socketio. to make socket.io server working

//To know the client connection instance created
io.on("connection", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    } else {
      socket.join(user.room);
    }
  });
  socket.on("disconnect", () => {
    console.log("user gone");
  });
});
//End

app.use(router);
server.listen(PORT, () => console.log(`server running on ${PORT}`));
//server.listen(PORT, () => console.log("server has started  on port ${PORT}")); //to make server working
