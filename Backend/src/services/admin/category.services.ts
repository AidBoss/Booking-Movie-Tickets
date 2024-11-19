import { ICategoryResponse, ICategoryCreate } from "../../interfaces/category.interface";
import Category from "../../models/category.model";
import mongoose from "mongoose";
import logger from "../../logs/log.errors";

// hàm check id 
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

const getAllCategory = async (): Promise<ICategoryResponse> => {
   try {
      const result = await Category.find();
      if (result && result.length > 0) {
         return {
            status: 200,
            message: 'Lấy danh sách thể loại phim thành công',
            data: result,
         };
      } else {
         return { status: 404, message: 'Không tìm thấy thể loại phim' };
      }
   } catch (error: any) {
      logger.error(`Lỗi khi lấy danh sách thể loại phim: ${error.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
};

const getCategoryById = async (categoryId: string): Promise<ICategoryResponse> => {
   if (!isValidObjectId(categoryId)) {
      return {
         status: 400,
         message: 'ID không hợp lệ'
      };
   }
   try {

      const result = await Category.findById(categoryId);
      if (result) {
         return {
            status: 200,
            message: 'Lấy thể loại phim theo ID thành công',
            data: [result],
         };
      } else {
         return { status: 404, message: 'Không tìm thấy thể loại phim' };
      }
   } catch (e: any) {
      logger.error(`Lỗi khi lấy thể loại phim theo ID: ${e.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
};

const createCategory = async (cate: ICategoryCreate): Promise<ICategoryResponse> => {
   const { name, description } = cate;
   try {
      // Kiểm tra xem thể loại đã tồn tại chưa
      const cateName = await Category.findOne({ name }).lean();
      if (cateName) {
         return {
            status: 400,
            message: 'Thể loại phim đã tồn tại',
         };
      }
      // Tạo mới thể loại
      const newCate = new Category({ name, description });
      const savedCate = await newCate.save();
      return {
         status: 200,
         message: 'Tạo thể loại phim thành công',
         data: [savedCate],
      };
   } catch (error: any) {
      logger.error(`Lỗi khi tạo thể loại phim: ${error.message}`);
      // Kiểm tra lỗi validation
      if (error.name === 'ValidationError') {
         const errorMessages = Object.values(error.errors).map((err: any) => err.message);
         return {
            status: 400,
            // Kết hợp các thông báo lỗi
            message: errorMessages.join(', '),
         };
      }
      return { status: 500, message: 'Lỗi server' };
   }
};


const updateCategory = async (id: string, cate: ICategoryCreate): Promise<ICategoryResponse> => {
   const { name, description } = cate;
   if (!isValidObjectId(id)) {
      return {
         status: 400,
         message: 'ID không hợp lệ'
      };
   }
   try {
      const cateName = await Category.findOne({ name }).lean();
      let result;
      if (cateName) {
         result = await Category.findByIdAndUpdate(id, { description }, { new: true });
      } else {
         result = await Category.findByIdAndUpdate(id, cate, { new: true });
      }
      if (result) {
         return {
            status: 200,
            message: 'Cập nhật thể loại phim thành công',
            data: [result],
         };
      } else {
         return { status: 404, message: 'Không tìm thấy thể loại phim để cập nhật' };
      }
   } catch (e: any) {
      logger.error(`Lỗi khi cập nhật thể loại phim: ${e.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
};

const deleteCategoryById = async (id: string): Promise<ICategoryResponse> => {
   if (!isValidObjectId(id)) {
      return {
         status: 400,
         message: 'ID không hợp lệ'
      };
   }
   try {
      // xóa các liên kết giữa thể loại và phim
      // await movieCategory.deleteMany({ categoryId: id });
      //  xóa thể loại
      const result = await Category.findByIdAndDelete(id);
      if (result) {
         return {
            status: 200,
            message: 'Xóa thể loại phim thành công',
         };
      } else {
         return { status: 404, message: 'Không tìm thấy thể loại phim để xóa' };
      }
   } catch (e: any) {
      logger.error(`Lỗi khi xóa thể loại phim: ${e.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
};

const deleteCategoryAll = async (ids: string[]): Promise<ICategoryResponse> => {
   if (!ids || ids.length === 0) {
      return {
         status: 400,
         message: 'ID không hợp lệ'
      };
   }
   try {
      const result = await Category.deleteMany({ _id: { $in: ids } });
      return {
         status: 200,
         message: 'Xóa tất cả thể loại phim thành công',
         deletedCount: result.deletedCount,
      };
   } catch (e: any) {
      logger.error(`Lỗi khi xóa tất cả thể loại phim: ${e.message}`);
      return { status: 500, message: 'Lỗi server' };
   }
};

export default {
   getAllCategory,
   getCategoryById,
   createCategory,
   updateCategory,
   deleteCategoryById,
   deleteCategoryAll
};
