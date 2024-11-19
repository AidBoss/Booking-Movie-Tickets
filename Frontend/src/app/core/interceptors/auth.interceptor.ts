import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './../services/api/auth.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('USER_TOKEN');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const tokenExpirationTime = decodedToken.exp;
      const timeRemaining = tokenExpirationTime - currentTime;
      // Kiểm tra nếu thời gian hết hạn còn dưới 10 phút
      if (timeRemaining < 10) { // 600 giây = 10 phút
        console.log('token hết hạn')
        // Nếu token hết hạn, làm mới token
        return this.authService.getNewAccessToken().pipe(
          switchMap((newToken: string) => {
            // Cập nhật Access Token và thử lại yêu cầu
            this.authService.saveTokenLocal(newToken);
            const retryRequest = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${newToken}`),
            });
            return next.handle(retryRequest);
          }),
          catchError((refreshError) => {
            // Nếu Refresh Token cũng hết hạn, đăng xuất
            this.authService.logout();
            return throwError(refreshError);
          })
        );
      }
      // Nếu token chưa hết hạn, tiếp tục yêu cầu bình thường
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(clonedRequest)
    }

    return next.handle(req);
  }
}
