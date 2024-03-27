"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketInstance = void 0;
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("../app"));
const ioInstance = new socket_io_1.Server(app_1.default);
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
const getSocketInstance = () => {
    if (!ioInstance) {
        throw new Error("Socket server is not initialized");
    }
    return ioInstance;
};
exports.getSocketInstance = getSocketInstance;
