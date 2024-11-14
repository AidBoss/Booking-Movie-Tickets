import { Schema, model } from 'mongoose';
import { IScreen } from '../interfaces/screen.interface';

const ScreenSchema = new Schema<IScreen>({
   name: { type: String, required: true, maxlength: 120 },
   capacity: { type: Number, required: true, min: 1 },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

// Middleware để cập nhật thời gian cập nhật khi sửa phòng chiếu
ScreenSchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
});

export default model<IScreen>('Screen', ScreenSchema);
