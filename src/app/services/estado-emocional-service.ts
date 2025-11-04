// src/app/services/registro-emocional.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {RegistroEmocional} from '../model/estado-emocional';

@Injectable({
  providedIn: 'root'
})
export class RegistroEmocionalService {
  private url = `${environment.apiURL}/registro-emocional`;
  private http = inject(HttpClient);

  listarPorUsuario(usuarioId: number): Observable<RegistroEmocional[]> {
    return this.http.get<RegistroEmocional[]>(`${this.url}/usuario/${usuarioId}`);
  }

  registrar(registro: RegistroEmocional): Observable<any> {
    return this.http.post(`${this.url}`, registro, { responseType: 'text' });
  }
}
