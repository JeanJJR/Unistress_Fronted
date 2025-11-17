// src/app/services/suscripcion-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suscripcion } from '../model/suscripcion';

@Injectable({ providedIn: 'root' })
export class SuscripcionService {

  private apiUrl = 'http://localhost:8080/api/suscripcion';

  constructor(private http: HttpClient) {}

  // ✅ lista de suscripciones de un usuario
  getPorUsuario(usuarioId: number): Observable<Suscripcion[]> {
    return this.http.get<Suscripcion[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  // ✅ alias para que funcione lo que usas en PerfilEstudianteComponent
  obtenerSuscripcionPorUsuarioId(usuarioId: number): Observable<Suscripcion[]> {
    return this.getPorUsuario(usuarioId);
  }

  // Actualizar (renovar / cancelar)
  actualizar(s: Suscripcion): Observable<string> {
    return this.http.put(`${this.apiUrl}`, s, { responseType: 'text' });
  }

  // Eliminar (si alguna vez lo usas)
  eliminar(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
