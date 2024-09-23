import { Document } from "mongoose";
// Định nghĩa interface IUser
export interface IUser extends Document {
   username: string;
   password: string;
   email: string;
   fullname: string;
   phone: string;
   role: string;
   status: boolean;
   deleted: boolean;
   createdAt: Date;
   updatedAt: Date;
}