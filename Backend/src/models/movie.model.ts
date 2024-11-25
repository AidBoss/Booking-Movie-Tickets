import { model, Schema } from "mongoose";
import { IMovie } from "../dto/movie.dto";
import movieCategoryModel from "./movie-category.model";
import reviewModel from "./review.model";

const MovieSchema = new Schema<IMovie>({
   title: { type: String, required: true },
   description: { type: String },
   durantion: { type: Number, required: true },
   releaseDate: { type: Date, required: true },
   director: { type: String, required: true },
   studio: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
})

MovieSchema.pre('save', async function (next) {
   this.updatedAt = new Date();
   next();
})
// Middleware xóa trước khi xóa liên kết và đánh giá của bộ phim
MovieSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
   try {
      const movieId = this._id;
      // 1. Xóa tất cả liên kết trong movieCategories
      await movieCategoryModel.deleteMany({ movieId });
      // 2. Xóa tất cả các đánh giá của bộ phim
      await reviewModel.deleteMany({ movieId });
      // Tiếp tục sau khi xóa liên kết và đánh giá
      next();
   } catch (error: any) {
      // Nếu có lỗi thì trả lại lỗi để tiếp tục
      if (error instanceof Error) {
         next(error);
      } else {
         next(new Error('Có lỗi xảy ra khi xóa liên kết và đánh giá.'));
      }
   }
});


export default model<IMovie>("Movie", MovieSchema);   