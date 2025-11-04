import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sesion} from '../model/sesion';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private url = environment.apiURL;
  private http = inject(HttpClient);

  listhistorialporestudiante(id:number):Observable<Sesion[]> {
    return this.http.get<Sesion[]>(`${this.url}/sesion/historial/estudiante/${id}`);
  }

}
