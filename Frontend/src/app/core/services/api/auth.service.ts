import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {apiEndPoint} from '../../constants/constant';
import {api_response} from '../../models/apiResponse';
import {User} from '../../models/user.model';
import {login_inter, register_inter} from '../../models/auth.model';
import {Observable, tap, catchError, of, throwError, map, switchMap} from 'rxjs';
import {IndexedDbService} from '../indexeddb/indexed-db.service';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import {tokensServiceLocalStorage} from "../localStore/tokens.localStore.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private indexedDb: IndexedDbService, private tokenStorage: tokensServiceLocalStorage) {
  }

  login(data: login_inter): Observable<api_response<User>> {
    return this.http.post<api_response<User>>(`${apiEndPoint.Auth.login}`, data, {withCredentials: true}).pipe(
      tap(response => {
        if (response.accessToken) {
          this.tokenStorage.setATokenLocalStore(response.accessToken);
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    const refreshToken = this.getReTokenToCookie();
    const token = this.tokenStorage.getATokenLocalStore();
    if (token) {
      try {
        let decodedToken: any = jwtDecode(token);
        const tokenExpirationTime = decodedToken.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = tokenExpirationTime - currentTime;
        if (timeRemaining < 90) {
          if (refreshToken) {
            return this.getAccessToken().pipe(
              switchMap((response: any) => {
                if (response.accessToken) {
                  // Cập nhật token mới
                  const newToken = response.accessToken;
                  this.tokenStorage.setATokenLocalStore(newToken);
                  return of(true);
                }
                return of(false);
              })
            )
          }
        }
        return of(true);
      } catch (error) {
        console.error('Invalid token:', error);
        return of(false);
      }
    } else if (refreshToken) {
      return this.getAccessToken().pipe(
        switchMap((response: any) => {
          if (response.accessToken) {
            // Cập nhật token mới
            const newToken = response.accessToken;
            this.tokenStorage.setATokenLocalStore(newToken);
            return of(true);
          }
          return of(false);
        })
      )
    } else return of(false);
  }

  isAdmin(): Observable<boolean> {
    const token = this.tokenStorage.getATokenLocalStore();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return of(decodedToken.role === 'admin');
      } catch (error) {
        console.error('Invalid token:', error);
        return of(false);
      }
    }
    return of(false);
  }

  register(data: register_inter): Observable<api_response<User>> {
    return this.http.post<api_response<User>>(`${apiEndPoint.Auth.register}`, data).pipe(
      catchError(error => {
        console.error('Registration failed:', error);
        throw error;
      })
    );
  }

  async logout(): Promise<void> {
    localStorage.removeItem('USER_TOKEN');
  }

  getReTokenToCookie(): any {
    const refreshToken = Cookies.get('refreshToken');
    try {
      if (refreshToken) {
        const cleanedToken = refreshToken.startsWith('j:') ? refreshToken.slice(2) : refreshToken;
        const parsedToken = JSON.parse(cleanedToken);
        return parsedToken.token || null;
      }
      console.log("Không tìm thấy refresh token : ")
      return null;
    } catch (error) {
      console.error('Lỗi chuyển đổi tokens:', error);
      return null;
    }
  }

  getAccessToken(): Observable<any> {
    const refreshToken = this.getReTokenToCookie();
    return this.http.post<api_response<any>>(`${apiEndPoint.Auth.refreshToken}`, {refreshToken}).pipe(
      tap((response) => {
        if (response.accessToken) {
          this.tokenStorage.setATokenLocalStore(response.accessToken);
        }
      }),
      catchError((error) => {
        console.error('Token refresh failed:', error);
        return throwError(error);
      })
    );
  }

}
