import { IAddress, IProvince } from "../../dto/address.dto";
import Province from "../../models/province.model";
import mongoose from "mongoose";
import logger from "../../logs/logger";

const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

const getAllProvinces = async (): Promise<IAddress<IProvince>> => {
   try {
      const result = await Province.find().lean<IProvince[]>();
      if (result && result.length > 0) {
         return {
            status: 200,
            message: 'Lấy danh sách tỉnh/thành phố thành công',
            data: result,
         };
      } else {
         return {
            status: 404,
            message: 'Danh sách tỉnh/thành phố không tồn tại'
         };
      }
   } catch (error: any) {
      logger.error(`Lỗi khi lấy danh sách tỉnh/thành phố: ${error.message}`);
      return {
         status: 500,
         message: 'Lỗi server'
      };
   }
}

const getProvinceById = async (id: string) => {
   if (!isValidObjectId(id)) {
      return {
         status: 404,
         message: 'ID Không hợp lệ'
      }
   }
   try {
      const result = await Province.findById(id).lean<IProvince>();
      if (result) {
         return {
            status: 200,
            message: 'Lấy thành công',
            data: result,
         };
      } else {
         return {
            status: 404,
            message: 'Không tìm thấy tỉnh/thành phố'
         };
      }
   } catch (error: any) {
      logger.error(`Lỗi khi lấy thông tin tỉnh/thành phố: ${error.message}`);
      return {
         status: 500,
         message: 'Lỗi server'
      };
   }
}

const searchProvice = async (searchCriteria: Record<string, any>) => {
   try {
      const result = await Province.find(searchCriteria).lean<IProvince[]>();
      if (result && result.length > 0) {
         return {
            status: 200,
            message: 'Tìm kiếm thành công',
            data: result,
         };
      }
      return {
         status: 404,
         message: 'Không tìm thấy kết quả',
      };
   } catch (error: any) {
      logger.error(`Lỗi khi tìm kiếm tỉnh/thành phố: ${error.message}`);
      return {
         status: 500,
         message: 'Lỗi server',
      };
   }
};
export default {
   getAllProvinces,
   getProvinceById,
   searchProvice
}
