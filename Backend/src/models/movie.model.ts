import { model, Schema } from "mongoose";
import { IMovie } from "../interfaces/movie.interface";

const MovieSchema = new Schema<IMovie>({
   title: { type: String, required: true },
   description: { type: String, required: true },
   durantion: { type: Number, required: true },
   releaseDate: { type: Date, required: true },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
})

MovieSchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
})
export default model<IMovie>("Movie", MovieSchema);   