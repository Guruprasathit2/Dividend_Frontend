import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }
  
  userData(data: number): Observable<any> {
    return this.httpClient.get('/api/user/'+data);
  }

  updatedData(data: any): Observable<any> {
    return this.httpClient.put('/api/user/' + data.id, data);
  }

  logutDunction(data: any): Observable<any> {
    return this.httpClient.post('/api/user/logout', data);
  }

  imageDelete(user: any, obj: any): Observable<any> {
    return this.httpClient.put('/api/user/' + user.id, obj);
  }
}
