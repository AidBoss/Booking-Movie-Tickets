import { Schema, model, Types } from "mongoose";
import { IMovieCategory } from "../dto/movie-category.dto";

const MovieCategorySchema = new Schema<IMovieCategory>({
   movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
   },
   categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
   },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now }
});
// Middleware xóa các bản ghi liên quan khi xóa thể loại
// MovieCategorySchema.pre('deleteMany', async function (next) {
//    if (this.getQuery().categoryId) {
//       const categoryId = this.getQuery().categoryId;
//       // Xóa các bản ghi liên quan trong MovieCategory khi categoryId bị xóa
//       await model("MovieCategory").deleteMany({ categoryId });
//    }
//    next();

// });
MovieCategorySchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
});

export default model<IMovieCategory>("MovieCategory", MovieCategorySchema);