import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Psicologo } from '../model/psicologo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PsicologoService {
  private url = `${environment.apiURL}/usuario/psicologo`;
  private http = inject(HttpClient);

  registrar(psicologo: Psicologo): Observable<any> {
    return this.http.post(this.url, psicologo, { responseType: 'text' });
  }

  listar(): Observable<Psicologo[]> {
    return this.http.get<Psicologo[]>(this.url);
  }
}
