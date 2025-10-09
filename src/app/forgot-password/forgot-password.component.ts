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
  userData: any = {};
  isEnableQues: boolean = false;
  constructor(private apiService: ApiService, private toast: ToastrService) { }


  ngOnInit(): void {
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
    if (!this.isEnableQues) {
      return 
    }
    this.apiService.forgotPass(this.userData).subscribe({
      next: (bh) => {
        this.toast.success(bh.message);
        this.isEnableQues = false;
      },
      error: (er) => {
        this.toast.error(er.error.message);
      },
    });
  }

}
