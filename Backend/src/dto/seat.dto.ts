import { Document, Types } from "mongoose";
export interface ISeat extends Document {
    screenId: Types.ObjectId;
    seatNumber: string;
    seatType: string;
    isAvailable: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ISeatCreate {
    screenId: Types.ObjectId;
    seatNumber: string;
    seatType: string;
    isAvailable: boolean;
}
export interface ISeatResponse {
    status: number;
    message: string;
    data?: ISeat[];
    seat?: ISeat;
    deletedCount?: number;
}