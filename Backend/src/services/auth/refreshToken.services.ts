import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../../models/user.model';
import refreshTokenModel from '../../models/refreshToken.model';
import UserRoleModel from "../../models/user-role.model";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY!;

const getUserRole = async (userId: string) => {
    const userRole = await UserRoleModel.findOne({userId})
    if (!userRole) {
        throw new Error('Quyền truy cập không tồn tại');
    }
    const roleId = userRole.roleId;
    return roleId.toString();
};


export const refreshTokenService = async (refreshToken: string) => {
    if (!refreshToken) {
        return {status: 403, message: 'Vui lòng cung cấp refresh token.'};
    }
    try {
        // Giải mã refresh token
        const decoded = jwt.verify(refreshToken, SECRET_KEY);
        // Kiểm tra nếu decoded là đối tượng JwtPayload và chứa userId
        if (typeof decoded !== 'string' && decoded.userId) {
            const user = await User.findById(decoded.userId);
            if (!user) {
                return {status: 403, message: 'Người dùng không tồn tại.'};
            }
            const token = refreshTokenModel.find({refreshToken: refreshToken});
            if (!token) {
                return {status: 403, message: 'Refresh token không tồn tại.'};
            }
            const role = await getUserRole(user._id as string)
            // Tạo mới access token
            const newAccessToken = jwt.sign(
                {userId: user._id, role: role},
                SECRET_KEY,
                {expiresIn: '3h'}
            );
            return {
                status: 200,
                message: 'Làm mới access token thành công.',
                accessToken: newAccessToken,
            };
        } else {
            return {status: 403, message: 'Refresh token không hợp lệ.'};
        }
    } catch (error: any) {
        return {status: 400, message: 'Token không hợp lệ.'};
    }
};
