import { Server } from "socket.io";
import http from "http";
import { setupQueueSocket } from "./queueSocket";

let io: Server;

export const initSockets = (server: http.Server) => {
  io = new Server(server, { cors: { origin: "*" } });
  setupQueueSocket(io);
  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
