import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EvolucionEmocion } from '../model/evolucion-emocion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvolucionEmocionalService {
  private url = `${environment.apiURL}/estadistica/evolucion`;
  private http = inject(HttpClient);

}
