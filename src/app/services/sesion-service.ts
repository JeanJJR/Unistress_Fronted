import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
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
    return this.httpClient.put(this.url + '/sesion/aceptar/' + id, {},{ responseType: 'text' });
  }

//admin-sesion
  list(): Observable<any>{
    console.log(this.url + '/sesion')
    return this.httpClient.get<Sesion[]>(this.url + '/sesion')
  }
//admin-sesion
  delete(id: number){
    console.log(this.url + '/sesion/' + id);
    return this.httpClient.delete(this.url + '/sesion/' + id);
  }


  cancelarSesion(id: number, estudianteId: number): Observable<string> {
    const body = { estudianteId: estudianteId };
    return this.httpClient.delete(`${this.url}/sesion/cancelar/${id}`, {
      body: body,
      responseType: 'text'
    });
  }

  listarPorEstudianteyRango(id: number, fechaInicio: string, fechaFin: string): Observable<Sesion[]> {
    let params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);

    console.log(`${this.url}/sesion/estudiante/${id}`, params.toString());

    return this.httpClient.get<Sesion[]>(`${this.url}/sesion/estudiante/${id}`, { params });
  }


}
