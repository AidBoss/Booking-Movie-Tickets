import { Document, Types } from "mongoose";
export interface IMovieCategory extends Document {
   movieId: Types.ObjectId;
   categoryId: Types.ObjectId;
   createdAt?: Date;
   updatedAt?: Date;
}
export interface IMovieCategoryCreate {
   movieId: Types.ObjectId;
   categoryId: Types.ObjectId;
}
export interface IMovieCategoryResponse {
   status: number;
   message: string;
   data?: IMovieCategory[];
   movieCategory?: IMovieCategory;
   deletedCount?: number;
}