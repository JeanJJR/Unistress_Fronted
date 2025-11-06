import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Psicologo } from '../model/psicologo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PsicologoService {
  private url = `${environment.apiURL}/usuario`;
  private http = inject(HttpClient);

  registrar(psicologo: Psicologo): Observable<any> {
    return this.http.post(`${this.url}/psicologo`, psicologo, { responseType: 'text' });
  }

}
