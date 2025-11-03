// src/app/services/perfil.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfilDetalle } from '../model/perfil-detalle';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilDetalleService {
  private url = environment.apiURL;
  private http = inject(HttpClient);

  // Obtener perfil por ID de usuario
  obtenerPerfilPorId(usuarioId: number): Observable<PerfilDetalle> {
    return this.http.get<PerfilDetalle>(`${this.url}/perfil/perfilusuario/${usuarioId}`);
  }
  actualizarPerfil(usuarioId: number, perfil: PerfilDetalle): Observable<any> {
    return this.http.put(
      `${this.url}/perfil/perfilusuario/${usuarioId}`,
      perfil,
      { responseType: 'text' }
    );
  }
  // perfil.service.ts
  actualizarFoto(usuarioId: number, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);

    return this.http.post(`${this.url}/perfil/perfilusuario/${usuarioId}/foto`, formData, {
      responseType: 'text'
    });
  }


}
