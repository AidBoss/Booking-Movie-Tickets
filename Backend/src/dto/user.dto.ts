import {Document, Schema} from "mongoose";
export interface IUser extends Document {
   username: string;
   password: string;
   email: string;
   fullName: string;
   phone: string;
   roleId?: Schema.Types.ObjectId;
   addressId?: Schema.Types.ObjectId;
   status?: boolean;
   createdAt?: Date;
   updatedAt?: Date;
}

export interface IUserResponse {
   status: number;
   message: string;
   data?: IUser[];
   deleteCount?: number;
}
export interface IUserUpdate {
   fullName?: string;
   email?: string;
   password?: string;
   phone?: string;
   roleId?: Schema.Types.ObjectId;
   addressId?: Schema.Types.ObjectId;
   status?: string;
}