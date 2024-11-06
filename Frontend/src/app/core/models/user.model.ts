export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  status: boolean;
  deleted: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
