// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthRequest } from '../model/request';
import { AuthResponse } from '../model/response';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private url = `${environment.apiURL}/authenticate`;
  private tokenTimer: any;

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<any>(this.url, credentials).pipe(
      map(response => {
        const token = response.jwt;
        const roles = response.roles;
        const id = response.id;


        this.logout();


        localStorage.setItem('token', token);
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('userId', id.toString());


        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiration = payload.exp * 1000; // exp viene en segundos → ms
        localStorage.setItem('token_exp', expiration.toString());

        // Iniciar temporizador
        this.startTokenTimer(expiration);

        return { id, jwt: token, roles } as AuthResponse;
      })
    );
  }

  private startTokenTimer(expiration: number) {
    const now = Date.now();
    const timeout = expiration - now;

    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }

    if (timeout > 0) {
      this.tokenTimer = setTimeout(() => {
        this.logout();
        this.router.navigate(['/iniciar-sesion']);
      }, timeout);
    } else {
      // Si ya está vencido
      this.logout();
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  getUserRole(): string | null {
    const roles = this.getRoles();
    return roles.length > 0 ? roles[0] : null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const exp = localStorage.getItem('token_exp');
    if (!token || !exp) return false;
    return Date.now() < Number(exp);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('token_exp');
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
  }
}
