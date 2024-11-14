import { ICategory } from "../interfaces/category.interface";
import { model, Schema } from "mongoose"
import movieCategoryModel from "./movie-category.model";

const CategorySchema = new Schema<ICategory>({
   name: { type: String, unique: true, required: true, maxlength: 120 },
   description: { type: String, maxlength: 255 },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

CategorySchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
});

// Middleware xóa trước khi xóa thể loại và các liên kết liên quan
CategorySchema.pre('deleteOne', { document: true, query: false }, async function (next) {
   try {
      const categoryId = this._id;
      // 1. Xóa tất cả liên kết trong movieCategories (liên kết giữa phim và thể loại)
      await movieCategoryModel.deleteMany({ categoryId });
      // Tiến hành xóa thể loại sau khi xóa liên kết
      next();
   } catch (error: unknown) {
      // Nếu có lỗi thì trả lại lỗi để tiếp tục
      if (error instanceof Error) {
         next(error);
      } else {
         next(new Error('Có lỗi xảy ra khi xóa thể loại phim và các liên kết.'));
      }
   }
});
export default model<ICategory>("Category", CategorySchema)