import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recomendacion } from '../model/recomendacion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {
  private url = `${environment.apiURL}/recomendacion`;
  private http = inject(HttpClient);
}
