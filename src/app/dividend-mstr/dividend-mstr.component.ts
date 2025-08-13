import { Component, OnInit } from '@angular/core';
import { MstrApiService } from './mstr-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dividend-mstr',
  templateUrl: './dividend-mstr.component.html',
  styleUrls: ['./dividend-mstr.component.css']
})
export class DividendMSTRComponent implements OnInit {

  constructor(private mstrApiService: MstrApiService, private toastr: ToastrService) { }
  companyListData: any[] = [];
  years: number[] = [];
  selectedYear: number | null = null;
  selectedCompany: string = '';
  shortName: string = '';
  selectRow: any = {};
  olderCompany: string = '';

  listData: any = [];
  apiResponseData: any = [];

  currentPage = 1;
  totalPages = 1;
  overAllCount: number = 0;
  limit = 10;
  queryName: string = '';

  querySelection: string = '';

  rowClick(data: any) {
    this.selectRow = data;
    this.selectRow.companyNames = data?.masterCompany?.company || null;
    this.selectRow.shrtName = data?.masterCompany?.shortName || null;
  }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    for (let y = currentYear; y >= startYear; y--) {
      this.years.push(y);
    }
    this.companyData();
  }

  queryS(querySelect: string) {
    this.queryName = querySelect;
    this.listData.column = querySelect
    this.listData.columnData = '';
  }

  quit() {
    this.selectRow = [];
    this.overAllCount = 0;
    this.totalPages = 1;
    this.apiResponseData = [];
    this.selectRow = [];
    this.listData = [];
    this.shortName = '';
    this.selectedCompany = '';
    this.querySelection = '';
    this.currentPage = 1;
  }

  onCompanyChange(companyName: string) {
    const found = this.companyListData.find(cmp => cmp.company === companyName);
    this.shortName = found ? found.shortName : '';
    this.listData.company = companyName;
    this.listData.shortName = found ? found.shortName : '';
  }

  previous() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.show();
    }
  }

  next() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.show();
    }
  }

  show() {
    this.selectRow = [];
    this.overAllCount = 0;
    this.totalPages = 1;
    this.apiResponseData = [];
    let offset: number = 0;
    if (this.listData.company === this.olderCompany) {
      offset = (this.currentPage - 1) * this.limit;
    } else {
      this.currentPage = 1;
      offset = 0;
    }
    // if (!(this.listData.company)) {
    //   return this.toastr.error('Please choose the company.');
    // }
    if (!(this.listData.column)) {
      return this.toastr.error('Please choose the query option.');
    }
    if (!(this.listData.columnData)) {
      return this.toastr.error('Please provide the data for ' + this.listData.column + ' field.');
    }
    return this.mstrApiService.mstrList(this.listData, this.limit, offset).subscribe({
      next: (response) => {
        this.olderCompany = this.listData?.company || '';
        this.apiResponseData = response.data;
        this.overAllCount = response.count;
        this.totalPages = Math.ceil(response.count / this.limit);
        this.toastr.success(response.message);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }

  companyData() {
    return this.mstrApiService.companyList().subscribe({
      next: (res) => {
        this.companyListData = res.data;
      },
      error: (err) => {
        console.log('Error: ', err);
        this.toastr.error('Failed to load company list');
      },
    })
  }

  get topFive() {
    return this.apiResponseData.slice(0, 5);
  }
  get bottomFive() {
    return this.apiResponseData.slice(5, 10);
  }
}
