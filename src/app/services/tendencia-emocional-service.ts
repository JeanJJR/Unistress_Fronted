import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TendenciaEmocional } from '../model/tendencia-emocional';
import { environment } from '../../environments/environment';
import {EvolucionEmocion} from '../model/evolucion-emocion';

@Injectable({
  providedIn: 'root'
})
export class TendenciaEmocionalService {
  private url = `${environment.apiURL}/estadistica`;
  private http = inject(HttpClient);

  listarEvolucion(usuarioId: number, fechaInicio: string, fechaFin: string): Observable<EvolucionEmocion[]> {
    return this.http.get<EvolucionEmocion[]>(
      `${this.url}/evolucion-rango/${usuarioId}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
    );
  }
}

