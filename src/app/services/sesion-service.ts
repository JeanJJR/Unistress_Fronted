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

  listhistorialporestudiante(id:number) {
    console.log(this.url + '/sesion/historial/estudiante/'+ id)
    return this.httpClient.get<Sesion[]>(this.url + '/sesion/historial/estudiante/'+ id);
  }


}
