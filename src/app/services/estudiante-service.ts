import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../model/estudiante';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private url = `${environment.apiURL}/usuario/estudiante`;
  private http = inject(HttpClient);

  registrar(estudiante: Estudiante): Observable<any> {
    return this.http.post(this.url, estudiante, { responseType: 'text' });
  }

  listar(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.url);
  }
}
