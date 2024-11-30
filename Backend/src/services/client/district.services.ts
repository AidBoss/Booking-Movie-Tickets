import mongoose from 'mongoose';
import logger from '../../logs/logger';
import { IAddressResponse, IDistrict } from '../../dto/address.dto';
import District from '../../models/district.model';
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

const getAllDistrict = async (): Promise<IAddressResponse<IDistrict>> => {
   try {
      const result = await District.find()
      if (result) {
         return {
            status: 200,
            message: "Lây danh sách quận/ huyện thành công",
            data: result as IDistrict[]
         }
      } else {
         return {
            status: 404,
            message: "Không tìm thấy danh sách quận/huyện"
         }
      }
   } catch (error: any) {
      logger.error('Error get all District', error.message);
      return {
         status: 500,
         message: "Lỗi server"
      }
   }
}

const getDistrictById = async (id: string) => {
   if (!isValidObjectId(id)) {
      return {
         status: 404,
         message: 'ID Không hợp lệ'
      }
   }
   try {
      const result = await District.findById(id).lean<IDistrict>();
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

const searchDistrict = async (searchCriteria: Record<string, any>) => {
   try {
      const result = await District.find(searchCriteria).lean<IDistrict[]>();
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
   getAllDistrict,
   getDistrictById,
   searchDistrict,
}