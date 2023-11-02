const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const Filter = require("bad-words");

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

io.on("connection", (socket) => {
  // console.log("new WebSocket connection");

  socket.emit("welcome");
  socket.broadcast.emit("newClient");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed!");
    }

    callback();
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });

  socket.on("sendLocation", (object, callback) => {
    callback();
    io.emit(
      "message",
      `https://google.com/maps?q=${object.latitude},${object.longitude}`
    );
  });
});

server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
