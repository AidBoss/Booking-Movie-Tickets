// IPromotion.interface.ts

import { Document } from "mongoose";

export interface IPromotion extends Document {
   code: string;
   description: string;
   discountPercentage: number;
   startDate: Date;
   endDate: Date;
   createdAt?: Date;
   updatedAt?: Date;
}

export interface IPromotionCreate {
   code: string;
   description: string;
   discountPercentage: number;
   startDate: Date;
   endDate: Date;
}

export interface IPromotionResponse {
   status: number;
   message: string;
   data?: IPromotion[];
   promotion?: IPromotion;
   deletedCount?: number;
}
