import { IUser, IUserResponse } from './../../interfaces/user.interface';
import User from "../../models/user.model";
import mongoose from 'mongoose';
const getAllUser = async (): Promise<IUserResponse> => {
   try {
      const result = await User.find({});
      if (result) {
         return {
            status: 200,
            message: 'Lấy danh sách người dùng thành công',
            data: result
         };
      } else {
         return {
            status: 404,
            message: 'Không tìm thấy danh sách'
         };
      }
   } catch (error) {
      return {
         status: 500,
         message: 'Lỗi server'
      };
   }
}

const getUserById = async (id: string): Promise<IUserResponse> => {
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
         status: 400,
         message: 'ID không hợp lệ'
      };
   }
   try {
      const result = await User.findById(id);
      console.log(result);
      if (result) {
         return {
            status: 200,
            message: 'Lấy người dùng thành công',
            user: result
         };
      } else {
         return {
            status: 404,
            message: 'Không tìm thấy người dùng'
         };
      }
   } catch (error) {
      return {
         status: 500,
         message: 'Lỗi server'
      };
   }
}
export default { getAllUser, getUserById };
