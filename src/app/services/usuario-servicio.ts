// src/app/services/usuario.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private url = `${environment.apiURL}/usuario`;

  listarEstudiantes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/estudiantes`);
  }
  listarpsicologos() :Observable<any>{
    console.log(this.url + '/psicologos')
    return this.http.get<Usuario[]>(this.url + '/psicologos');
  }
}
