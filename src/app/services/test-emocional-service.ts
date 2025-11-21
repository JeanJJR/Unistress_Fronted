import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestEmocional } from '../model/test-emocional';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestEmocionalService {

  private url = `${environment.apiURL}/test`;

  private http = inject(HttpClient);



  resolver(test: TestEmocional): Observable<TestEmocional> {
    return this.http.post<TestEmocional>(`${this.url}/resolver`, test, {
      //headers: this.getHeaders(),
      //withCredentials: true
    });
  }
  obtenerPromedio(usuarioId: number): Observable<number> {
    return this.http.get<number>(`${this.url}/promedio/${usuarioId}`);
  }
}
