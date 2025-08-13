import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginApiService } from './login-api.service';

type LOGINDATA = {
  email: string | undefined,
  password: string | undefined,
};
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  loginData: LOGINDATA = {
    email: '',
    password: '',
  };
  showPassword = false;

  constructor(private toastr: ToastrService, private loginApiService: LoginApiService,
    private router: Router
  ) { }

  ngOnInit(): any {
    
    const dd12 = JSON.parse(localStorage.getItem('userInformation') || '{}');
    if(Object.keys(dd12)[0]) {
      return this.router.navigate(['/home_page']);
    }
  }

  signIn() {
    if (!(this.loginData)) {
      return this.toastr.error('Please provide the email Id and Password');
    }
    if (!(this.loginData.email)) {
      return this.toastr.error('Please provide the email id');
    }
    if (!(this.loginData.password)) {
      return this.toastr.error('Please provide the Password');
    }
    return this.loginApiService.loginPage(this.loginData).subscribe({
      next: async (res: any) => {
        if (+res.status === 1) {
          const res1 = {
            token: res.data.token,
            userId: res.data.userId,
            emailId: res.data.email,
            name: res.data.name,
            gender: res.data.gender,
            role: res.data?.role?.slug || '',
          };
          console.log (res1, 'res1-1');
          const dd = JSON.parse(localStorage.getItem('userInformation') || '{}');
          if (Object.keys(dd)[0]) {
            this.loginApiService.logutDunction(dd).subscribe({
              next: (r) => {
                if (r.status === 1) {
                  localStorage.removeItem('userInformation');
                  localStorage.removeItem('token');
                  localStorage.setItem('userInformation', JSON.stringify(res1));
                  localStorage.setItem('token', JSON.stringify(res1.token));
                  this.toastr.success('Login successfully');
                  this.router.navigate(['/home_page']);
                }
              },
            });
          } else {
            localStorage.setItem('userInformation', JSON.stringify(res1));
            localStorage.setItem('token', JSON.stringify(res1.token));
            this.toastr.success('Login successfully');
            this.router.navigate(['/home_page']);
          }
        }
      },
      error: (e) => {
        console.log ('Error: ', e);
        this.toastr.error(e?.error?.message || 'Login failed');
      },
    });
  }

  cancel() {
    this.loginData = {
      email: '',
      password: '',
    };
  }



}
