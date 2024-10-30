import { IRegister, IRegisterResponse } from './../../interfaces/auth.interface';
import User from "../../models/user.model";
import bcrypt from 'bcrypt';
import logger from '../../logs/log.errors';

const registerService = async (user: IRegister): Promise<IRegisterResponse> => {
   const { fullname, username, password, phone, email, role } = user;
   try {
      const foundUser = await User.findOne({ username });
      if (foundUser) {
         return { status: 409, message: 'Tên người dùng đã tồn tại' };
      }
      const foundEmail = await User.findOne({ email });
      if (foundEmail) {
         return { status: 409, message: 'Email đã tồn tại' };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ fullname, username, password: hashedPassword, phone, email, role });
      await newUser.save();
      return { status: 201, message: 'Tạo tài khoản thành công', user: newUser };
   } catch (error: any) {
      logger.error(`Lỗi khi đăng ký: ${error.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
}


export default registerService;
