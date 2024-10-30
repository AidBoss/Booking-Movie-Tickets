import { Ilogin, IloginResponse } from './../../interfaces/auth.interface';
import User from "../../models/user.model";
import bcrypt from 'bcrypt';
import logger from '../../logs/log.errors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'aidboss-i-love-you';
const loginServices = async (user: Ilogin): Promise<IloginResponse | null> => {
   const { username, password } = user;
   try {
      const foundUser = await User.findOne({ username });
      if (!foundUser) {
         return { status: 404, message: 'Người dùng chưa đăng ký' };
      }
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
         return { status: 403, message: 'Tài khoản hoặc mật khẩu sai' };
      }
      const token_login = jwt.sign(
         { userId: foundUser._id, role: foundUser.role },
         SECRET_KEY,
         { expiresIn: '1h' }
      );
      return {
         status: 200,
         message: 'Đăng nhập thành công',
         user: foundUser,
         token: token_login,
      };
   } catch (error: any) {
      logger.error(`Lỗi khi đăng ký: ${error.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
};

export default loginServices;