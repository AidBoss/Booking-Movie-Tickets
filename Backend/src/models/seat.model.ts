import { Schema, model, Types } from "mongoose";
import { ISeat } from "../dto/seat.dto";

const SeatSchema = new Schema<ISeat>({
   screenId: {
      type: Schema.Types.ObjectId,
      ref: 'Screen',
      required: true
   },
   seatNumber: { type: String, required: true },
   seatType: { type: String, required: true },
   isAvailable: { type: Boolean, default: true },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now }
});

SeatSchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
});

export default model<ISeat>("Seat", SeatSchema);