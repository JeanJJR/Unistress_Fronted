// src/app/services/admin.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfilDetalle } from '../model/perfil-detalle';
import { environment } from '../../environments/environment';
import {Estudiante} from '../model/estudiante';
import {Psicologo} from '../model/psicologo';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);
  private usuarioUrl = `${environment.apiURL}/usuario`;
  private perfilUrl = `${environment.apiURL}/perfil`;

  //  LISTAR
  listarEstudiantes(): Observable<PerfilDetalle[]> {
    return this.http.get<PerfilDetalle[]>(`${this.usuarioUrl}/estudiantes`);
  }

  listarPsicologos(): Observable<PerfilDetalle[]> {
    return this.http.get<PerfilDetalle[]>(`${this.usuarioUrl}/psicologos`);
  }


  //  CREAR (delegado como en tus servicios funcionales)
  //registrarEstudiante(estudiante: Estudiante): Observable<any> {
   // return this.http.post(`${this.usuarioUrl}/estudiante`, estudiante, { responseType: 'text' });
  //}
  registrarEstudiante(estudiante: Estudiante): Observable<any> {
    return this.http.post(`${this.usuarioUrl}/estudiante`, estudiante, { responseType: 'text' });
  }


  registrarPsicologo(psicologo: Psicologo): Observable<any> {
    return this.http.post(`${this.usuarioUrl}/psicologo`, psicologo, { responseType: 'text' });
  }

  //ACTUALIZAR PERFIL
  actualizarPerfil(id: number, perfil: PerfilDetalle): Observable<any> {
    return this.http.put(`${this.perfilUrl}/perfilusuario/${id}`, perfil, { responseType: 'text' });
  }

  //  ELIMINAR
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.usuarioUrl}/${id}`, { responseType: 'text' });
  }

  eliminarPerfil(id: number): Observable<any> {
    return this.http.delete(`${this.perfilUrl}/${id}`, { responseType: 'text' });
  }
}
