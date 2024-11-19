// socket.config.ts
import { Server } from "socket.io";
import http from "http";

let io: Server = new Server();

export const initSocket = (httpServer: http.Server) => {
   io = new Server(httpServer, {
      cors: {
         origin: "http://localhost:4200", // No trailing slash
         credentials: true,
         methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      },
   });

   // Xử lý sự kiện WebSocket
   io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`);
      socket.on("disconnect", () => {
         console.log(`Client disconnected: ${socket.id}`);
      });

      socket.on("chatMessage", (message) => {
         console.log("Message received:", message);
         io.emit("newMessage", message);
      });
   });
};
export const getSocket = (): Server => {
   if (!io) {
      throw new Error("Socket has not been initialized yet.");
   }
   return io;
};
