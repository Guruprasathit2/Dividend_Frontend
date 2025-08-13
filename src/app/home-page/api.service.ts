import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  logutDunction(data: any): Observable<any> {
    return this.http.post('/api/user/logout', data);
  }

  userData(data: number): Observable<any> {
    return this.http.get('/api/user/'+data);
  }
}
