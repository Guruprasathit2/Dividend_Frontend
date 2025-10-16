import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { GblApiService } from '../service';

type signUpData = {
  email: string | undefined,
  password: string | undefined,
  name: string | undefined,
  gender: string | undefined,
  questionId: number | undefined,
  answer: string | undefined,
};
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  constructor(
    private toastr: ToastrService, private apiService: ApiService, private gblApiService: GblApiService
  ) { }
  ids: string = '';
  questionCount: number = 0;
  signUpData: signUpData = {
    email: '',
    password: '',
    name: '',
    gender: '',
    questionId: undefined,
    answer: '',
  };
  question: string = '';
  relodId: string = '';

  ngOnInit(): void {
    this.defaultQuestion();
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
          questionId: undefined,
          answer: '',
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
      questionId: undefined,
      answer: '',
    };
  }
  questionChanger() {
    const stringSpell = this.relodId !== '' ? this.relodId.split(',') : [];
    stringSpell.push(this.ids);
    this.relodId = stringSpell.join(',');
    this.questions(this.relodId)
  }

  questions(quesIds: string) {
    const checkQuestId = quesIds.split(',');
    if (+checkQuestId?.length >= this.questionCount) {
      this.relodId = '';
      return this.defaultQuestion();
    }
    return this.gblApiService.questionList(quesIds).subscribe({
      next: (r) => {
        this.signUpData.questionId = r.data.id;
        this.question = r.data.question;
        this.ids = r.data.id;
      },
      error: (e) => {
        console.log ('Error: ', e);
        const errorMessage = e.error.message || 'Can\t load the question list.';
        return this.toastr.error(errorMessage);
      }
    });
  }

  defaultQuestion() {
    return this.gblApiService.defaultQuestion().subscribe({
      next: (r) => {
        this.signUpData.questionId = r.data[0].id;
        this.question = r.data[0].question;
        this.ids = r.data[0].id;
        this.questionCount = r.count;
      },
      error: (e) => {
        console.log ('Error: ', e);
        const errorMessage = e.error.message || 'Can\t load the question list.';
        return this.toastr.error(errorMessage);
      }
    });
  }
}
