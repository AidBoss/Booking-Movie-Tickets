import { Document } from "mongoose";

export interface IMovie extends Document {
   title: string;
   description: string;
   duration: number;
   genre: string;
   durantion: number;
   releaseDate: Date;
   createdAt?: Date;
   updatedAt?: Date;
}

export interface IMovieCreate {
   title: string;
   description: string;
   duration: number;
   genre: string;
   releaseDate: Date;
}

export interface IMovieResponse {
   status: number;
   message: string;
   data?: IMovie[];
   movie?: IMovie;
   deletedCount?: number;
}
