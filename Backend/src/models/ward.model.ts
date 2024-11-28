import mongoose from 'mongoose';

const wardSchema = new mongoose.Schema({
   Type: { type: String, required: true },
   Code: { type: String, required: true },
   Name: { type: String, required: true },
   NameEn: { type: String, required: false },
   FullName: { type: String, required: false },
   FullNameEn: { type: String, required: false },
   CodeName: { type: String, required: true },
   DistrictCode: { type: String, required: true },
   AdministrativeUnitId: { type: Number, required: false },
});

const Ward = mongoose.model('Ward', wardSchema);
export default Ward;
