// src/app/services/pago-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../model/pago';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private apiUrl = 'http://localhost:8080/api/pago';

  constructor(private http: HttpClient) {}

  // listar pagos de una suscripción
  listarPorSuscripcion(suscripcionId: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/suscripcion/${suscripcionId}`);
  }

  // registrar pago
  registrar(pago: Pago): Observable<string> {
    return this.http.post(this.apiUrl, pago, { responseType: 'text' });
  }

  // (opcional) listar todos
  listar(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }
}
