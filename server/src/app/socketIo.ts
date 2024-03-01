import { Server as SoketIoServer } from "socket.io";
import server from "../app";

const ioInstance = new SoketIoServer(server);
ioInstance.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("notification", (data) => {
    //Broadcast the notification data to all connected clients (admin dashboard)
    ioInstance.emit("newNotification", data);
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
