import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestEmocional } from '../model/test-emocional';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestEmocionalService {
  private url = `${environment.apiURL}/test-emocional`;
  private http = inject(HttpClient);
}
