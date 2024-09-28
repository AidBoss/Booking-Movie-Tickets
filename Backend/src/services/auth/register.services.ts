import { IRegiter } from "../../interfaces/auth.interface";
import User from "../../models/user.model";
import bcrypt from 'bcrypt';
import { RegisterError } from "../../emun/auth.enum";

const registerService = async (user: IRegiter): Promise<RegisterError | IRegiter> => {
   const { fullname, username, email, phone, password, repass } = user;
   try {
      // Kiểm tra trùng username
      const foundUser = await User.findOne({ username });
      if (foundUser) {
         return RegisterError.UsernameExists;
      }
      // Kiểm tra trùng email
      const foundEmail = await User.findOne({ email });
      if (foundEmail) {
         return RegisterError.EmailExists;
      }
      // Kiểm tra mật khẩu đúng với xác nhận mật khẩu
      if (password !== repass) {
         return RegisterError.PasswordMismatch;
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Tạo mới user
      const newUser = new User({
         fullname,
         username,
         email,
         phone,
         password: hashedPassword,
      });
      // Lưu user vào database
      await newUser.save();
      // Trả về thông tin user đã đăng ký thành công
      return user;
   } catch (e) {
      throw new Error("Lỗi trong quá trình đăng ký");
   }
}

export default registerService;
