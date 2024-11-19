import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from "../../constants/constant";
import { IUser, User } from '../../models/user.model';

import { api_response } from "../../models/apiResponse";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<api_response<User>> {
    return this.http.get<api_response<User>>(`${apiEndPoint.Admin.listUser}`);
  }

  getUserById(id: string): Observable<api_response<User>> {
    return this.http.get<api_response<User>>(`${apiEndPoint.Admin.getUserById.replace(':id', id)}`);
  }
  lockUser(data: IUser): Observable<api_response<User>> {
    return this.http.patch<api_response<User>>(`${apiEndPoint.Admin.lockUser.replace(':id', data._id)}`, data);
  }
  deleteUserById(id: string): Observable<api_response<User>> {
    return this.http.delete<any>(`${apiEndPoint.Admin.deleteUserById.replace(':id', id)}`);
  }
  // updateUser(id: string, data: User)
}
