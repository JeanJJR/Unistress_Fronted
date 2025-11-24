// src/app/interceptor/auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {AuthService} from '../services/iniciar-sesion';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 🔧 No adjuntar token en login o registro
  if (req.url.endsWith('/authenticate') || req.url.endsWith('/register')) {
    return next(req);
  }

  const token = authService.getToken();
  console.log("Token recuperado:", token);
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token vencido o inválido → cerrar sesión
        authService.logout();
        router.navigate(['/iniciar-sesion']);
      }
      return throwError(() => error);
    })
  );
};
