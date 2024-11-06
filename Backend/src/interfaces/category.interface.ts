import { Document } from 'mongoose';

export interface ICategory extends Document {
   _id: string;
   name: string;
   description?: string;
   createdAt?: Date;
   updatedAt?: Date;
}

export interface ICategoryResponse {
   status: number;
   message: string;
   data?: ICategory[];
   category: ICategory;
}