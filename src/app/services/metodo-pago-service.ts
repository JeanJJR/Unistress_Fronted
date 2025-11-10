import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetodoPago } from '../model/metodo-pago';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
  private url = `${environment.apiURL}/metodo-pago`;
  private http = inject(HttpClient);

}
