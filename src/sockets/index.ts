import { Server } from "socket.io";
import http from "http";
import { setupQueueSocket } from "./queueSocket";

let io: Server;

export const initSockets = (server: http.Server) => {
  const port = 8085;
  io = new Server(server, { cors: { origin: "*" } });
  setupQueueSocket(io);
  io.listen(port);
  console.log(`Socket.io is running on port ${port}`);
  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
