import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from "../../constants/constant";

import { api_response } from "../../models/apiResponse";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) { }

  getAllProviders(): Observable<any> {
    return this.http.get(`${apiEndPoint.Address.getAllProvinces}`);
  }
  getProvidersById(id:string): Observable<any> {
    return this.http.get(`${apiEndPoint.Address.getProvinceById.replace(':id', id)}`);
  }

  getAllDistricts(): Observable<any> {
    return this.http.get(`${apiEndPoint.Address.getAllDistricts}`);
  }
  getDistrictsById(id: string): Observable<any> {
    return this.http.get(`${apiEndPoint.Address.getDistrictById.replace(':id', id)}`);
  }
  getDistrictsByCodeProvince(code:string): Observable<any> {
    return this.http.get(`${apiEndPoint.Address.getDistrictsByCodeProvince+'?provinceCode='}${code}`);
  }
  getAllWards(): Observable<any> {
    return this.http.get(`${apiEndPoint.Address.getAllWards}`);
  }
  getWardsById(id: string): Observable<any> {
    return this.http.get(`${apiEndPoint.Address.getWardById.replace(':id', id)}`);
  }
  getWardByCodeDistrict(code:string): Observable<any> {
    return this.http.get(`${apiEndPoint.Address.getWardsByCodeDistrict+'?districtCode='}${code}`);
  }
}
