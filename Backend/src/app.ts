import express from "express";
import { createServer } from "http";
import appConfig from "./config/app.config";
import connection from "./config/database.config";
import routerAPI from "./routers/api";
import RoleModel from "./models/role.model";
import RoleSchema from "./models/role.model";

const app = express();
const httpServer = createServer(app);
const port: number = Number(process.env.PORT);
const localhost: string = process.env.HOST_NAME!;


// tránh lỗi quyền người dùng nếu bảng role chưa tồn tại
const initializeRoles = async () => {
   const roles = ["user", "admin"];
   for (const roleName of roles) {
      const existingRole = await RoleSchema.findOne({ name: roleName });
      if (!existingRole) {
         const newRole = new RoleModel({ name: roleName, description: `${roleName} role` });
         await newRole.save();
      }
   }
};
// Khởi tạo database và các kết nối khác
(async () => {
   try {
      // Kết nối database
      await connection();

      await initializeRoles();

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
