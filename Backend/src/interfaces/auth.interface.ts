import { IUser } from "./user.interface";

export interface Ilogin {
   username: string;
   password: string;
}
export interface IloginResponse {
   status: number;
   message: string;
   user?: IUser;
   accessToken?: string;
   refreshToken?: {};
}
export interface IRegister {
   fullname: string;
   username: string;
   password: string;
   email: string;
   phone: string;
   role: string;
}
export interface IRegisterResponse {
   status: number;
   message: string;
   user?: IUser;
}
