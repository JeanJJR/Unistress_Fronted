import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TendenciaEmocional } from '../model/tendencia-emocional';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TendenciaEmocionalService {
  private url = `${environment.apiURL}/estadistica/tendencia`;
  private http = inject(HttpClient);
}
