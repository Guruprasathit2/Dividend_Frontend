import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dividened-file-creation',
  templateUrl: './dividened-file-creation.component.html',
  styleUrls: ['./dividened-file-creation.component.css']
})
export class DividenedFileCreationComponent implements OnInit {
  @ViewChild('fileForm') fileForm!: NgForm;
  constructor(private api: ApiService, private toast: ToastrService) { }
  cmpData: any = [];
  bankData: any = [];
  verif: number = 0;
  formData: any = {
    shortName: '',
    nsdlDate: '',
    cdslDate: '',
    bankName: '',
  };
  isLoading: boolean = false;
  minDate: string = '';
  maxDate: string = '';
  nsdlEdit: boolean = false;
  cdslEdit: boolean = false
  dateChecking: number = 0;
  idEdit: boolean = false;
  updatedit: boolean = false;
  bankCode: string = '';
  curYear: number | undefined;
  secMin: string = '';
  ngOnInit(): void {
    this.companyList();
    this.bankList();
    const currentYear = new Date().getFullYear();
    this.curYear = currentYear;
    this.minDate = `${currentYear}-04-01`;
    this.maxDate = `${currentYear + 1}-03-31`;
    this.secMin = `${currentYear}-04-01`;
  }

  endDate() {
    this.secMin = this.formData.finFrom;
  }

  onChange(a: string) {
    for (const b of this.bankData) {
      if (b.BankName === a) {
        this.bankCode = b.bankCode;
        break;
      }
    }
    return this.bankCode;
  }

  companyList() {
    return this.api.company_list().subscribe({
      next: (r) => {
        this.cmpData = r.data;
      },
      error: (e) => {
        this.toast.error('Cannot load the company list.');
      },
    });
  }

  bankList() {
    return this.api.bankList().subscribe({
      next: (r) => {
        this.bankData = r.data;
      },
      error: (e) => {
        this.toast.error('Cannot load the bank list.');
      },
    });
  }

  DateCheck(d: any, isNsdl: number) {
    if (!d.shortName) {
      return this.toast.error('Please select the company.');
    } else if (!d.nsdlDate && isNsdl === 1) {
      return this.toast.error('Please provide the nsdl date.');
    } else if (!d.cdslDate && isNsdl === 0) {
      return this.toast.error('Please provide the cdsl date.');
    }
    this.verif = 1;
    let isin = 0;
    for (const av of this.cmpData) {
      if (av.Cmp_Shrt_Nm === d.shortName) {
        isin = av.Cmp_Isinno;
        break;
      }
    }
    if (isNsdl === 1) {
      const obj = {
        isNsdl: 1,
        nsdlDate: d.nsdlDate,
        isin,
      };
      return this.api.dateCheck(obj).subscribe({
        next: (r) => {
          this.dateChecking = 0
          this.nsdlEdit = true;
          if (this.nsdlEdit && this.cdslEdit) {
            this.updatedData(d);
          }
          this.toast.success('NSDL date verification successful.');
        },
        error: (e) => {
          this.dateChecking = 1;
          this.toast.error('Invalid NSDL date.');
        },
      });
    } else {
      const obj = {
        isNsdl: 0,
        cdslDate: d.cdslDate,
        isin,
      };
      return this.api.dateCheck(obj).subscribe({
        next: (r) => {
          this.dateChecking = 0;
          this.cdslEdit = true;
          if (this.nsdlEdit && this.cdslEdit) {
            this.updatedData(d);
          }
          this.toast.success('CDSL date verification successful.');
        },
        error: (e) => {
          this.dateChecking = 2;
          this.toast.error('Invalid CDSL date.');
        },
      });
    }
  }

  updatedData(bh: any) {
    return this.api.getData(bh).subscribe({
      next: (r) => {
        if (r.status == 1) {
          this.formData = {
            shortName: r.data.shortName,
            nsdlDate: r.data.nsdlDate,
            cdslDate: r.data.cdslDate,
            bankName: r.data.bank,
            accNo: r.data.accountNo,
            divYear: r.data.divYear,
            divPerShare: r.data.share,
            divpercentage: r.data.percentage,
            wrnDate: r.data.wrnDate,
            finFrom: r.data.finFrom,
            finTo: r.data.finTo,
          };
          this.idEdit = true;
          this.updatedit = true;
          this.toast.success('Successfully get the data.');
        };
      },
    });
  }

  update(num: number) {
    if (num === 1) {
      return Swal.fire({
        title: 'Do you want update the file?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
          popup: 'swal2-centered'
        }
      }).then((res) => {
        if (res.isConfirmed) {
          this.idEdit = false;
        } else {
          this.formData = {
            shortName: '',
            nsdlDate: '',
            cdslDate: '',
            bankName: '',
          };
          this.updatedit = false;
          this.idEdit = false;
          this.cdslEdit = false;
          this.nsdlEdit = false;
        }
      })
    } else {
      if (!this.formData.shortName) {
        return this.toast.error('Please select the company.');
      }
      if (this.verif === 0) {
        return this.toast.error('Please verify the NSDL and CDSL date.');
      }
      if (this.dateChecking) {
        const name = this.dateChecking === 1 ? 'NSDL' : 'CDSL';
        return this.toast.error(`Invalid ${name} date.`);
      }
      if (this.formData.wrnDate) {
        const wd = this.formData.wrnDate;
        if (wd) {
          const wd1 = wd.split('/').map(Number);
          if (!wd1[0]) {
            return this.toast.error('Invalid wrn date');
          }
        }
        const [day, month, year] = this.formData.wrnDate?.split('/').map(Number);
        const filterMonth = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (filterMonth <= today) {
          return this.toast.error('The WRN date is earlier than todays date.');
        }
      }
      if (!this.bankCode) {
        this.onChange(this.formData.bankName)
        this.formData.bankCode = this.bankCode;
      } else {
        this.formData.bankCode = this.bankCode;
      }
      this.isLoading = true;
      return this.api.createFile(this.formData).subscribe({
        next: (r) => {
          Swal.fire({
            title: 'Do you want generate the file?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            customClass: {
              popup: 'swal2-centered'
            }
          }).then((result) => {
            if (result.isConfirmed) {
              return this.api.generateFile(this.formData).subscribe({
                next: (u) => {
                  this.toast.success('Form generated successfully.');
                  this.formData = {
                    shortName: '',
                    nsdlDate: '',
                    cdslDate: '',
                    bankName: '',
                  };
                  this.isLoading = false;
                  this.updatedit = false;
                  this.idEdit = false;
                  this.cdslEdit = false;
                  this.nsdlEdit = false;
                },
                error: (e) => {
                  this.toast.error('Form Genration failed.');
                }
              });
            } else {
              this.formData = {
                shortName: '',
                nsdlDate: '',
                cdslDate: '',
                bankName: '',
              };
              this.isLoading = false;
              this.updatedit = false;
              this.idEdit = false;
              this.cdslEdit = false;
              this.nsdlEdit = false;
              return this.toast.success(r.message || 'Form updated successfully.');
            }
          });
        },
        error: (e) => {
          this.isLoading = false;
          this.toast.error(e.error.message || 'Form updation failed.');
        },
      });
    }
  }

  Add() {
    if (!this.formData.shortName) {
      return this.toast.error('Please select the company.');
    }
    if (this.verif === 0) {
      return this.toast.error('Please verify the NSDL and CDSL date.');
    }
    if (this.dateChecking) {
      const name = this.dateChecking === 1 ? 'NSDL' : 'CDSL';
      return this.toast.error(`Invalid ${name} date.`);
    }
    if (this.formData.wrnDate) {
      const wd = this.formData.wrnDate;
      if (wd) {
        const wd1 = wd.split('/').map(Number);
        if (!wd1[0]) {
          return this.toast.error('Invalid wrn date');
        }
      }
      const [day, month, year] = this.formData.wrnDate?.split('/').map(Number);
      const filterMonth = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (filterMonth <= today) {
        return this.toast.error('The WRN date is earlier than todays date.');
      }
    }
    if (!this.bankCode) {
      this.onChange(this.formData.bankName)
      this.formData.bankCode = this.bankCode;
    } else {
      this.formData.bankCode = this.bankCode;
    }
    this.isLoading = true;
    return this.api.createFile(this.formData).subscribe({
      next: (r) => {
        Swal.fire({
          title: 'Do you want generate the file?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          customClass: {
            popup: 'swal2-centered'
          }
        }).then((res) => {
          if (res.isConfirmed) {
            this.api.generateFile(this.formData).subscribe({
              next: (u) => {
                this.toast.success('Form generated successfully.');
                this.formData = {
                  shortName: '',
                  nsdlDate: '',
                  cdslDate: '',
                  bankName: '',
                };
                this.isLoading = false;
                this.updatedit = false;
                this.idEdit = false;
                this.cdslEdit = false;
                this.nsdlEdit = false;
              },
              error: (e) => {
                this.toast.error('Form Genration failed.');
              }
            });
          } else {
            this.toast.success(r.message || 'Form created successfully.');
            this.isLoading = false;
            this.formData = {
              shortName: '',
              nsdlDate: '',
              cdslDate: '',
              bankName: '',
            };
            this.updatedit = false;
            this.idEdit = false;
            this.cdslEdit = false;
            this.nsdlEdit = false;
          }
        });
      },
      error: (e) => {
        this.isLoading = false;
        this.toast.error(e.error.message || 'Form creation failed.');
      },
    });
  }
}

// onYearChange() {
//   const fromData = this.formData.financialYearFrom?.split('-')[0] || '';
//   const toDate = this.formData.financialYearTo?.split('-')[0] || '';
//   const as = fromData + '-' + toDate;
//   this.formData.taxPeriod = as;
//   this.tax = as;
// }