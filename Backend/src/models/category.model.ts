import { ICategory } from "../interfaces/category.interface";
import { model, Schema } from "mongoose"

const CategorySchema = new Schema<ICategory>({
   name: { type: String, required: true },
   description: { type: String },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

CategorySchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
});
export default model<ICategory>("Category", CategorySchema)