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
  private httpClient = inject(HttpClient);

  listhistorialporestudiante(id:number):Observable<Sesion[]> {
    console.log(this.url + '/sesion/historial/estudiante/'+ id)
    return this.httpClient.get<Sesion[]>(this.url + '/sesion/historial/estudiante/'+ id);
  }

  crearsesion(sesion: any): Observable<Object> {
    console.log(this.url + '/sesion', sesion);
    return this.httpClient.post(this.url + '/sesion', sesion);
  }

  aceptarSesion(id: number): Observable<any> {
    console.log(this.url + '/sesion/aceptar/' + id,{});
    return this.httpClient.put(this.url + '/sesion/aceptar/' + id,{});
  }

  editarSesion(id: number, sesion: any): Observable<Sesion> {
    return this.httpClient.put<Sesion>(this.url + '/sesion/' + id, sesion);
  }

  cancelarSesion(id: number, estudianteId: number): Observable<string> {
    const body = { estudianteId: estudianteId };
    return this.httpClient.delete(`${this.url}/sesion/cancelar/${id}`, {
      body: body,
      responseType: 'text'
    });
  }
}
