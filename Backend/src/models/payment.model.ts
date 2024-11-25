// models/payment.model.ts

import { Schema, model } from 'mongoose';
import { IPayment } from '../dto/payment.dto';

const PaymentSchema = new Schema<IPayment>({
   ticketId: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true },
   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   amount: { type: Number, required: true },
   paymentMethod: { type: String, required: true, enum: ['credit_card', 'e_wallet'], },
   paymentDate: { type: Date, required: true },
   status: { type: String, required: true, enum: ['successful', 'failed', 'processing'], },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

// Middleware để cập nhật thời gian cập nhật khi sửa thông tin thanh toán
PaymentSchema.pre('save', function (next) {
   this.updatedAt = new Date();
   next();
});

export default model<IPayment>('Payment', PaymentSchema);
