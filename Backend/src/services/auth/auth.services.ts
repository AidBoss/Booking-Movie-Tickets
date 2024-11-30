import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../../models/user.model';
import refreshTokenModel from '../../models/refreshToken.model';
import logger from '../../logs/logger';
import {IRegister, IloginResponse, IRegisterResponse} from '../../dto/auth.dto';
import UserRoleModel from "../../models/user-role.model";
import roleModel from "../../models/role.model";
import RoleModel from "../../models/role.model";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY


const generateAccessToken = (userId: string, roleId: string): string => {
    return jwt.sign({userId, roleId}, SECRET_KEY!, {expiresIn: '3h'});
};

const generateRefreshToken = (userId: string, roleId: string): string => {
    return jwt.sign({userId, roleId}, SECRET_KEY!, {expiresIn: '7d'});
};

const getUserRole = async (userId: string) => {
// .populate('roleId'); khi thêm . Phương thức này sẽ thay thế giá trị của roleId (vốn chỉ là một ObjectId) bằng toàn bộ tài liệu của bảng Role liên quan.
    const userRole = await UserRoleModel.findOne({userId})

    if (!userRole) {
        throw new Error('Quyền truy cập không tồn tại');
    }
    const roleId = userRole.roleId;

    return roleId.toString();
};


const loginService = async (username: string, password: string): Promise<IloginResponse | null> => {
    try {
        const foundUser = await User.findOne({username}).populate('addressId');

        if (!foundUser) {
            return {status: 404, message: 'Người dùng chưa đăng ký'};
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return {status: 403, message: 'Tài khoản hoặc mật khẩu sai'};
        }

        const userId = foundUser._id as string;

        // Kiểm tra refreshToken hiện tại
        const existingToken = await refreshTokenModel.findOne({userId: foundUser._id});
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
                const roleId = await getUserRole(userId);  // Lấy roleId từ UserRoleModel
                newRefreshToken = generateRefreshToken(userId, roleId);  // Sử dụng roleId
                expiresAt = new Date();
                expiresAt.setDate(expiresAt.getDate() + 7);
                await refreshTokenModel.updateOne(
                    {userId: foundUser._id},
                    {token: newRefreshToken}
                );
            }
        } else {
            // Không có token, tạo mới
            const roleId = await getUserRole(userId);  // Lấy roleId từ UserRoleModel
            newRefreshToken = generateRefreshToken(userId, roleId);
            expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);
            await refreshTokenModel.create({
                userId: foundUser._id,
                token: newRefreshToken,
                expiresAt,
            });
        }

        // Tạo accessToken
        const roleId = await getUserRole(userId);  // Lấy roleId từ UserRoleModel
        const accessToken = generateAccessToken(userId, roleId);  // Sử dụng roleId
        return {
            status: 200,
            message: 'Đăng nhập thành công',
            data: [
                {
                    _id: foundUser._id,
                    fullName: foundUser.fullName,
                    username: foundUser.username,
                    email: foundUser.email,
                    phone: foundUser.phone,
                    address: foundUser.addressId,
                }
            ],
            accessToken,
            refreshToken: {
                key: "refreshToken",
                token: newRefreshToken,
            },
        };
    } catch (error: any) {
        logger.error(`Lỗi khi đăng nhập: ${error.message}`);
        return {status: 500, message: 'Có lỗi trong quá trình đăng nhập, vui lòng thử lại sau'};
    }
};


const registerService = async (user: IRegister): Promise<IRegisterResponse> => {
    try {
        // Kiểm tra xem tên người dùng đã tồn tại chưa
        if (await User.findOne({username: user.username})) {
            return {status: 409, message: 'Tên người dùng đã tồn tại'};
        }

        // Kiểm tra xem email đã tồn tại chưa
        if (await User.findOne({email: user.email})) {
            return {status: 409, message: 'Email đã tồn tại'};
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Tạo mới người dùng
        const newUser = await User.create({
            fullName: user.fullName,
            username: user.username,
            password: hashedPassword,
            email: user.email
            });

        // Lấy role "user" từ bảng Role
        const roleRecord = await RoleModel.findOne({name: 'user'});

        if (!roleRecord) {
            return {status: 404, message: 'Role "user" không tồn tại'};
        }

        // Tạo bản ghi UserRole để liên kết user với role "user"
        const userRole = new UserRoleModel({
            userId: newUser._id,
            roleId: roleRecord._id,
        });

        // Lưu bản ghi UserRole
        await userRole.save();

        return {status: 201, message: 'Tạo tài khoản thành công', user: newUser};
    } catch (error: any) {
        logger.error(`Lỗi khi đăng ký: ${error.message}`);
        return {status: 500, message: 'Lỗi server'};
    }
};


const logoutService = async (userId: string): Promise<{ status: number; message: string }> => {
    try {
        await refreshTokenModel.deleteMany({userId});
        return {status: 200, message: 'Đăng xuất thành công'};
    } catch (error: any) {
        logger.error(`Lỗi khi xóa refreshToken: ${error.message}`);
        return {status: 500, message: 'Lỗi server khi đăng xuất'};
    }
};

export default {loginService, registerService, logoutService};
