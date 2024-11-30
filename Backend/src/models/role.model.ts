import  {model, Schema} from "mongoose";
// import {IRole} from "../dto/role.dto";

// Định nghĩa Role Schema
const RoleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

RoleSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Export model
export default model("Role", RoleSchema);
