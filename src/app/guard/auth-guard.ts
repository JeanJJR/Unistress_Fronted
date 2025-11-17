// src/app/guards/auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/iniciar-sesion';

@Injectable({ providedIn: 'root' })
class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/iniciar-sesion']);
      return false;
    }

    const expectedRole = route.data['role'];
    const userRole = this.authService.getUserRole();

    if (expectedRole && userRole !== expectedRole) {
      this.router.navigate(['/iniciar-sesion']);
      return false;
    }

    return true;
  }
}

export const AuthGuard: CanActivateFn = (route) => {
  return inject(AuthGuardService).canActivate(route);
};
