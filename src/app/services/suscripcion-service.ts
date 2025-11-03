import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Suscripcion } from '../model/suscripcion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {
  private url = environment.apiURL;
  private http = inject(HttpClient);

  obtenerSuscripcionPorUsuarioId(usuarioId: number): Observable<Suscripcion | null> {
    return this.http.get<Suscripcion[]>(`${this.url}/suscripcion/usuario/${usuarioId}`).pipe(
      map(suscripciones => suscripciones.length > 0 ? suscripciones[0] : null)
    );
  }
}


