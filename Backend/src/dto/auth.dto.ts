import { IUser } from "./user.dto";

export interface Ilogin {
   username: string;
   password: string;
}
export interface IloginResponse {
   status: number;
   message: string;
   data?: [{}];
   accessToken?: string;
   refreshToken?: {};
}
export interface IRegister {
   fullName: string;
   username: string;
   password: string;
   email: string;
}
export interface IRegisterResponse {
   status: number;
   message: string;
   user?: IUser;
}