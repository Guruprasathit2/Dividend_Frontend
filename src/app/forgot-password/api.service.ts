import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  questionList(emailId: string): Observable<any> {
    return this.httpClient.get('/api/user/email/question/' + emailId);
  }

  forgotPass(data: any): Observable<any> {
    return this.httpClient.get(`/api/user/forgot/password?emailId=${data.emailId}&questionId=${data.questionId}&answer=${data.answer}`);
  }

  resetPassword(data: any): Observable<any> {
    return this.httpClient.put(`/api/user/reset/password`, data);
  }
}
