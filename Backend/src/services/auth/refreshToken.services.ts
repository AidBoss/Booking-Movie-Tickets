import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../../models/user.model';
import refreshTokenModel from '../../models/refreshToken.model';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY!;

export const refreshTokenService = async (refreshToken: string) => {
   if (!refreshToken) {
      return { status: 403, message: 'Vui lòng cung cấp refresh token.' };
   }
   try {
      // Giải mã refresh token
      const decoded = jwt.verify(refreshToken, SECRET_KEY);
      // Kiểm tra nếu decoded là đối tượng JwtPayload và chứa userId
      if (typeof decoded !== 'string' && decoded.userId) {
         const user = await User.findById(decoded.userId);
         if (!user) {
            return { status: 403, message: 'Người dùng không tồn tại.' };
         }
         const token = refreshTokenModel.find({ refreshToken: refreshToken });
         if (!token) {
            return { status: 403, message: 'Refresh token không tồn tại.' };
         }
         // Tạo mới access token
         const newAccessToken = jwt.sign(
            { userId: user._id, role: user.role },
            SECRET_KEY,
            { expiresIn: '2m' }
         );
         console.log("New access token: ", newAccessToken);

         return {
            status: 200,
            message: 'Làm mới access token thành công.',
            accessToken: newAccessToken,
         };
      } else {
         return { status: 403, message: 'Refresh token không hợp lệ.' };
      }
   } catch (error: any) {
      return { status: 400, message: 'Token không hợp lệ.' };
   }
};
