import { Document } from "mongoose";
// Định nghĩa interface IUser
export interface IUser extends Document {
   _id: string;
   username: string;
   password: string;
   email: string;
   fullname: string;
   phone: string;
   role?: string;
   status?: boolean;
   deleted?: boolean;
   createdAt?: Date;
   updatedAt?: Date;
}


export interface IUser extends Document {

}
export interface IUserResponse {
   status: number;
   message: string;
   data?: IUser[];
   user?: IUser;
}