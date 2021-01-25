import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner"; 
import { OpenRequestComponent } from './open-request/open-request.component';
import { RequestReferredComponent } from './request-referred/request-referred.component';
// import { OpenDetailingComponent } from './open-detailing/open-detailing.component';
import { StudentRequestComponent } from './student-request/student-request.component';
import {studentRequestRoutes} from './student-request.routing';
import { MoreStr ,Joined } from "./more.pipe";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RequestDetailComponent } from './request-detail/request-detail.component';


@NgModule({
  declarations: [OpenRequestComponent, RequestReferredComponent, StudentRequestComponent,MoreStr ,Joined],
  imports: [
    CommonModule,
    RouterModule.forChild(studentRequestRoutes),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA] 
})
export class StudentRequestModule { }
