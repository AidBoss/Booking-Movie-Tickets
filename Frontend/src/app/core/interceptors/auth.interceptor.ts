import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './../services/api/auth.service';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {jwtDecode} from "jwt-decode";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.toLowerCase().includes('/auth')) {
      return next.handle(req);
    }
    const token = localStorage.getItem('USER_TOKEN');
    if (token) {
      try {
        let decodedToken: any = jwtDecode(token);
        const tokenExpirationTime = decodedToken.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = tokenExpirationTime - currentTime;
        console.log(`Thời gian còn lại: ${timeRemaining} giây`);

        if (timeRemaining > 90) {
          // Nếu token còn hạn, thêm token vào header
          const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
          });
          return next.handle(clonedRequest);
        }

      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    // Không có token hoặc không hợp lệ, tiếp tục request bình thường
    return next.handle(req);
  }
}
