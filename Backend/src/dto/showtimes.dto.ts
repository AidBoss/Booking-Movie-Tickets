import {Document, Schema} from "mongoose";

export interface IShowtimes extends Document {
    movieId: Schema.Types.ObjectId;
    screenId: Schema.Types.ObjectId;
    startTime: Date;
    endTime: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
