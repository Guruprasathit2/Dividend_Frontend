import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  questions: string = '';
  userData: any = {
    emailId: '',
    answer: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  };
  isEnableQues: boolean = false;
  quesAns: boolean = false;
  answer: boolean = false;
  showPassword: boolean = false;
  firstSubmit: boolean = false;
  constructor(private apiService: ApiService, private toast: ToastrService) { }


  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  verifyEmail() {
    if (!this.userData.emailId) {
      return this.toast.error('Please provide the email id.');
    }
    return this.questionList(this.userData.emailId)
  }

  questionList(emailId: string) {
    this.apiService.questionList(emailId).subscribe({
      next: (r: any) => {
        this.questions = r.data.question;
        this.userData.questionId = r.data.id;
        this.isEnableQues = true;
        this.firstSubmit = true;
      },
      error: (e) => {
        this.isEnableQues = false;
        const er = e.error.message || 'Cannot load questions.';
        this.toast.error(er);
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
    this.apiService.forgotPass(this.userData).subscribe({
      next: (bh) => {
        this.toast.success(bh.message);
        this.answer = true;
        this.quesAns = true;
        this.firstSubmit = false;
        this.userData.otp = bh.otp;
        // this.isEnableQues = false;
      },
      error: (er) => {
        this.toast.error(er.error.message);
      },
    });
  }

  submit(form: any) {
    const password = this.userData.newPassword;
    const confirmPassword = this.userData.confirmPassword;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(password)) {
      return this.toast.error('Password must have 1 uppercase, 1 symbol, and minimum 8 characters.');
    }
    if (password !== confirmPassword) {
      return this.toast.error('Passwords do not match.');
    }
    console.log (this.userData);

    return this.apiService.resetPassword(this.userData).subscribe({
      next: (res: any) => {
        this.toast.success(res.message || 'Password reset successful.');
        this.userData = {};
        this.isEnableQues = false;
        this.quesAns = false;
        this.answer = false;
        this.showPassword = false;
        this.firstSubmit = false;
      },
      error: (err) => {
        this.toast.error(err.error.message || 'Failed to reset password.');
      },
    });
  }

  preventSelect(event: any) {
    setTimeout(() => {
      event.target.selectionStart = event.target.selectionEnd;
    }, 0);
  }

  get passwordErrors() {
    const pwd = this.userData.newPassword || '';
    const obj = {
      uppercase: !/[A-Z]/.test(pwd),
      specialChar: !/[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      minLength: pwd.length < 8
    };
    return obj;
  }




}
