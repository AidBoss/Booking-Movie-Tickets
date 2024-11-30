import { IUser } from '../dto/user.dto';
import { model, Schema } from "mongoose";

// Định nghĩa UserSchema
const UserSchema = new Schema<IUser>({
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   fullName: { type: String, required: true },
   phone: { type: String, required: false },
   roleId: { type: Schema.Types.ObjectId, ref: "Role", required: false },
   addressId: { type: Schema.Types.ObjectId, ref: "Address", required: false },
   status: { type: Boolean, default: true },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
});

// Export model
export default model<IUser>("User", UserSchema);
