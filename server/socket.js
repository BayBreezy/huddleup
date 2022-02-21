const { Server } = require("socket.io");

/**
 * Method used to do socket actions
 *
 * @param {*} server httpServer
 */
module.exports = (server) => {
  const io = new Server(server);
  let rooms = [];
  io.on("connection", (socket) => {
    //Called when a user joins the room
    socket.on("join-room", (data) => {
      //Join rom with room ID
      socket.join(data.roomId);

      socket.to(data.roomId).emit("new-user", data.userId);

      //Check if room is already in  rooms list
      let roomFound = rooms.find((r) => r.roomId === data.roomId);
      //If room is not present, create it and add the first user
      if (!roomFound) {
        rooms.push({
          roomId: data.roomId,
          users: [{ user: data.userId, socketId: socket.id }],
        });
      }
      //If room is present, add the user
      if (roomFound) {
        roomFound.users.push({ user: data.userId, socketId: socket.id });
      }

      //get room data and send back to user
      let roomData = rooms.find((r) => r.roomId === data.roomId);
      io.in(roomData.roomId).emit("room-details", roomData);
      socket.on("disconnect", () => {
        let removedIndex = roomData.users.findIndex(
          (u) => u.socketId === socket.id
        );
        roomData.users.splice(removedIndex, 1);
        io.in(data.roomId).emit("user-left");
        io.in(roomData.roomId).emit("room-details", roomData);
      });
    });
  });
};
