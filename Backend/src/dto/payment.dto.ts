import {Document, Types} from "mongoose";

export interface IPayment extends Document {
    ticketId: Types.ObjectId;
    userId: Types.ObjectId;
    amount: number;
    paymentMethod: string;
    paymentDate: Date;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPaymentResponse {
    status: number;
    message: string;
    data?: IPayment[];
    payment?: IPayment;
    deletedCount?: number;
}