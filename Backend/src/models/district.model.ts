import {Schema, model} from "mongoose";

const districtSchema = new Schema({
    Type: {type: String, required: true},
    Code: {type: String, required: true},
    Name: {type: String, required: true},
    NameEn: {type: String, required: false},
    FullName: {type: String, required: false},
    FullNameEn: {type: String, required: false},
    CodeName: {type: String, required: true},
    ProvinceCode: {type: String, required: true},
    AdministrativeUnitId: {type: Number, required: false},
});

export default model('District', districtSchema);
