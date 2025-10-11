import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roles: any[] = [];
  questions: any[] = [];
  userData: any = {
    name: '',
    mobileNum: '',
    email: '',
    password: '',
    role: '',
    gender: '',
    questionId: '',
    answer: '',
    address: '',
  };

  emptyData: any = {
    name: '',
    mobileNum: '',
    email: '',
    password: '',
    role: '',
    gender: '',
    questionId: '',
    answer: '',
    address: '',
  }

  constructor(private apiService: ApiService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.userData = this.emptyData;
    this.questionList();
    this.roleData();
  }

  roleData() {
    this.apiService.roleList().subscribe({
      next: (r: any) => {
        this.roles = r.data;
      },
      error: () => {
        this.toast.error('Cannot load roles.');
      },
    });
  }

  questionList() {
    this.apiService.questionList().subscribe({
      next: (r: any) => {
        this.questions = r.data;
      },
      error: () => {
        this.toast.error('Cannot load questions.');
      }
    });
  }

  onSubmit(form: any) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }
    this.add();
  }

  add() {
    this.apiService.userRegister(this.userData).subscribe({
      next: (res) => {
        this.toast.success('User created successfully');
        this.userData = {};
      },
      error: (er) => {
        const e = er.error.message || 'Couldn\'t create the user.';
        console.log(e);
        this.toast.error(e);
      },
    });
  }

  cancel(form: any) {
    this.userData = {};
  }
}
