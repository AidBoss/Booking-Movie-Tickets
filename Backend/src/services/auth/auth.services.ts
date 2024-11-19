import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../../models/user.model';
import refreshTokenModel from '../../models/refreshToken.model';
import logger from '../../logs/log.errors';
import { IRegister, IloginResponse, IRegisterResponse } from '../../interfaces/auth.interface';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY

const generateAccessToken = (userId: string, role: string): string => {
   return jwt.sign({ userId, role }, SECRET_KEY!, { expiresIn: '1m' });
};

const generateRefreshToken = (userId: string, role: string): string => {
   return jwt.sign({ userId, role }, SECRET_KEY!, { expiresIn: '7d' });
};

const loginService = async (username: string, password: string): Promise<IloginResponse | null> => {
   try {
      const foundUser = await User.findOne({ username });
      if (!foundUser) {
         return { status: 404, message: 'Người dùng chưa đăng ký' };
      }
      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
         return { status: 403, message: 'Tài khoản hoặc mật khẩu sai' };
      }
      const userId = foundUser._id as string;
      // Kiểm tra refreshToken hiện tại
      const existingToken = await refreshTokenModel.findOne({ userId: foundUser._id });
      let newRefreshToken = '';
      let expiresAt: Date;

      if (existingToken) {
         const now = new Date();
         if (existingToken.expiresAt > now) {
            // Token còn hạn, sử dụng lại token cũ
            newRefreshToken = existingToken.token;
            expiresAt = existingToken.expiresAt;
         } else {
            // Token hết hạn, tạo token mới
            newRefreshToken = generateRefreshToken(userId, foundUser.role!);
            expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);
            // Cập nhật token mới trong cơ sở dữ liệu
            await refreshTokenModel.updateOne(
               { userId: foundUser._id },
               { token: newRefreshToken, expiresAt }
            );
         }
      } else {
         // Không có token, tạo mới
         newRefreshToken = generateRefreshToken(userId, foundUser.role!);
         expiresAt = new Date();
         expiresAt.setDate(expiresAt.getDate() + 7);
         await refreshTokenModel.create({
            userId: foundUser._id,
            token: newRefreshToken,
            expiresAt,
         });
      }
      // Tạo accessToken
      const accessToken = generateAccessToken(userId, foundUser.role!);
      return {
         status: 200,
         message: 'Đăng nhập thành công',
         user: foundUser,
         accessToken,
         refreshToken: {
            key: "refreshToken",
            token: newRefreshToken,
            expiresAt: expiresAt.toISOString(),
         },
      };
   } catch (error: any) {
      logger.error(`Lỗi khi đăng nhập: ${error.message}`);
      return { status: 500, message: 'Có lỗi trong quá trình đăng nhập, vui lòng thử lại sau' };
   }
};



const registerService = async (user: IRegister): Promise<IRegisterResponse> => {
   try {
      const { fullname, username, password, phone, email, role } = user;

      if (await User.findOne({ username })) {
         return { status: 409, message: 'Tên người dùng đã tồn tại' };
      }

      if (await User.findOne({ email })) {
         return { status: 409, message: 'Email đã tồn tại' };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ fullname, username, password: hashedPassword, phone, email, role });

      return { status: 201, message: 'Tạo tài khoản thành công', user: newUser };
   } catch (error: any) {
      logger.error(`Lỗi khi đăng ký: ${error.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
};

const logoutService = async (userId: string): Promise<{ status: number; message: string }> => {
   try {
      await refreshTokenModel.deleteMany({ userId });
      return { status: 200, message: 'Đăng xuất thành công' };
   } catch (error: any) {
      logger.error(`Lỗi khi xóa refreshToken: ${error.message}`);
      return { status: 500, message: 'Lỗi server khi đăng xuất' };
   }
};

export default { loginService, registerService, logoutService };
