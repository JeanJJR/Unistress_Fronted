import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadisticaEmocion } from '../model/estadistica-emocional';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaEmocionalService {
  private url = `${environment.apiURL}/estadistica/promedio`;
  private http = inject(HttpClient);

}
