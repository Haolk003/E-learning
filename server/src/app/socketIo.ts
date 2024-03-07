import { Server as SoketIoServer } from "socket.io";
import server from "../app";

const ioInstance = new SoketIoServer(server);
ioInstance.on("connection", (socket) => {
  socket.on("new_connection", (data) => {
    const { userId } = data;
    socket.join(userId);
  });
  socket.on("notification", (data) => {
    //Broadcast the notification data to all connected clients (admin dashboard)

    socket.to(data.receiver).emit(`newOrder`, data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export const getSocketInstance = () => {
  if (!ioInstance) {
    throw new Error("Socket server is not initialized");
  }
  return ioInstance;
};
