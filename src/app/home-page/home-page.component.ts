import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router, private toastrService: ToastrService, private apiService: ApiService) { }
  userName: any = '';
  gender: string = '';
  profileLogo: string = '';
  showTooltip: boolean = false;
  role: boolean = false;
  ngOnInit(): void {
    try {
      const userData = JSON.parse(localStorage.getItem('userInformation') || '{}');
      this.apiService.userData(userData.userId).subscribe({
        next: (r) => {
          this.role = r.data?.role?.slug === 'admin' ? true : false;
          this.userName = r.data.name || '';
          this.profileLogo = r.data.avatar ? r.data.avatar : r.data.gender?.toLowerCase() == 'male' ? './assets/maleimages.png' : './assets/femaleImage.jpg'; 
        },
        error: (e) => {
          this.toastrService.error(e.error.message || `Can't load the page.`);
        },
      });
    } catch (e) {
      this.userName = '';
      this.profileLogo = '';
      this.toastrService.error(`Can't load the page.`);
    }
  }

  profileClick() {
    return this.router.navigate(['/home_page/profile']);
  }
  
  async logout() {
    const res = await Swal.fire({
      title: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: 'swal2-centered',
      },
    });
    if (res.isConfirmed) {
      const userInfo = JSON.parse(localStorage.getItem('userInformation') || '{}');
      this.apiService.logutDunction(userInfo).subscribe({
        next: (r1) => {
          this.toastrService.success(r1.message);
          localStorage.removeItem('userInformation');
          this.router.navigate(['/login_page']);
        },
        error: (e1) => {
          this.toastrService.error(e1.error.message);
        },
      });
    }
  };
}
