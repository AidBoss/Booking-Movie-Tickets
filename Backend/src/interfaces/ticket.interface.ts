import { Document, Types } from "mongoose";

export interface ITicket extends Document {
   showtimeId: Types.ObjectId;
   userId: Types.ObjectId;
   seatId: Types.ObjectId;
   movieId: Types.ObjectId;
   price: number;
   paymentStatus: string;
   createdAt?: Date;
   updatedAt?: Date;
}

export interface ITicketCreate {
   showtimeId: string;
   userId: Types.ObjectId;
   seatId: Types.ObjectId;
   movieId: Types.ObjectId;
   price: number;
   paymentStatus: string;
}

export interface ITicketResponse {
   status: number;
   message: string;
   data?: ITicket[];
   ticket?: ITicket;
   deletedCount?: number;
}
