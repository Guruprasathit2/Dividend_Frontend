import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  constructor(private httpClient: HttpClient) { }

  loginPage(data: any) {
    return this.httpClient.post('/api/user/login/', data);
  }

  logutDunction(data: any): Observable<any> {
    return this.httpClient.post('/api/user/logout', data);
  }
}
