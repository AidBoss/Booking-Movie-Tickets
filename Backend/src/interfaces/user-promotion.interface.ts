import { Document } from "mongoose";

export interface IUserPromotion extends Document {
   userId: string;
   promotionId: string;
   usageDate: Date;
   createdAt?: Date;
   updatedAt?: Date;
}

export interface IUserPromotionCreate {
   userId: string;
   promotionId: string;
   usageDate: Date;
}

export interface IUserPromotionResponse {
   status: number;
   message: string;
   data?: IUserPromotion[];
   userPromotion?: IUserPromotion;
   deletedCount?: number;
}
