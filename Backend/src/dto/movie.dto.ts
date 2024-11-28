import { Document } from "mongoose";
export interface IMovie extends Document {
   title: string;
   description: string;
   duration: number;
   genre: string;
   director: string;
   durantion: number;
   studio: string;
   releaseDate: Date;
   createdAt?: Date;
   updatedAt?: Date;
}
export interface IMovieCreate {
   title: string;
   description: string;
   duration: number;
   genre: string;
   director: string;
   studio: string;
   releaseDate: Date;
}
export interface IMovieResponse {
   status: number;
   message: string;
   data?: IMovie[];
   deletedCount?: number;
}