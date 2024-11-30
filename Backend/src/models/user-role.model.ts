import {Schema, model} from "mongoose";

const UserRoleSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    roleId: {type: Schema.Types.ObjectId, ref: "Role", required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});


UserRoleSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

// Export model
export default model("UserRole", UserRoleSchema)
