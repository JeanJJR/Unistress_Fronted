import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recomendacion } from '../model/recomendacion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {
  private url = environment.apiURL;
  private http = inject(HttpClient);

  crearRecomendacion(recomendacion: any) {
    console.log(this.url+ '/recomendacion');
    return this.http.post(this.url + '/recomendacion', recomendacion, { responseType: 'text' });
  }

  listarPorPsicologo(id: number) {
    return this.http.get<Recomendacion[]>(this.url + '/recomendacion/psicologo/' + id);
  }

  listarRecomendacionesPorUsuarios(id: number) {
    console.log(this.url + '/recomendacion/usuario/'+id)
    return this.http.get<Recomendacion[]>(this.url + '/recomendacion/usuario/'+id);
  }
}
