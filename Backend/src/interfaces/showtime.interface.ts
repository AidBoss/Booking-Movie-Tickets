import { Document, Types } from "mongoose";

export interface IShowtime extends Document {
   movieId: Types.ObjectId;
   screenId: Types.ObjectId;
   startTime: Date;
   endTime: Date;
   createdAt?: Date;
   updatedAt?: Date;
}

export interface IShowtimeCreate {
   movieId: Types.ObjectId;
   screenId: Types.ObjectId;
   startTime: Date;
   endTime: Date;
}

export interface IShowtimeResponse {
   status: number;
   message: string;
   data?: IShowtime[];
   showtime?: IShowtime;
   deletedCount?: number;
}
