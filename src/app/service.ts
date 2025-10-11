import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GblApiService {
    constructor(private httpClient: HttpClient) { }

    questionList(ids: string): Observable<any> {
        return this.httpClient.get('/api/user/question?quesId=' + ids)
    }
    
    defaultQuestion(): Observable<any> {
        return this.httpClient.get('/api/user/question')
    }
}
