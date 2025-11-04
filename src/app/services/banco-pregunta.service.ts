import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BancoPregunta } from '../model/banco-pregunta'; // ajusta según la carpeta correcta

@Injectable({ providedIn: 'root' })
export class BancoPreguntaService {
  constructor(private http: HttpClient) {}

  listar(): Observable<BancoPregunta[]> {
    return this.http.get<BancoPregunta[]>('tu-api-url');
  }

  registrar(pregunta: BancoPregunta): Observable<any> {
    return this.http.post('tu-api-url', pregunta);
  }
}
