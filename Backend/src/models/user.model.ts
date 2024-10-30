import { IUser } from './../interfaces/user.interface';
import { model, Schema } from "mongoose";

// Định nghĩa UserSchema
const UserSchema = new Schema<IUser>({
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   email: { type: String, required: true },
   fullname: { type: String, required: true },
   phone: { type: String, required: true },
   role: { type: String, default: "user" },
   status: { type: Boolean, default: true },
   deleted: { type: Boolean, default: false },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
});

// Export model
export default model<IUser>("User", UserSchema);
