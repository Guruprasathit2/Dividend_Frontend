import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  userList(): Observable<any> {
    return this.httpClient.get('/api/user/list');
  }

  userData(id: number): Observable<any> {
    return this.httpClient.get('/api/user/data/' + id)
  }

  updatedDate(data: any): Observable<any> {
    return this.httpClient.put('/api/user/update/' + data.id, data)
  }

  roleList(): Observable<any> {
    return this.httpClient.get('/api/role/');
  }
}
