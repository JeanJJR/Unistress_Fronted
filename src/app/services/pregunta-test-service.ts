import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreguntaTest } from '../model/pregunta-test';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreguntaTestService {
  private url = `${environment.apiURL}/pregunta-test`;
  private http = inject(HttpClient);


}
