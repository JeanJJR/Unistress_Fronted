// src/app/services/notificacion.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacion } from '../model/notificacion';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificacionService {
  private http = inject(HttpClient);
  private url = `${environment.apiURL}/notificacion`;

  listarPorUsuario(usuarioId: number): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.url}/usuario/${usuarioId}`);
  }

  marcarLeida(id: number): Observable<any> {
    return this.http.put(`${this.url}/leer/${id}`, {},{ responseType: 'text' });
    }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
