import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  roleList(): Observable<any> {
    return this.httpClient.get('/api/role/');
  }

  questionList(): Observable<any> {
    return this.httpClient.get('/api/user/question');
  }

  userRegister(data: any): Observable<any> {
    return this.httpClient.post('/api/user/signup', data);
  }
}
