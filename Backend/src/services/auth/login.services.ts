import { Ilogin } from '../../interfaces/auth.interface';
import User from "../../models/user.model";
import bcrypt from 'bcrypt';
import { LoginError } from "../../emun/auth.enum";

const loginServices = async (user: Ilogin): Promise<Ilogin | LoginError> => {
   const { username, password } = user;
   try {
      // Tìm người dùng với kiểu IUser
      const foundUser = (await User.findOne({ username }));
      if (!foundUser) {
         return LoginError.InvalidCredentials; // Không tìm thấy user
      }
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
         return LoginError.InvalidCredentials; // Mật khẩu không đúng
      }
      if (foundUser.isLocked) {
         return LoginError.AccountLocked;  // Tài khoản bị khóa
      }
      // Nếu tất cả điều kiện đúng, trả về thông tin người dùng
      return foundUser;
   } catch (error) {
      throw new Error("Lỗi trong khi đăng nhập");
   }
};

export default loginServices;
