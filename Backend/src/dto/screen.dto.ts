import {Document} from "mongoose";

export interface IScreen extends Document {
    name: string;
    capacity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IScreenResponse {
    status: number;
    message: string;
    data?: IScreen[];
    screen?: IScreen;
    deletedCount?: number;
}