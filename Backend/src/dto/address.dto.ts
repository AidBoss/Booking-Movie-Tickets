import { Document } from "mongoose";
// provinces 
export interface IProvince extends Document {
   Type: string,
   Code: string,
   Name: string,
   NameEn: string,
   FullName: string,
   FullNameEn: string,
   CodeName: string,
   AdministrativeUnitId: number,
   AdministrativeRegionId: number,
}

export interface IDistrict extends Document {
   Type: string,
   Code: string,
   Name: string,
   NameEn: string,
   FullName: string,
   FullNameEn: string,
   CodeName: string,
   ProvinceCode: string,
   AdministrativeUnitId: number,
}

export interface IWard extends Document {
   Type: string;
   Code: string;
   Name: string;
   NameEn: string;
   FullName: string;
   FullNameEn: string;
   CodeName: string;
   ProvinceCode: string;
   AdministrativeUnitId: number;
}

export interface IAddress<T> {
   status: number;
   message: string;
   data?: T[]
}