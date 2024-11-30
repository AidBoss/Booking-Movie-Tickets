import {Document} from "mongoose";
export interface IRole extends Document{
    name:string;
    description:string;
    createdAt?: Date;
    updatedAt?: Date;
}