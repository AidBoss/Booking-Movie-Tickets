import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../../constants/constant';
import { api_response } from '../../models/apiResponse';
import { User } from '../../models/user.model';
import { login_inter, register_inter } from '../../models/auth.model';
import { Observable, tap, catchError } from 'rxjs';
import { IndexedDbService } from '../indexeddb/indexed-db.service';
import { of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private indexedDb: IndexedDbService) { }

  login(data: login_inter): Observable<api_response<User>> {
    return this.http.post<api_response<User>>(`${apiEndPoint.Auth.login}`, data, { withCredentials: true }).pipe(
      tap((response) => {
        if (response.accessToken) {
          const refreshToken = Cookies.get('refreshToken');
          if (refreshToken) {
            try {
              // Loại bỏ tiền tố "j:" trước khi parse
              const cleanedToken = refreshToken.startsWith('j:') ? refreshToken.slice(2) : refreshToken;
              const parsedToken = JSON.parse(cleanedToken);
              // Truy cập các giá trị
              const key = parsedToken.key;
              const token = parsedToken.token;
              const expiresAt = parsedToken.expiresAt;
              this.indexedDb.saveToken(key, token, expiresAt);
            } catch (error) {
              console.error('Error parsing refreshToken:', error);
            }
          } else {
            console.error('refreshToken not found!');
          }
          // this.indexedDb.saveToken(response.accessToken)
          this.saveTokenLocal(response.accessToken);
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('USER_TOKEN');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return of(decodedToken.exp > currentTime);  // Trả về Observable<boolean>
      } catch (error) {
        console.error('Invalid token:', error);
        return of(false);  // Trả về Observable<boolean>
      }
    }
    return of(false);  // Trả về Observable<boolean>
  }

  isAdmin(): Observable<boolean> {
    const token = localStorage.getItem('USER_TOKEN');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return of(decodedToken.role === 'admin');  // Trả về Observable<boolean>
      } catch (error) {
        console.error('Invalid token:', error);
        return of(false);  // Trả về Observable<boolean>
      }
    }
    return of(false);  // Trả về Observable<boolean>
  }

  saveTokenLocal(token: string): void {
    if (token) {
      localStorage.setItem('USER_TOKEN', token);
    }
  }
  getTokenLocal(): string | null {
    return localStorage.getItem('USER_TOKEN');
  }
  register(data: register_inter): Observable<api_response<User>> {
    return this.http.post<api_response<User>>(`${apiEndPoint.Auth.register}`, data).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        throw error;
      })
    );
  }

  async logout(): Promise<void> {
    localStorage.removeItem('USER_TOKEN');
    // await this.indexedDb.deleteToken('accessToken');
  }

  getNewAccessToken(): Observable<string> {
    return new Observable((observer) => {
      // Lấy Refresh Token từ IndexedDB
      this.indexedDb.getToken('refreshToken').then((storedToken: any) => {
        if (!storedToken || !storedToken.token) {
          observer.error('Refresh Token không tồn tại.');
          return;
        }
        const refreshToken = storedToken.token;
        // Gửi yêu cầu tới endpoint để lấy Access Token mới
        this.http.post<{ accessToken: string }>(`${apiEndPoint.Auth.refreshToken}`, { refreshToken })
          .subscribe({
            next: (response) => {
              // Trả về Access Token mới
              observer.next(response.accessToken);
              observer.complete();
            },
            error: (error) => observer.error(error),
          });
      }).catch((err) => observer.error(err));
    });
  }
  refreshToken(): Observable<api_response<{ accessToken: string }>> {
    return this.http.post<api_response<{ accessToken: string }>>(`${apiEndPoint.Auth.refreshToken}`, {}).pipe(
      tap((response) => {
        if (response.accessToken) {
          this.saveTokenLocal(response.accessToken);
        }
      }),
      catchError((error) => {
        console.error('Token refresh failed:', error);
        throw error;
      })
    );
  }
}
