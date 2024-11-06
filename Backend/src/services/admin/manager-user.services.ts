import { IUser, IUserResponse, IUserUpdate } from './../../interfaces/user.interface';
import User from "../../models/user.model";
import mongoose from 'mongoose';
import logger from '../../logs/log.errors';

const getAllUser = async (): Promise<IUserResponse> => {
   try {
      const result = await User.find({ deleted: false });
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

const editUser = async (id: string, user: IUserUpdate): Promise<IUserResponse> => {
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
         status: 400,
         message: 'ID không hợp lệ'
      }
   }
   try {
      const result = await User.findByIdAndUpdate(id, user, { new: true });
      if (result) {
         return {
            status: 200,
            message: 'Cập nhật người dùng thành công',
            user: result
         };
      } else {
         return {
            status: 404,
            message: 'Không tìm thấy người dùng'
         };
      }
   } catch (error: any) {
      logger.error(`Lỗi khi cập nhập: ${error.message}`);
      return {
         status: 500,
         message: 'Lỗi server'
      }
   }
}

const deleteUser = async (id: string, deleted: boolean): Promise<IUserResponse> => {
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
         status: 404,
         message: "Không tìm thấy người dùng"
      }
   }
   try {
      const user = await User.findByIdAndUpdate(id, { deleted: deleted });
      if (user) {
         if (deleted === false) {
            return {
               status: 200,
               message: 'Khôi phục tài khoản thành công',
            };
         }
         return {
            status: 200,
            message: 'Xóa người dùng thành công',
         };
      } else {
         return {
            status: 404,
            message: 'Không tìm thấy người dùng'
         };
      }
   } catch (error: any) {
      logger.error(`'Lỗi khi xóa user: ' ${error.message}`)
      return {
         status: 500,
         message: "Lỗi quá trình sửa"
      }
   }
}
export default { getAllUser, getUserById, editUser, deleteUser };
