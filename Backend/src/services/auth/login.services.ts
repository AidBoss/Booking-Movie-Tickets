import { Ilogin } from '../../interfaces/login.interface';
import User from "../../models/user.model";
import bcrypt from 'bcrypt';

const loginServices = async (user: Ilogin): Promise<Ilogin | null> => {
   const { username, password } = user;
   try {
      const foundUser = await User.findOne({ username }) as Ilogin | null;
      if (!foundUser) {
         console.log("Tài khoản không tồn tại!");
         return null; // Đảm bảo trả về giá trị
      }
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
         console.log("Tài khoản hoặc mật khẩu sai!");
         return null; // Đảm bảo trả về giá trị
      }
      return foundUser;
   } catch (error) {
      throw new Error("Lỗi trong khi đăng nhập");
   }
};

export default loginServices;