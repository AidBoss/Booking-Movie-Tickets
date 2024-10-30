// login.controller.ts
import { Request, Response } from 'express';
import loginServices from '../../services/auth/login.services';
import { Ilogin } from '../../interfaces/auth.interface';
import logger from '../../logs/log.errors';

const loginController = async (req: Request, res: Response): Promise<void> => {
   try {
      const { username, password }: Ilogin = req.body;
      const result = await loginServices({ username, password });
      if (result) {
         res.status(result.status).json({
            message: result.message,
            user: result.user,
            token: result.token,
         })
      }
   } catch (error: any) {
      logger.error("Lỗi đăng nhập:", error);
      res.status(500).json({
         message: "Có lỗi trong quá trình đăng nhập",
         error: error.message,
      });
   }
};

export default loginController;
