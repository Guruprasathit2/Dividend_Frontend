import { Component, OnInit } from '@angular/core';
import { ListApiService } from './list-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dividend-list',
  templateUrl: './dividend-list.component.html',
  styleUrls: ['./dividend-list.component.css']
})
export class DividendListComponent implements OnInit {

  constructor(private listApiService: ListApiService, private toastrService: ToastrService) { }
  companyList: any[] = [];
  yearList: any[] = [];
  days: any[] = [];
  minDate: string = '';
  maxDate: string = '';
  yearFrom: string = '';
  yearTo: string = '';
  tax: string = '';
  filterObj: any = {
    company: '',
    dividendType: '',
    dividendYear: '',
    dividendDate: '',
    dividendBank: '',
  };

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = `${currentYear}-04-01`;
    this.maxDate = `${currentYear + 1}-03-31`;
    const startingYear = 2010;
    for (let i = startingYear; i <= currentYear; i++) {
      this.yearList.push(i);
    }
    const startingDay = 1;
    for (let i = startingDay; i <= 31; i++) {
      this.days.push(i);
    }
    this.cmpList();
  }

  cmpList() {
    return this.listApiService.comList().subscribe({
      next: (response) => {
        this.companyList = response.data;
      },
      error: (err) => {
        this.companyList = [];
        this.toastrService.error(err.error.message);
      }
    });
  }

  onYearChange() {
    const fromData = this.filterObj.financialYearFrom?.split('-')[0] || '';
    const toDate = this.filterObj.financialYearTo?.split('-')[0] || '';
    const as = fromData + '-' + toDate;
    this.filterObj.taxPeriod = as;
    this.tax = as;
  }

  exit() {
    this.tax = '';
    this.filterObj = {
      company: '',
      dividendType: '',
      dividendYear: '',
      dividendDate: '',
      dividendBank: '',
    };
  }

  show() {
    if (this.filterObj.financialYearFrom && !(this.filterObj.financialYearTo)) {
      return this.toastrService.error('Please select the Financial Year To.');
    } else if (!(this.filterObj.financialYearFrom) && this.filterObj.financialYearTo) {
      return this.toastrService.error('Please select Financial year from.');
    } else if (this.filterObj.dividendYear && !(this.filterObj.dividendDate)) {
      return this.toastrService.error('Please select the Dividend Date.');
    } else if (!(this.filterObj.dividendYear) && this.filterObj.dividendDate) {
      return this.toastrService.error('Please select the Dividend Year.');
    }
    return;
  }

}
