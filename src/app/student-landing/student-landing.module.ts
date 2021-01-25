import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentLoginComponent } from '../student-landing/student-login/student-login.component';
import { StudentSignupComponent } from '../student-landing/student-signup/student-signup.component';
import { studentHomeRoutingModule } from './student-Landingrouting';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentLandingComponent } from './student-landing/student-landing.component';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [StudentLoginComponent, StudentSignupComponent, StudentLandingComponent,],
  imports: [
    CommonModule,studentHomeRoutingModule, FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class StudentLandingModule { }
