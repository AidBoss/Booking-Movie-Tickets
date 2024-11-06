import { Document } from "mongoose";

export interface IMovie extends Document {
   _id: string;
   title: string;
   description: string;
   durantion: number;
   releaseDate: Date;
   createdAt?: Date;
   updatedAt?: Date;
}
export interface IMovieResponse {
   status: number;
   message: string;
   data?: IMovie[];
   movie?: IMovie;
}