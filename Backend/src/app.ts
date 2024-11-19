import express from "express";
import { createServer } from "http";
import appConfig from "./config/app.config";
import connection from "./config/database.config";
import routerAPI from "./router/api";

const app = express();
const httpServer = createServer(app);
const port: number = Number(process.env.PORT) || 9988;
const localhost: string = process.env.HOST_NAME || "localhost";

// Khởi tạo database và các kết nối khác
(async () => {
   try {
      await connection();  // Kết nối database
      // Cấu hình ứng dụng và socket trước khi sử dụng router
      appConfig(app, httpServer);

      // Đăng ký router sau khi cấu hình middleware
      app.use("/v1/api", routerAPI);

      // Khởi chạy server
      httpServer.listen(port, localhost, () => {
         console.log(`Server đang chạy trên: http://${localhost}:${port}`);
      });
   } catch (error) {
      console.error("Lỗi kết nối database:", error);
   }
})();
