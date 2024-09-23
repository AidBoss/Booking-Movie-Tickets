import { Request, Response } from 'express';
import loginServices from '../../services/auth/login.services';
import { Ilogin } from '../../interfaces/login.interface';

const loginController = async (req: Request, res: Response): Promise<void> => {
   try {
      const { username, password }: Ilogin = req.body;
      const result = await loginServices({ username, password });
      if (result) {
         res.status(200).json({
            status: "success",
            message: "Đăng nhập thành công!",
            user: result,
         });
      } else {
         res.status(401).json({
            status: "fail",
            message: "Tài khoản hoặc mật khẩu sai!",
         });
      }
   } catch (error: any) { // Khai báo error là any
      console.error("Lỗi đăng nhập:", error);
      res.status(500).json({
         status: "error",
         message: "Có lỗi trong quá trình đăng nhập",
         error: error.message, // Chắc chắn rằng error có thuộc tính message
      });
   }
};

export default {
   loginController,
};
