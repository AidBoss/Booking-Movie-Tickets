import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {apiEndPoint} from "../../constants/constant";
import {api_response} from "../../models/apiResponse";
import {User} from "../../models/user.model";
import {login_inter, register_inter} from "../../models/auth.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class authService {
  constructor(private http: HttpClient) {
  }

  login(data: login_inter): Observable<api_response<User>> {
    return this.http.post<api_response<User>>(`${apiEndPoint.Auth.login}`, data);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('USER_TOKEN');
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('USER_TOKEN');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.role === 'admin';
    }
    return false;
  }

  register(data: register_inter): Observable<api_response<User>> {
    return this.http.post<api_response<User>>(`${apiEndPoint.Auth.register}`, data);
  }

  logout(): void {
    localStorage.removeItem('USER_TOKEN');
  }
}
