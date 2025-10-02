import { Server, Socket } from "socket.io";
import prisma from "../db";
import { logger } from "../utils/logger";

export const setupQueueSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("joinQueue", async (queueId: string) => {
      try {
        socket.join(queueId);
        const queueItems = await prisma.queueItem.findMany({
          where: { queueId: Number(queueId) },
        });
        socket.emit("queueItems", queueItems);
      } catch (err) {
        logger.error("Error joining queue", {
          error: err instanceof Error ? err.message : "Unknown error",
          queueId,
          socketId: socket.id,
        });
        socket.emit("error", { message: "Não foi possível entrar na fila" });
      }
    });

    socket.on("leaveQueue", (queueId: string) => {
      try {
        socket.leave(queueId);
      } catch (err) {
        logger.error("Error leaving queue", {
          error: err instanceof Error ? err.message : "Unknown error",
          queueId,
          socketId: socket.id,
        });
        socket.emit("error", { message: "Não foi possível sair da fila" });
      }
    });

    socket.on("disconnect", (reason) => {
      logger.info("Client disconnected", {
        socketId: socket.id,
        reason,
      });
    });
  });
};
