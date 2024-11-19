import { Request, Response } from 'express';
import { Ilogin, IRegister } from '../../interfaces/auth.interface';
import logger from '../../logs/log.errors';
import authServices from '../../services/auth/auth.services';
import * as express from "express";

import dotenv from 'dotenv';
dotenv.config();

const loginController = async (req: Request, res: Response): Promise<void> => {
   try {
      const { username, password }: Ilogin = req.body;
      const result = await authServices.loginService(username, password);
      if (result) {
         res.cookie('refreshToken', result.refreshToken, {
            httpOnly: false,
            sameSite: 'strict',
            secure: false,
         });
         res.status(result.status).json({
            message: result.message,
            user: result.user,
            accessToken: result.accessToken,
         });
      } else {
         res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
      }
   } catch (error: any) {
      logger.error("Lỗi đăng nhập:", error);
      res.status(500).json({
         message: "Có lỗi trong quá trình đăng nhập",
         error: error.message,
      });
   }
};

const registerController = async (req: Request, res: Response): Promise<void> => {
   try {
      const { fullname, username, email, phone, password, role }: IRegister = req.body;
      const result = await authServices.registerService({ fullname, username, email, phone, password, role });

      res.status(result.status).json({
         message: result.message,
         user: result.user,
      });
   } catch (error: any) {
      logger.error("Lỗi đăng ký:", error);
      res.status(500).json({
         message: "Lỗi trong quá trình đăng ký",
         error: error.message,
      });
   }
};

const logoutController = async (req: Request, res: Response): Promise<void> => {
   try {
      const userId = req.params.id;
      const result = await authServices.logoutService(userId);
      res.clearCookie('refreshToken');
      res.status(result.status).json({ message: result.message });
   } catch (error: any) {
      logger.error("Lỗi đăng xuất:", error);
      res.status(500).json({ message: "Lỗi server khi đăng xuất" });
   }
};

export default { loginController, registerController, logoutController };
