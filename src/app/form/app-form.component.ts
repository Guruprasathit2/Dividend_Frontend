import { Component, ViewChild } from '@angular/core';
import { FormApiService } from './form-api.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './app.form.html',
  styleUrls: ['./app.form.css']
})
export class AppFormComponent {
  @ViewChild('dividendForm') dividendForm!: NgForm;
  formData: any = {
    company: '',
    shortName: '',
    bankName: '',
    divAccNo: '',
    divYear: '',
    wrnDate: '',
    amount: '',
    status: '',
    internalSeqNo: '',
  };
  companyLists: any[] = [];
  isEditMode: boolean = false;

  constructor(private formApiService: FormApiService, private toastr: ToastrService) { }

  onSubmit() {
    return this.formApiService.saveForm(this.formData).subscribe({
      next: (response) => {
        if (response.status === 1) {
          this.dividendForm.resetForm({
            company: '',
            shortName: '',
            bankName: '',
            divAccNo: '',
            divYear: '',
            wrnDate: '',
            amount: '',
            status: '',
            internalSeqNo: '',
          });
          this.toastr.success('Form submitted successfully');
        } else {
          this.toastr.success(response.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message);
        console.log('Submission Error: ', err.error);
      }
    })
  }

  ngOnInit() {
    // const dd = JSON.parse(localStorage.getItem('userInformation') || '{}');
    // if (Object.keys(dd)[0]) {}
    return this.formApiService.getList().subscribe({
      next: (data) => {
        this.companyLists = data.data;
      },
      error: (err) => {
        console.log('Error: ', err);
        this.companyLists = [];
        this.toastr.error(err.error.message || 'Unauthorized');
      },
    });
  }

  onCompanyChange(cmpData: any) {
    const dd = this.companyLists.find(a => a.company === cmpData);
    return this.formData.shortName = dd ? dd.shortName : '';
  }

  edit() {
    if (!this.formData.internalSeqNo || this.formData.internalSeqNo?.toString()?.trim() === '') {
      return this.toastr.error('Please enter a valid Internal SeqNo.');
    }
    this.isEditMode = true;
    return this.formApiService.editForm(this.formData.internalSeqNo).subscribe({
      next: (data) => {
        if (data.status === 1) {
          this.formData = data.data;
          this.formData.company = data.data.company?.trim();
          this.formData.wrnDate = data.data.wrnDate?.trim();
        } else {
          this.toastr.error(data.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message);
        this.isEditMode = false;
        console.log('Error: ', err);
        this.dividendForm.resetForm({
          company: '',
          shortName: '',
          bankName: '',
          divAccNo: '',
          divYear: '',
          wrnDate: '',
          amount: '',
          status: '',
          internalSeqNo: '',
        });
      }
    })
  }

  update() {
    if(!this.formData.internalSeqNo) {
      return this.toastr.error('Pls provide the the internal seq no');
    }
    return this.formApiService.updatedForm(this.formData.internalSeqNo, this.formData).subscribe({
      next: (data) => {
        if (data.status === 1) {
          this.toastr.success(data.message);
          this.dividendForm.resetForm({
            company: '',
            shortName: '',
            bankName: '',
            divAccNo: '',
            divYear: '',
            wrnDate: '',
            amount: '',
            status: '',
            internalSeqNo: '',
          });
          this.isEditMode = false;
        } else {
          this.toastr.error(data.message);
        }
      },
      error: (err) => {
        console.log('Error: ', err);
        this.toastr.error(err.error.message);
      },
    })
  }

  exit() {
    this.isEditMode = false;
    return this.dividendForm.resetForm({
      company: '',
      shortName: '',
      bankName: '',
      divAccNo: '',
      divYear: '',
      wrnDate: '',
      amount: '',
      status: '',
      internalSeqNo: '',
    });
  }
}