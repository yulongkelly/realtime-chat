// const express = require("express");
const io = require("socket.io")(3000);

const users = {};

io.on("connection", (socket) => {
  socket.on("send-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connection", name);
  });
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    }); //send to other users
  });
  socket.on("disconnect", () => {
    //move user from the array
    socket.broadcast.emit("user-disconnection", users[socket.id]);
    delete users[socket.id];
  });
});

// const app = express();

// //Set static folder
// app.use(express.static());

// const PORT = 3000 || process.env.PORT;

// app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
