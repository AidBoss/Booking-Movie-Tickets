import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model';
import UserRoleModel from "../models/user-role.model";
import RoleModel from "../models/role.model";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY!;

const getUserRole = async (userId: string) => {
// .populate('roleId'); khi thêm . Phương thức này sẽ thay thế giá trị của roleId (vốn chỉ là một ObjectId) bằng toàn bộ tài liệu của bảng Role liên quan.
    const userRole = await UserRoleModel.findOne({userId})

    if (!userRole) {
        throw new Error('Quyền truy cập không tồn tại');
    }
    const roleId = userRole.roleId;
    return roleId.toString();
};
const getRoleName = async (roleId: string) => {
    const role = await RoleModel.findById(roleId);

    if (!role) {
        throw new Error('Quyền truy cập không tồn tại');
    }
    return role.name;
}
// Middleware xác thực access token
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'Vui lòng đăng nhập.'});
    }
    try {
        // Giải mã token
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        if (decoded.userId) {
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(403).json({message: 'Người dùng không tồn tại.'});
            }
            const roleId = await getUserRole(decoded.userId);
            const roleName = await getRoleName(roleId);
            req.body = {
                dataMiddle: {
                    id: user._id,
                    roleName: roleName
                }
            }
            return next();
        } else {
            return res.status(403).json({message: 'Token không hợp lệ.'});
        }
    } catch (error: any) {
        return res.status(400).json({message: 'Token không hợp lệ.'});
    }
};

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleName = req.body.dataMiddle.roleName;
        if (roleName === 'admin') {
            res.status(403).json({message: 'Bạn không có quyền truy cập.'});
        }
        return next();
    } catch (e) {
        res.status(403).json({message: 'Bạn không có quyền truy cập.'});
    }
}

