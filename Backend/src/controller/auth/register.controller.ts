import { IRegiter } from "../../interfaces/auth.interface";
import registerService from "../../services/auth/register.services";
import { Request, Response } from "express";
import { RegisterError } from "../../emun/auth.enum";

const registerController = async (req: Request, res: Response): Promise<void> => {
   try {
      const { fullname, username, email, phone, password, repass }: IRegiter = req.body;
      // Gọi service đăng ký
      const result = await registerService({ fullname, username, email, phone, password, repass });
      // Kiểm tra kết quả trả về từ service
      if (result === RegisterError.UsernameExists) {
         res.status(400).json({
            status: "error",
            message: "Username đã tồn tại!"
         });
      } else if (result === RegisterError.EmailExists) {
         res.status(400).json({
            status: "error",
            message: "Email đã tồn tại!"
         });
      } else if (result === RegisterError.PasswordMismatch) {
         res.status(400).json({
            status: "error",
            message: "Mật khẩu và xác nhận mật khẩu không khớp!"
         });
      } else {
         // Thành công
         res.status(200).json({
            status: "success",
            message: "Đăng ký thành công!",
            data: result
         });
      }
   } catch (error) {
      res.status(500).json({
         status: "error",
         message: "Lỗi server!",
         data: {}
      });
   }
}

export default registerController;
