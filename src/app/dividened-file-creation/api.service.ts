import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  company_list(): Observable<any> {
    return this.http.get<any[]>('/api/dividend-file/company-list');
  }

  dateCheck(data: any): Observable<any> {
    return this.http.get<any[]>('/api/dividend-file/date/check?isNsdl=' + data.isNsdl
    +'&isin=' + data.isin + '&nsdlDate=' + data.nsdlDate + '&cdslDate=' + data.cdslDate);
  }

  getData(data: any): Observable<any> {
    return this.http.get<any[]>(`api/dividend-file/list?shortName=${data.shortname}&nsdlDate=${data.nsdlDate}&cdslDate=${data.cdslDate}`);
  }

  bankList(): Observable<any> {
    return this.http.get<any[]>('api/dividend-file/bank-list')
  }

  createFile(data: any): Observable<any> {
    return this.http.post<any[]>('api/dividend-file/create', data);
  }

  generateFile(data: any): Observable<any> {
    return this.http.post<any[]>('api/dividend-file/generate', data);
  }
}
