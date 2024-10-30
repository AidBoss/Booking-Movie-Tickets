import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || 'aidboss-i-love-you';

// Middleware xác thực token
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.headers.authorization;
   const token = authHeader && authHeader.split(' ')[1];
   if (!token) {
      return res.status(403).json({ message: 'Vui lòng đăng nhập.' });
   }
   try {
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      if (typeof decoded !== 'string' && decoded.userId) {
         const user = await User.findById(decoded.userId);
         if (!user) {
            return res.status(403).json({ message: 'Vui lòng đăng nhập.' });
         }
         if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập.' });
         }
         next();
      } else {
         return res.status(403).json({ message: 'Vui lòng đăng nhập.' });
      }
   } catch (error: any) {
      return res.status(400).json({ message: 'Token không hợp lệ.' });
   }
};
