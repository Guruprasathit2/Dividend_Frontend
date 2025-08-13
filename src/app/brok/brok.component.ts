import { Component, OnInit, ViewChild } from '@angular/core';
import { BrokApiService } from './brok-api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-brok',
  templateUrl: './brok.component.html',
  styleUrls: ['./brok.component.css']
})
export class BrokComponent implements OnInit {
  @ViewChild('brokForm') brokForm!: NgForm;
  constructor(private brokApiService: BrokApiService, private toast: ToastrService) { }
  cmpData: any = [];
  listData12: any = {};
  price: string = '';
  isModify: number = 0;
  isedit: boolean = true;
  isUpdate: boolean = false;
  bidCloseData12: string = '';
  formData: any = {
    companyId: '',
    bankQib: '',
    bank_NII_upto_ten: '',
    bank_NII_above_ten: '',
    bank_retail: '',
    bank_emp: '',
    bank_sha: '',
    anchorInvestor: '',
    mamberQib: '',
    member_NII_upto_ten: '',
    member_NII_above_ten: '',
    memberRetail: '',
    member_emp: '',
    member_sha: '',
    uptoTenLack: '',
    regdRetail: '',
    non_upi_max_scsb: '',
    non_upi_application: '',
    member_asba: '',
    dir_syndi_asba: '',
    proc_emp: '',
    proc_sha: '',
    processFeesApplication: '',
    ratePerApplication: '',
    // sponsor_emp: '',
    // sponsor_sha: '',
    bidMaxProcessChrg: '',
    bidUpiApplication: '',
    bidMemberAsba: '',
    bid_syndi_asba: '',
  };
  companyName: string = '';

  showList: boolean = false;
  closeList() {
    this.showList = false;
  }

  listData: any = [];
  ngOnInit(): void {
    this.companyList();
  }

  cmp() {
    for (let i of this.listData) {
      i.comp = i.masterCompany.company;
    }
  }

  add(form: NgForm) {
    if (!(this.formData.companyId)) {
      return this.toast.error('Please select the company');
    }
    const ff = this.isUpdate === true ? 0 : 1;
    if (form.invalid && ff) {
      const hasEmptyOrUndefined = Object.values(this.formData).some(val => val === undefined || val === '' || val === ' ');
      if (hasEmptyOrUndefined) {
        return this.toast.error('Please fill all fields');
      } else {
        return this.toast.error('Please fill out the all field before proceeding.');
      }
    }
    if (form.invalid && ff === 0) {
      const hasEmptyOrUndefined = Object.values(this.formData).some(val => val === undefined || val === '' || val === ' ');
      if (hasEmptyOrUndefined) {
        return this.toast.error('Please fill all fields');
      }
    }
    // Object.entries(this.formData)
    function isEmpty(obj: object) {
      return Object.entries(obj).length === 0;
    }
    if (isEmpty(this.formData)) {
      return this.toast.error('Please provide the data');
    }
    if (!(this.formData.companyId)) {
      return this.toast.error('Please select the company');
    }
    this.isLoading = true;
    return this.brokApiService.brokList(this.formData).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Do you want generate the file?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          customClass: {
            popup: 'swal2-centered'
          }
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.brokApiService.filter(this.formData).subscribe({
              next: (dr) => {
                this.toast.success('File generated successfully.');
                this.formData = {
                  companyId: '',
                  bankQib: '',
                  bank_NII_upto_ten: '',
                  bank_NII_above_ten: '',
                  bank_retail: '',
                  bank_emp: '',
                  bank_sha: '',
                  anchorInvestor: '',
                  mamberQib: '',
                  member_NII_upto_ten: '',
                  member_NII_above_ten: '',
                  memberRetail: '',
                  member_emp: '',
                  member_sha: '',
                  uptoTenLack: '',
                  regdRetail: '',
                  non_upi_max_scsb: '',
                  non_upi_application: '',
                  member_asba: '',
                  dir_syndi_asba: '',
                  proc_emp: '',
                  proc_sha: '',
                  processFeesApplication: '',
                  ratePerApplication: '',
                  bidMaxProcessChrg: '',
                  bidUpiApplication: '',
                  bidMemberAsba: '',
                  bid_syndi_asba: '',
                };
                this.isEditMode = false;
                this.isLoading = false;
                this.bidCloseData12 = '';
                this.price = '';
                this.isModify = 0;
                this.isUpdate = false;
              },
              error: (e) => {
                console.log('Error: ', e);
                this.toast.error(e.error.message || 'File generation failed');
              },
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.toast.success(res.message || 'Form updated successfully');
            this.formData = {
              companyId: '',
              bankQib: '',
              bank_NII_upto_ten: '',
              bank_NII_above_ten: '',
              bank_retail: '',
              bank_emp: '',
              bank_sha: '',
              anchorInvestor: '',
              mamberQib: '',
              member_NII_upto_ten: '',
              member_NII_above_ten: '',
              memberRetail: '',
              member_emp: '',
              member_sha: '',
              uptoTenLack: '',
              regdRetail: '',
              non_upi_max_scsb: '',
              non_upi_application: '',
              member_asba: '',
              dir_syndi_asba: '',
              proc_emp: '',
              proc_sha: '',
              processFeesApplication: '',
              ratePerApplication: '',
              bidMaxProcessChrg: '',
              bidUpiApplication: '',
              bidMemberAsba: '',
              bid_syndi_asba: '',
            };
            this.isLoading = false;
            this.isEditMode = false;
            this.bidCloseData12 = '';
            this.price = '';
            this.isModify = 0;
            this.isUpdate = false;
          }
        });
      },
      error: (e) => {
        this.isLoading = false;
        this.toast.error(e.error.message || 'Form updation failed');
      },
    });
  }

  fileGenerate() {
    this.showList = false;
    this.isUpdate = true;
    if (this.listData12) {
      this.formData = {
        ...this.formData,

        bankQib: this.listData12.ba.Qib,
        bank_NII_upto_ten: this.listData12.ba.NII_upto_ten_lack,
        bank_NII_above_ten: this.listData12.ba.NII_above_ten_lack,
        bank_retail: this.listData12.ba.Retial,
        bank_emp: this.listData12.ba.emp,
        bank_sha: this.listData12.ba.sha,

        anchorInvestor: this.listData12.ma.anchor_investor,
        mamberQib: this.listData12.ma.Qib,
        member_NII_upto_ten: this.listData12.ma.NII_upto_ten_lack,
        member_NII_above_ten: this.listData12.ma.NII_above_ten_lack,
        memberRetail: this.listData12.ma.Retial,
        member_emp: this.listData12.ma.emp,
        member_sha: this.listData12.ma.sha,

        uptoTenLack: this.listData12.regd.upto_ten_lack,
        regdRetail: this.listData12.regd.Retail,

        non_upi_max_scsb: this.listData12.proceFeeToSCSB.nonUpiMaxProcesFessToScsb,
        non_upi_application: this.listData12.proceFeeToSCSB.nonUpiApplication,
        member_asba: this.listData12.proceFeeToSCSB.memberAsba,
        dir_syndi_asba: this.listData12.proceFeeToSCSB.dirSyndiAsba,
        proc_emp: this.listData12.proceFeeToSCSB.emp,
        proc_sha: this.listData12.proceFeeToSCSB.sha,

        processFeesApplication: this.listData12.sponsorBank.procureedApi,
        ratePerApplication: this.listData12.sponsorBank.ratePerApplication,
        // sponsor_emp: this.listData12.sponsorBank.sponsor_emp,
        // sponsor_sha: this.listData12.sponsorBank.sponsor_sha,

        bidMaxProcessChrg: this.listData12.bidChrg.maxCharge,
        bidUpiApplication: this.listData12.bidChrg.upiApplication,
        bidMemberAsba: this.listData12.bidChrg.memberAsba,
        bid_syndi_asba: this.listData12.bidChrg.dirSyndiAsba,
      };
      this.price = this.listData12.price;
      this.bidCloseData12 = this.listData12.issueCloseDate;
    }
  }

  isEditMode = false;
  showConfirm = false;
  isLoading = false;
  checking: number = 1;
  onConfirm(result: boolean, brokForm?: any) {
    this.showConfirm = false;
    if (result && this.isModify == 1) {
      this.checking = 1;
      this.isModify = 2;
      this.isEditMode = true;
    } else if (result && this.isModify == 2) {
      this.add(brokForm);
    } else if (result && this.isModify == 0) {
      this.add(brokForm);
    }
  }

  onChange(data: any) {
    const price1 = this.cmpData.filter((asd: any) => {
      if (+asd.issueCode === +data) {
        return asd;
      }
    });
    this.price = price1[0].price || '';
    this.bidCloseData12 = price1[0].bidCloseDate?.split('T')[0] || '';
    this.checking = 2;
    return this.brokApiService.mainData(price1[0].issueCode).subscribe({
      next: (res) => {
        if (res.status === 1) {
          const obj: any = {};
          this.isModify = 1;
          obj.companyName = res.data.companyName;
          obj.issueCloseDate = res.data.issueCloseDate?.split('T')[0] || '';
          obj.price = res.data.price;
          obj.ba = JSON.parse(res.data.bankAsba);
          obj.ma = JSON.parse(res.data.memberAsba);
          obj.regd = JSON.parse(res.data.sellingCommision);
          obj.proceFeeToSCSB = JSON.parse(res.data.proceFeeToSCSB);
          obj.sponsorBank = JSON.parse(res.data.proceFeeToSponsorBank);
          obj.bidChrg = JSON.parse(res.data.bidChrg);
          this.listData12 = obj;
          this.fileGenerate();
          // this.showList = true;
          this.toast.success('Successfully get the list');
        } else {
          this.isModify = 0;
          this.isEditMode = true;
          this.toast.info('This company does not have a list.');
          // this.formData = {};
          this.formData.bankQib = '';
          this.formData.bank_NII_upto_ten = '';
          this.formData.bank_NII_above_ten = '';
          this.formData.bank_retail = '';
          this.formData.anchorInvestor = '';
          this.formData.mamberQib = '';
          this.formData.member_NII_upto_ten = '';
          this.formData.member_NII_above_ten = '';
          this.formData.memberRetail = '';
          this.formData.uptoTenLack = '';
          this.formData.regdRetail = '';
          this.formData.non_upi_max_scsb = '';
          this.formData.non_upi_application = '';
          this.formData.member_asba = '';
          this.formData.dir_syndi_asba = '';
          this.formData.processFeesApplication = '';
          this.formData.ratePerApplication = '';
          this.formData.bidUpiApplication = '';
          this.formData.bidMaxProcessChrg = '';
          this.formData.bidMemberAsba = '';
          this.formData.bid_syndi_asba = '';
          this.formData.bank_emp = '';
          this.formData.bank_sha = '';
          this.formData.member_emp = '';
          this.formData.member_sha = '';
          this.formData.proc_emp = '';
          this.formData.proc_sha = '';
          // this.formData.sponsor_emp = '';
          // this.formData.sponsor_sha = '';
        }
      },
      error: (e) => {
        this.toast.error('Cannot load file list');
      }
    });
  }

  companyList() {
    return this.brokApiService.comList().subscribe({
      next: (response) => {
        this.cmpData = response.data;
      },
      error: (err) => {
        console.log('Error: ', err);
        this.cmpData = [];
      }
    })
  }

  show() {
    if (!this.formData.companyId) {
      return this.toast.error('Please select the company.');
    }
    return this.brokApiService.formList(this.formData).subscribe({
      next: (response) => {
        this.showList = true;
        this.toast.success('Successfully get the list.');
        this.listData = response.data;
        this.cmp();
      },
      error: (err) => {
        console.log('Error: ', err);
        this.showList = false;
        const msg: string = err.error.message || 'Data is not available for this company.'
        this.toast.error(msg);
      },
    });
  };

  regd() {
    this.formData.sellingCommision = 5;
    if (!this.formData.companyId) {
      return this.toast.error('Please select the company.');
    }
    return this.brokApiService.excelList(this.formData).subscribe({
      next: res => {
        try {
          const contentDisposition = res.headers.get('Content-Disposition');
          let filename: string = 'SellingCommision(SCSB)' + Date.now() + '.xlsx';
          if (contentDisposition) {
            filename = contentDisposition?.split('filename=')[1];
          }
          const url = window.URL.createObjectURL(res.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          this.toast.success('File downloaded successfully!');
        } catch (err) {
          this.toast.error('Failed to process the downloaded file.');
        }
      },
      error: err => {
        let msg = err.error.message || 'Failed to download file.';
        this.toast.error(msg);
      }
    });
  }
  scsb() {
    this.formData.sellingCommision = 2;
    if (!this.formData.companyId) {
      return this.toast.error('Please select the company.');
    }
    return this.brokApiService.excelList(this.formData).subscribe({
      next: res => {
        try {
          const contentDisposition = res.headers.get('Content-Disposition');
          let filename: string = 'SellingCommision(SCSB)' + Date.now() + '.xlsx';
          if (contentDisposition) {
            filename = contentDisposition?.split('filename=')[1];
          }
          const url = window.URL.createObjectURL(res.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          this.toast.success('File downloaded successfully!');
        } catch (err) {
          this.toast.error('Failed to process the downloaded file.');
        }
      },
      error: err => {
        let msg = err.error.message || 'Failed to download file.';
        this.toast.error(msg);
      }
    });
  }

  sm() {
    this.formData.sellingCommision = 1;
    if (!this.formData.companyId) {
      return this.toast.error('Please select the company.');
    }
    return this.brokApiService.excelList(this.formData).subscribe({
      next: res => {
        try {
          const contentDisposition = res.headers.get('Content-Disposition');
          let filename: string = 'SellingCommision(SCSB)' + Date.now() + '.xlsx';
          if (contentDisposition) {
            filename = contentDisposition?.split('filename=')[1];
          }
          const url = window.URL.createObjectURL(res.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          this.toast.success('File downloaded successfully!');
        } catch (err) {
          this.toast.error('Failed to process the downloaded file.');
        }
      },
      error: err => {
        let msg = err.error.message || 'Failed to download file.';
        this.toast.error(msg);
      }
    });
  }
  bidchrg() {
    this.formData.sellingCommision = 6;
    if (!this.formData.companyId) {
      return this.toast.error('Please select the company.');
    }
    return this.brokApiService.excelList(this.formData).subscribe({
      next: res => {
        try {
          const contentDisposition = res.headers.get('Content-Disposition');
          let filename: string = 'SellingCommision(SCSB)' + Date.now() + '.xlsx';
          if (contentDisposition) {
            filename = contentDisposition?.split('filename=')[1];
          }
          const url = window.URL.createObjectURL(res.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          this.toast.success('File downloaded successfully!');
        } catch (err) {
          this.toast.error('Failed to process the downloaded file.');
        }
      },
      error: err => {
        let msg = err.error.message || 'Failed to download file.';
        this.toast.error(msg);
      }
    });
  }

  PF() {
    this.formData.sellingCommision = 3;
    if (!this.formData.companyId) {
      return this.toast.error('Please select the company.');
    }
    return this.brokApiService.excelList(this.formData).subscribe({
      next: res => {
        try {
          const contentDisposition = res.headers.get('Content-Disposition');
          let filename: string = 'SellingCommision(SCSB)' + Date.now() + '.xlsx';
          if (contentDisposition) {
            filename = contentDisposition?.split('filename=')[1];
          }
          const url = window.URL.createObjectURL(res.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          this.toast.success('File downloaded successfully!');
        } catch (err) {
          this.toast.error('Failed to process the downloaded file.');
        }
      },
      error: err => {
        let msg = err.error.message || 'Failed to download file.';
        this.toast.error(msg);
      }
    });
  }
  PFSponsor() {
    this.formData.sellingCommision = 4;
    if (!this.formData.companyId) {
      return this.toast.error('Please select the company.');
    }
    return this.brokApiService.excelList(this.formData).subscribe({
      next: res => {
        try {
          const contentDisposition = res.headers.get('Content-Disposition');
          let filename: string = 'SellingCommision(SCSB)' + Date.now() + '.xlsx';
          if (contentDisposition) {
            filename = contentDisposition?.split('filename=')[1];
          }
          const url = window.URL.createObjectURL(res.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          this.toast.success('File downloaded successfully!');
        } catch (err) {
          this.toast.error('Failed to process the downloaded file.');
        }
      },
      error: err => {
        let msg = err.error.message || 'Failed to download file.';
        this.toast.error(msg);
      }
    });
  }

  exit() {
    this.formData = {};
    this.showList = false;
  }

  downloadBrokerData() {
    if (!this.formData.companyId) {
      return this.toast.error('Please select the company.');
    }

    return Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to download broker data?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, download it!',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'swal2-centered'
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        // Your download logic here
        this.formData.sellingCommision = 'broker';
        this.brokApiService.filter(this.formData).subscribe({
          next: (re) => {
            this.brokApiService.excelList(this.formData).subscribe({
              next: res => {
                try {
                  const contentDisposition = res.headers.get('Content-Disposition');
                  let filename: string = 'SellingCommision(SCSB)' + Date.now() + '.xlsx';
                  if (contentDisposition) {
                    filename = contentDisposition?.split('filename=')[1];
                  }
                  const url = window.URL.createObjectURL(res.body);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = filename;
                  a.click();
                  window.URL.revokeObjectURL(url);
                  this.toast.success('File downloaded successfully!');
                } catch (err) {
                  this.toast.error('Failed to process the downloaded file.');
                }
              },
              error: (err) => {
                let msg = err.error.message || 'Failed to download file.';
                this.toast.error(msg);
              }
            });
          },
          error: (err) => {
            let msg = err.error.message || 'Failed to download file.';
            this.toast.error(msg);
          }
        });
      }
    });
  }

  downloadAllFiles() {
    this.formData.sellingCommision = 'All';
    if (!this.formData.companyId) {
      return this.toast.error('Please select the company.');
    }
    return this.brokApiService.allExcel(this.formData).subscribe({
      next: res => {
        try {
          const contentDisposition = res.headers.get('Content-Disposition');
          let filename: string = 'SellingCommision(SCSB)' + Date.now() + '.xlsx';
          if (contentDisposition) {
            filename = contentDisposition?.split('filename=')[1];
          }
          const url = window.URL.createObjectURL(res.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          this.toast.success('File downloaded successfully!');
        } catch (err) {
          this.toast.error('Failed to process the downloaded file.');
        }
      },
      error: (err) => {
        // console.log (err.error.message, 'err-1', err.error);
        // let msg = err.error.message || 'Failed to download file.';
        // this.toast.error(msg);
        if (err.error instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const errorObj = JSON.parse(reader.result as string);
              const msg = errorObj.message || 'Failed to download file.';
              this.toast.error(msg);
            } catch (e) {
              this.toast.error('Failed to parse error message.');
            }
          };
          reader.onerror = () => {
            this.toast.error('Failed to read error message.');
          };
          reader.readAsText(err.error);
        } else {
          const msg = typeof err.error === 'object' ? err.error.message : err.error;
          this.toast.error(msg || 'Failed to download file.');
        }
      }
    });
  }

}
