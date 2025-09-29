import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

type userData = {
  emailId: string | undefined,
  name: string | undefined,
  gender: string | undefined,
  address: string | undefined,
  avatar: string | undefined
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private apiService: ApiService, private toastrService: ToastrService, private router: Router) { }
  profilePic: string = '';
  roleName: string = '';
  userData: userData = {
    name: '',
    emailId: '',
    gender: '',
    address: '',
    avatar: '',
  };
  isUpdate = false;

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result;
        this.profilePic = base64String;
        this.userData.avatar = base64String;

        this.apiService.updatedData(this.userData).subscribe({
          next: (r) => {
            this.userData = r.data;
            this.toastrService.success('Profile picture updated successfully');
          },
          error: (e) => {
            this.toastrService.error(e.error.message || 'Profile updation failed');
          }
        });
      };
      reader.readAsDataURL(file);
    }
  }
  isEdit() {
    if (this.isUpdate) {
      this.update();
    }
    this.isUpdate = true;
  }

  update() {
    return this.apiService.updatedData(this.userData).subscribe({
      next: (r) => {
        this.userData = r.data;
        this.isUpdate = false;
        this.ngOnInit();
        this.toastrService.success('Profile updated successfully');
      },
      error: (e) => {
        this.toastrService.error(e.error.message || 'Profile updation failed');
      },
    });
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
        next: (r_1) => {
          this.toastrService.success(r_1.message);
          localStorage.removeItem('userInformation');
          this.router.navigate(['/login_page']);
        },
        error: (e_1) => {
          this.toastrService.error(e_1.error.message);
        },
      });
    }
  };

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userInformation') || '{}');
    this.apiService.userData(user.userId).subscribe({
      next: (r) => {
        this.userData = r.data;
        this.profilePic = (r.data.avatar && r.data.avatar !== '') ? r.data.avatar : r.data.gender?.toLowerCase() === 'male' ? './assets/maleimages.png' : './assets/femaleImage.jpg';
        this.roleName = r.data.role.roleName;
      },
      error: (e) => {
        this.toastrService.error(e.error.message || 'Something went wrong');
      },
    });
  }

  onDeleteImage() {
    const obj = {
      image: 1,
    };
    return this.apiService.imageDelete(this.userData, obj).subscribe({
      next: (r) => {
        this.userData = r.data;
        this.profilePic = (r.data.avatar && r.data.avatar !== '') ? r.data.avatar : r.data.gender?.toLowerCase() == 'male' ? './assets/maleimages.png' : './assets/femaleImage.jpg';
        this.toastrService.success('Profile picture updated successfully');
      },
      error: (e) => {
        this.toastrService.error(e.error.message || 'Profile updation failed');
      }
    });
  }

  openImageOptions() {
    Swal.fire({
      title: 'Profile Picture',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'View',
      denyButtonText: 'Edit',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // 👀 View full image
        Swal.fire({
          imageUrl: this.profilePic,
          imageAlt: 'Profile picture',
          showCloseButton: true,
          showConfirmButton: false,
          imageWidth: 350,
          imageHeight: 'auto',
          width: 400,
          color: '#f0fff0'
        });
      } else if (result.isDenied) {
        const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
        fileInput?.click();
      }
    });
  }


}
