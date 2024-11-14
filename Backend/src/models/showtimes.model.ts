import { IShowtime } from "../interfaces/showtime.interface";
import { Schema, model, Types } from "mongoose";

// Khai báo schema cho Showtime
const ShowtimeSchema = new Schema<IShowtime>({
   movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',// Liên kết với bảng 'Movie'
      required: true
   },
   screenId: {
      type: Schema.Types.ObjectId,
      ref: 'Screen', // Liên kết với bảng 'Screen'
      required: true
   },
   startTime: { type: Date, required: true },
   endTime: { type: Date, required: true },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now }
});

// cập nhật trường `updatedAt` mỗi khi tài liệu được thay đổi
ShowtimeSchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
});

export default model<IShowtime>("Showtime", ShowtimeSchema);
