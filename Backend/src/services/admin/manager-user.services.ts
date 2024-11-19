import { IUserResponse, IUserUpdate } from './../../interfaces/user.interface';
import User from "../../models/user.model";
import mongoose from 'mongoose';
import logger from '../../logs/log.errors';

const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

const getAllUser = async (): Promise<IUserResponse> => {
   try {
      const result = await User.find().lean();
      if (result && result.length > 0) {
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
   if (!isValidObjectId(id)) {
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
            data: [result]
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
   if (!isValidObjectId(id)) {
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
            data: [result]
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

const LockUser = async (id: string, status: boolean): Promise<IUserResponse> => {
   if (!isValidObjectId(id)) {
      return {
         status: 404,
         message: "Không tìm thấy người dùng"
      }
   }
   try {
      let lockU: boolean;
      if (status) {
         lockU = false;
      } else {
         lockU = true;
      }
      const user = await User.findByIdAndUpdate(id, { status: lockU }, { new: true });
      if (user) {
         return {
            status: 200,
            message: `Tài khoản đã được ${lockU ? "khóa" : "mở khóa"} thành công`,
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
         message: "Lỗi quá trình sửa"
      }
   }
};

const deleteUser = async (id: string): Promise<IUserResponse> => {
   if (!isValidObjectId(id)) {
      return {
         status: 404,
         message: "Không tìm thấy người dùng"
      }
   }
   try {
      const user = await User.findByIdAndDelete(id);
      if (user) {
         return {
            status: 200,
            message: 'Xóa người dùng thành công',
            data: [user]
         };
      }
      return {
         status: 400,
         message: "Xóa thất bại"
      }

   } catch (e: any) {
      logger.error(`'Lỗi khi xóa user: ' ${e.message}`)
      return {
         status: 500,
         message: "Lỗi quá trình sửa"
      }
   }
}

export default { getAllUser, getUserById, editUser, LockUser, deleteUser };
