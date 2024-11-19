import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY!;

// Middleware xác thực access token
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
   // Lấy token từ header
   const authHeader = req.headers.authorization;

   const token = authHeader && authHeader.split(' ')[1];

   if (!token) {
      return res.status(401).json({ message: 'Vui lòng đăng nhập.' });
   }
   try {
      // Kiểm tra và giải mã token
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      if (decoded && decoded.userId) {
         const user = await User.findById(decoded.userId);
         if (!user) {
            return res.status(403).json({ message: 'Người dùng không tồn tại.' });
         }
         if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập.' });
         }
         // Nếu mọi thứ đều ổn, cho phép tiếp tục
         return next();
      } else {
         return res.status(403).json({ message: 'Token không hợp lệ.' });
      }
   } catch (error: any) {
      return res.status(400).json({ message: 'Token không hợp lệ.' });
   }
};

// Middleware xác thực cho user (có thể dùng cho các route yêu cầu người dùng bình thường)
export const middlewareUser = async (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.headers.authorization;
   const token = authHeader && authHeader.split(' ')[1];

   if (!token) {
      return res.status(403).json({ message: 'Vui lòng đăng nhập.' });
   }

   try {
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      if (decoded && decoded.userId) {
         const user = await User.findById(decoded.userId);
         if (!user) {
            return res.status(403).json({ message: 'Người dùng không tồn tại.' });
         }
         return next(); // Nếu mọi thứ ổn, cho phép tiếp tục
      } else {
         return res.status(403).json({ message: 'Token không hợp lệ.' });
      }
   } catch (error: any) {
      return res.status(400).json({ message: 'Token không hợp lệ.' });
   }
};
