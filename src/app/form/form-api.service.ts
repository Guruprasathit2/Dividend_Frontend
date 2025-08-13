import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  private apiUrl = '/api/dividened/create';
  private companyUrl = '/api/mstCompany/list';

  constructor(private http: HttpClient) { }

  saveForm(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getList(): Observable<any> {
    return this.http.get<any[]>(this.companyUrl);
  }

  editForm(number: number): Observable<any> {
      return this.http.get<any>('/api/dividened/list?id=' + number);
  }

  updatedForm(seqno: number, data: any): Observable<any> {
    return this.http.put<any[]>('/api/dividened/' + seqno, data);
  }

 
}
