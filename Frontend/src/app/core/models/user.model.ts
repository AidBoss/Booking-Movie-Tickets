export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  fullname: string;
  phone: string;
  role: string;
  address: string;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUser {
  _id: string;
  fullname?: string;
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: boolean;
  role?: string;
}