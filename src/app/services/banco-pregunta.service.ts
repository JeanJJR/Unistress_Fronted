import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BancoPregunta } from '../model/banco-pregunta';

@Injectable({
  providedIn: 'root'
})
export class BancoPreguntaService {
  private apiUrl = 'http://localhost:8080/api/banco';

  constructor(private http: HttpClient) {}

  // Método para obtener el token del localStorage
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // o sessionStorage.getItem('token')
    console.log('Token encontrado:', token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  // Obtener todas las preguntas
  listar(): Observable<BancoPregunta[]> {
    return this.http.get<BancoPregunta[]>(this.apiUrl, {
      headers: this.getHeaders(),
      withCredentials: true
    });
  }

  // Obtener pregunta por ID
  listarPorId(id: number): Observable<BancoPregunta> {
    return this.http.get<BancoPregunta>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
      withCredentials: true
    });
  }

  // Obtener preguntas por psicólogo
  listarPorPsicologo(psicologoId: number): Observable<BancoPregunta[]> {
    return this.http.get<BancoPregunta[]>(`${this.apiUrl}/psicologo/${psicologoId}`, {
      headers: this.getHeaders(),
      withCredentials: true
    });
  }

  // Crear nueva pregunta
  registrar(pregunta: BancoPregunta): Observable<string> {
    return this.http.post(this.apiUrl, pregunta, {
      headers: this.getHeaders(),
      responseType: 'text',
      withCredentials: true
    });
  }

  // Actualizar pregunta
  actualizar(id: number, pregunta: BancoPregunta): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}`, pregunta, {
      headers: this.getHeaders(),
      responseType: 'text',
      withCredentials: true
    });
  }

  // Eliminar pregunta
  eliminar(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
      responseType: 'text',
      withCredentials: true
    });
  }
}
