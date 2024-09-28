import { Request, Response } from "express";
import { LoginError } from "../../emun/auth.enum"
import loginService from "../../services/auth/login.services";

const loginController = async (req: Request, res: Response): Promise<void> => {
   try {
      const { username, password } = req.body;
      // Kiểm tra thiếu thông tin
      if (!username || !password) {
         res.status(400).json({
            status: "error",
            message: LoginError.MissingFields
         });
         return;
      }
      // Gọi service đăng nhập
      const result = await loginService({ username, password });
      if (result === LoginError.InvalidCredentials) {
         res.status(401).json({
            status: "error",
            message: "Sai tên đăng nhập hoặc mật khẩu"
         });
      } else if (result === LoginError.AccountLocked) {
         res.status(403).json({
            status: "error",
            message: "Tài khoản của bạn đã bị khóa"
         });
      } else {
         // Đăng nhập thành công
         res.status(200).json({
            status: "success",
            message: "Đăng nhập thành công!",
            data: result
         });
      }
   } catch (error) {
      res.status(500).json({
         status: "error",
         message: LoginError.ServerError
      });
   }
}

export default loginController;