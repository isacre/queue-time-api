import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(URL, {
  autoConnect: false,
});

export function connectSocket(id: string) {
  socket.connect();
  socket.emit("joinQueue", id);
}

export function disconnectSocket() {
  socket.disconnect();
}
