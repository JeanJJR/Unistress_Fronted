import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestEmocional } from '../model/test-emocional';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestEmocionalService {

  private url = `${environment.apiURL}/test`;

  private http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  resolver(test: TestEmocional): Observable<TestEmocional> {
    return this.http.post<TestEmocional>(`${this.url}/resolver`, test, {
      headers: this.getHeaders(),
      withCredentials: true
    });
  }
}
