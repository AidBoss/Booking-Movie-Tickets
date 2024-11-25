import { Schema, model, Types } from "mongoose";
import { ITicket } from "../dto/ticket.dto";

const TicketSchema = new Schema<ITicket>({
   showtimeId: {
      type: Schema.Types.ObjectId,
      ref: 'Showtime',
      required: true
   },
   seatId: {
      type: Schema.Types.ObjectId,
      ref: 'Seat',
      required: true
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   movieId: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
   },
   price: { type: Number, required: true },
   paymentStatus: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now }
});

TicketSchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
});

export default model<ITicket>("Ticket", TicketSchema);