import { Document } from 'mongoose';

export interface ICategory extends Document {
   name: string;
   description?: string;
   createdAt?: Date;
   updatedAt?: Date;
}
// tách các trường ko dùng 
export interface ICategoryCreate {
   name: string;
   description?: string;
   createdAt?: Date;
   updatedAt?: Date;
}
export interface ICategoryResponse {
   status: number;
   message: string;
   data?: ICategory[];
   category?: ICategory;
   deletedCount?: number;
}