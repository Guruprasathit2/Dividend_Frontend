import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MstrApiService {
  private listApi = '/api/mstCompany/list';
  constructor(private http: HttpClient) { }

  companyList(): Observable<any> {
    return this.http.get<any[]>(this.listApi);
  }

  mstrList(data: any, limit: number, offset: number): Observable<any> {
    return this.http.get<any[]>(`/api/mstr/list?company=${data.company}&shortName=${data.shortName}&dividendYear=${data.year}&limit=${limit}&offset=${offset}&column=${data.column}&columnData=${data.columnData}`);
  }
}
