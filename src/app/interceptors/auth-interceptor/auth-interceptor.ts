import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();
  console.log('[AuthInterceptor FN] interceptando', req.url, 'token?', !!token);

  if (req.url.includes('/auth')) {
    return next(req);
  }

  if (token && !auth.isTokenExpired(token)) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
     console.log('[AuthInterceptor FN] interceptando', req.url, 'token?', !!token);
    return next(cloned);
  }


  return next(req);
};
