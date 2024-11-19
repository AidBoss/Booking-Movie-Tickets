import { Document } from "mongoose";
export interface IUser extends Document {
   username: string;
   password: string;
   email: string;
   fullname: string;
   phone: string;
   role?: string;
   address: string,
   status?: boolean;
   deleted?: boolean;
   createdAt?: Date;
   updatedAt?: Date;
}

export interface IUserResponse {
   status: number;
   message: string;
   data?: IUser[];
}
export interface IUserUpdate {
   fullname?: string;
   email?: string;
   phone?: string;
   address?: string;
   role?: string;
   status?: string;
}