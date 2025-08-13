import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListApiService {
  private listApi = '/api/mstCompany/list';
  constructor(private http: HttpClient) { }

  comList(): Observable<any> {
    return this.http.get<any[]>(this.listApi);
  }
}
