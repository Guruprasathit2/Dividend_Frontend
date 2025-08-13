import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';

type signUpData = {
  email: string | undefined,
  password: string | undefined,
  name: string | undefined,
  gender: string | undefined,
};
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  constructor(private toastr: ToastrService, private apiService: ApiService) { }
  signUpData: signUpData = {
    email: '',
    password: '',
    name: '',
    gender: '',
  };
  ngOnInit(): void {
  }
  signUp() {
    if (!(this.signUpData)) {
      return this.toastr.error('Please file the data\s.');
    }
    if (!(this.signUpData.name)) {
      return this.toastr.error('Please provide the name.');
    }
    if (!(this.signUpData.email)) {
      return this.toastr.error('Please provide the email id.');
    }
    if (!(this.signUpData.password)) {
      return this.toastr.error('Please provide the Password.');
    }
    if (!(this.signUpData.gender)) {
      return this.toastr.error('Please provide the gender.');
    }
    return this.apiService.add(this.signUpData).subscribe({
      next: (res: any) => {
        this.toastr.success('Account created successfully');
        this.signUpData = {
          email: '',
          password: '',
          name: '',
          gender: '',
        };
      },
      error: (e) => {
        this.toastr.error(e.error.message || 'Account creation failed');
      },
    });
  }
  cancel() {
    this.signUpData = {
      email: '',
      gender: '',
      name: '',
      password: '',
    };
  }
}
