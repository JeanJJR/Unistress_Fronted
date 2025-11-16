// src/app/interceptor/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {AuthService} from '../services/iniciar-sesion';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // 🔧 No adjuntar token en el login o registro
  if (req.url.endsWith('/authenticate') || req.url.endsWith('/register')) {
    return next(req);
  }

  const token = authService.getToken();
  console.log("Token recuperado:", token);

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  return next(req);
};
