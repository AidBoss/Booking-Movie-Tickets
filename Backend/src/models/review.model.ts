import { Schema, model, Types } from "mongoose";
import { IReview } from "../dto/review.dto";

const ReviewSchema = new Schema<IReview>({
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
   },
   rating: { type: Number, required: true },
   comment: { type: String, maxlength: 500 },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now }
});

ReviewSchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
});

export default model<IReview>("Review", ReviewSchema);