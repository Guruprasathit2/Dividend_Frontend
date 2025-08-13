import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  addRole(data: any): Observable<any> {
    return this.httpClient.post('/api/role/', data);
  }

  roleList(): Observable<any> {
    return this.httpClient.get('/api/role/');
  }

  roleUpdate(id: number, data: any): Observable<any> {
    return this.httpClient.put('/api/role/' + id, data);
  }

  roleDelete(id: number): Observable<any> {
    return this.httpClient.delete('/api/role/' + id);
  }
}
