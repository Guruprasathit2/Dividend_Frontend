import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FormListApiService {

  constructor(private http: HttpClient) { }
  formListData(limit: number, offset: number, isActive: any, keyword: any):Observable<any> {
    const status = isActive ? isActive : undefined;
    return this.http.get<any[]>('/api/dividened/list?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword);
  }
}
