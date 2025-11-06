import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Estadistica } from '../model/estadistica';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {
  private url = `${environment.apiURL}/estadisticas`;
  private http = inject(HttpClient);


}
