import mongoose, { Schema, Document } from 'mongoose';

interface IRefreshToken extends Document {
   userId: mongoose.Types.ObjectId; // ID của người dùng
   // Refresh Token
   token: string;
   // Thời gian hết hạn của token
   expiresAt: Date;
   createdAt: Date;
   updatedAt: Date;
}

const RefreshTokenSchema: Schema = new Schema<IRefreshToken>({
   userId: {
      type: Schema.Types.ObjectId,
      // Liên kết với bảng User
      ref: 'User',
      required: true,
   },
   token: {
      type: String,
      required: true,
   },
   expiresAt: {
      type: Date,
      required: true,
   },
}, {
   // Tự động thêm createdAt và updatedAt
   timestamps: true,
});
// Tự động xóa khi hết hạn
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
