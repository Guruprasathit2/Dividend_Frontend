import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrokApiService {
  private listApi = '/api/issue/company-list';
  constructor(private http: HttpClient) { }

  mainData(data: number): Observable<any> {
    return this.http.get('/api/issue/data?issueCode=' + data);
  }
  comList(): Observable<any> {
    return this.http.get<any[]>(this.listApi);
  }

  brokList(data: any): Observable<any> {
    return this.http.post<any[]>('/api/issue/broklist', data);
  }

  formList(data: any): Observable<any> {
    return this.http.get<any[]>('/api/issue/list?issueCode=' + data.companyId + '&bidFileDate=' + data.issueClosingDate + '&bankQib=' + data.bankQib + '&bank_NII_upto_ten=' + data.bank_NII_upto_ten
      + '&bank_NII_above_ten=' + data.bank_NII_above_ten + '&bank_retail=' + data.bank_retail + '&anchorInvestor=' + data.anchorInvestor + '&memberQib=' + data.mamberQib
      + '&member_NII_upto_ten=' + data.member_NII_upto_ten + '&member_NII_above_ten=' + data.member_NII_above_ten + '&memberRetail=' + data.memberRetail + '&uptoTenLack=' + data.uptoTenLack
      + '&regdRetail=' + data.regdRetail + '&non_upi_max_scsb=' + data.non_upi_max_scsb + '&non_upi_application=' + data.non_upi_application + '&member_asba=' + data.member_asba + '&dir_syndi_asba=' + data.dir_syndi_asba
      + '&processFeesApplication=' + data.processFeesApplication + '&ratePerApplication=' + data.ratePerApplication + '&bidMaxProcessChrg=' + data.bidMaxProcessChrg + '&bidUpiApplication=' + data.bidUpiApplication
      + '&bidMemberAsba=' + data.bidMemberAsba + '&bid_syndi_asba=' + data.bid_syndi_asba + '&sellingCommision=' + data.sellingCommision
    );
  }

  excelList(data: any): Observable<any> {
    return this.http.get('/api/issue/list?issueCode=' + data.companyId + '&sellingCommision=' + data.sellingCommision, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  allExcel(data: any): Observable<any> {
    return this.http.get(`/api/issue/excel?sellingCommision=All&issueCode=${data.companyId}`, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  filter(data: any): Observable<any> {
    const cleanedData = cleanQueryParams(data);
    const queryString = buildQueryString(cleanedData);
    return this.http.get(`/api/issue/filter?${queryString}`);
  }
}

function cleanQueryParams(data: any): { [key: string]: any } {
  const query: { [key: string]: any } = {};
  for (const key in data) {
    const value = data[key];
    if (value !== undefined && value !== null && value !== '' && String(value).trim() !== '') {
      query[key] = typeof value === 'string' ? value.trim() : value;
    }
  }
  return query;
}
function buildQueryString(params: { [key: string]: any }): string {
  return Object.entries(params)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&');
}
