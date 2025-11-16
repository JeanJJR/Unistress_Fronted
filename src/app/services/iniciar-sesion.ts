// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthRequest } from '../model/request';
import { AuthResponse } from '../model/response';
//import jwtDecode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private url = `${environment.apiURL}/authenticate`;

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<any>(this.url, credentials).pipe(
      map(response => {
        const token = response.jwt;
        const roles = response.roles;
        const id = response.id;

        // 🔧 Limpia cualquier token anterior
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');

        // 🔧 Guarda el nuevo token y datos
        localStorage.setItem('token', token);
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('userId', id.toString());

        return { id, jwt: token, roles } as AuthResponse;
      })
    );
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
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }
}
