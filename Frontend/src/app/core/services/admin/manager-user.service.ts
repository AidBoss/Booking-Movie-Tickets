import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiEndPoint} from "../../constants/constant";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${apiEndPoint.Admin.listUser}`, {observe: 'response'});
  }

  getUserById(id: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${apiEndPoint.Admin.searchUser.replace(':id', id)}`, {observe: 'response'});
  }

  deleteUserById(data:any):Observable<HttpResponse<any>>{
    return this.http.patch<any>(`${apiEndPoint.Admin.deleteUser.replace(':id', data.id)}`, data);
  }

}
