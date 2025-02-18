import { Server } from "socket.io";
import { registerSocketEvents } from "./eventHandlers.js";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    registerSocketEvents(io, socket);
  });

  return io;
};

export default initializeSocket;
