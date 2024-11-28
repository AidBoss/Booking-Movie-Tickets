import { Document, Types } from "mongoose";
export interface IReview extends Document {
   userId: Types.ObjectId;
   movieId: Types.ObjectId;
   rating: number;
   comment: string;
   createdAt?: Date;
   updatedAt?: Date;
}
export interface IReviewCreate {
   userId: Types.ObjectId;
   movieId: Types.ObjectId;
   rating: number;
   comment: string;
}
export interface IReviewResponse {
   status: number;
   message: string;
   data?: IReview[];
   review?: IReview;
   deletedCount?: number;
}