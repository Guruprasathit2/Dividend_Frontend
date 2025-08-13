import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppFormComponent } from './form/app-form.component';
import { FormListComponent } from './form-list/form-list.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividendMSTRComponent } from './dividend-mstr/dividend-mstr.component';
import { DividendListComponent } from './dividend-list/dividend-list.component';
import { BrokComponent } from './brok/brok.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DividenedFileCreationComponent } from './dividened-file-creation/dividened-file-creation.component';
import { ProfileComponent } from './profile/profile.component';
import { RoleComponent } from './role/role.component';
import { UserRoleComponent } from './user-role/user-role.component';

const routes: Routes = [
  { path: '', redirectTo: '/login_page', pathMatch: 'full' },
  { path: 'login_page', component: LoginpageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'home_page', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'home_page/form', component: AppFormComponent, canActivate: [AuthGuard] },
  { path: 'home_page/form/form-list', component: FormListComponent, canActivate: [AuthGuard] },
  { path: 'home_page/mstr-list', component: DividendMSTRComponent, canActivate: [AuthGuard] },
  { path: 'home_page/dividend-list', component: DividendListComponent, canActivate: [AuthGuard] },
  { path: 'home_page/brok', component: BrokComponent, canActivate: [AuthGuard] },
  { path: 'home_page/dividened-file', component: DividenedFileCreationComponent, canActivate: [AuthGuard]},
  { path: 'home_page/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'home_page/role', component: RoleComponent, canActivate: [AuthGuard] },
  { path: 'home_page/user/role', component: UserRoleComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [
    AppComponent,
    AppFormComponent,
    FormListComponent,
    DividendMSTRComponent,
    DividendListComponent,
    BrokComponent,
    HomePageComponent,
    LoginpageComponent,
    SignUpPageComponent,
    DividenedFileCreationComponent,
    ProfileComponent,
    RoleComponent,
    UserRoleComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      preventDuplicates: true,
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
