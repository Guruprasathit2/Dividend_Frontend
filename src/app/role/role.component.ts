import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(private api: ApiService, private toast: ToastrService) { }
  roleList: any = [];
  roleId: number = 0;
  newRole: any | undefined = {};
  isUpdate: boolean = false;

  ngOnInit(): void {
    this.roleListData();
  }

  roleAdd() {
    if (!this.newRole || this.newRole?.roleName === '' || this.newRole?.roleName === ' ') {
      return this.toast.error('Please provide the role name');
    }
    return this.api.addRole(this.newRole).subscribe({
      next: (r) => {
        this.roleListData();
        this.newRole = {};
        this.toast.success('Role added successfully.');
      },
      error: (e) => {
        this.toast.error(e.error.message || 'Role add failed.');
      },
    });
  }

  roleListData() {
    this.api.roleList().subscribe({
      next: (r) => {
        this.roleList = r.data
      },
      error: (e) => {
        console.log('Error: ', e);
        this.toast.error(`Can't load the page`);
      },
    });
  }

  rowClick(dr: any) {
    this.newRole.roleName = dr.roleName;
    this.isUpdate = true;
    this.roleId = dr.id;
  }

  roleUpdate() {
    if (!this.newRole || this.roleId === 0) {
      return this.toast.error('Please provide the role name');
    }
    return this.api.roleUpdate(this.roleId, this.newRole).subscribe({
      next: (r) => {
        this.toast.success('Role updated successfully');
        this.isUpdate = false;
        this.newRole = {};
      },
      error: (e) => {
        this.toast.error(e.error.message || 'Role updation failed');
      },
    });
  }

  deleteRole(ab: any, event: Event) {
    event.stopPropagation();
    return this.api.roleDelete(ab.id).subscribe({
      next: (r) => {
        this.roleListData();
        this.toast.success('Successfully role deleted');
      },
      error: (e) => {
        this.toast.error(e.error.message || `Role deletion failed.`);
      },
    });
  }

  cancel() {
    this.isUpdate = false;
    this.newRole = {};
    
  }

}
