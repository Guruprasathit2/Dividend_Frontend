import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

  constructor(private apiService: ApiService, private toast: ToastrService) { }
  userList1: any = [];
  userData1: any | undefined = {
    roleName: '',
  };
  userRole: string = '';
  view: boolean = false
  idData: any = {};
  isEdit: boolean = true;
  roleList: any = [];

  ngOnInit(): void {
    this.userList12();
  }

  userList12() {
    this.apiService.userList().subscribe({
      next: (r) => {
        return this.userList1 = r.data;
      },
      error: (e) => {
        return this.toast.error('Cannot load the page');
      },
    });
  }

  userData(u: any) {
    return this.apiService.userData(u).subscribe({
      next: (r) => {
        this.view = true
        this.toast.success('Successfully get data');
        this.userData1 = r.data;
        this.userData1.roleIds = r.data?.role?.roleName;
        this.userRole = r.data?.role?.roleName;
        this.userData1.isActive = r.data.isActive == 1 ? 'Active' : 'In-Active';
      },
      error: (e) => {
        this.toast.error(e.error.message || 'unable to get the data');
      },
    });
  }

  updatedData(num: number) {
    if (num === 1) {
      this.isEdit = false;
      this.roleListData();
    } else {
      let roleId = '';
      this.roleList.map( (a: any) => {
        if (a.roleName?.toLowerCase() === this.userRole?.toLowerCase()) {
          roleId = a.id;
        }
      });
      this.userData1.roleIds = roleId;
      this.apiService.updatedDate(this.userData1).subscribe({
        next: (r) => {
          this.toast.success('User profile updated successfully.');
          this.isEdit = true;
          this.view = false;
          this.userList12();
        },
        error: (e) => {
          this.toast.error(e.error.message || 'User profile updation failed.');
        },
      });
    }
  }

  roleListData() {
    this.apiService.roleList().subscribe({
      next: (r) => {
        this.roleList = r.data
      },
      error: (e) => {
        console.log('Error: ', e);
        this.toast.error(`Can't load the page`);
      },
    });
  }


}
