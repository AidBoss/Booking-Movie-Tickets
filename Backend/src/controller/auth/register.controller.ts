import { Request, Response } from "express";
import registerService from "../../services/auth/register.services";
import { IRegister } from "../../interfaces/auth.interface";

const registerController = async (req: Request, res: Response): Promise<void> => {
   try {
      const { fullname, username, email, phone, password, role }: IRegister = req.body;
      const result = await registerService({ fullname, username, email, phone, password, role })
      if (result) {
         res.status(result.status).json({
            message: result.message,
            user: result.user
         })
      }
   } catch (error: any) {
      res.status(500).json({
         status: "error",
         message: "Lỗi trong quá trình đăng ký!"
      });
   }
}
export default registerController;