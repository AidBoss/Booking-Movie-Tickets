import {model, Schema} from "mongoose";
import {IAddress} from "../dto/address.dto";

// Định nghĩa Address Schema
const AddressSchema = new Schema<IAddress>({
    ProvinceCode: {type: String, required: false},  // Mã tỉnh/thành
    DistrictCode: {type: String, required: false}, // Mã quận/huyện
    WardCode: {type: String, required: false},
    StreetAddress: {type: String, required: true}, // Địa chỉ cụ thể (số nhà, tên đường)
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

AddressSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default model<IAddress>("Address", AddressSchema);
