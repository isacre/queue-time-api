import { Server, Socket } from "socket.io";

export const setupQueueSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Cliente conectado:", socket.id);

    socket.on("joinQueue", (queueId: string) => {
      try {
        socket.join(queueId);
      } catch (err) {
        console.error("Erro ao entrar na fila:", err);
        socket.emit("error", { message: "Não foi possível entrar na fila" });
      }
    });

    socket.on("leaveQueue", (queueId: string) => {
      try {
        socket.leave(queueId);
      } catch (err) {
        console.error("Erro ao sair da fila:", err);
        socket.emit("error", { message: "Não foi possível sair da fila" });
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(`Cliente desconectado (${socket.id}):`, reason);
    });
  });
};
