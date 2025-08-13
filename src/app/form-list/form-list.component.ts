import { Component, OnInit } from '@angular/core';
import { FormListApiService } from './form-list-api.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  constructor(private formListApiService: FormListApiService) { }
  formListdata: any[] = [];
  limit = 12;
  currentPage = 1;
  totalItems = 0;
  totalPages = 1;
  totalCount = 0;

  isActive = '';
  keyword = '';

  onStatusChange() {
    this.currentPage = 1;
    this.fetchData();
  }

  onSearchChange() {
    this.currentPage = 1;
    this.fetchData();
  }


  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const offset = (this.currentPage - 1) * this.limit;
    this.formListApiService.formListData(this.limit, offset, this.isActive, this.keyword).subscribe({
      next: (data) => {
        if (data?.data?.length) {
          for (const a of data?.data) {
            a.status = a.status === 1 ? 'Active' : 'In-Active';
          }
          this.formListdata = data.data;
          this.totalCount = data.count;
          this.totalPages = Math.ceil(data.count / this.limit);
        } else {
          this.formListdata = [];
        }
      },
      error: (err) => {
        console.log('Error: ', err);
      }
    })

  }
  previous() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchData();
    }
  }

  next() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchData();
    }
  }

}
