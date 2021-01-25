import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { StudentDirectoryRoutingModule } from './student-directory-routing.module'
import { BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { StudentDirectoryComponent } from './student-directory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [StudentDetailComponent,StudentDirectoryComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxSpinnerModule,
    StudentDirectoryRoutingModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    FontAwesomeModule,
    NgMultiSelectDropDownModule,
    AngularMultiSelectModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA] 
})
export class StudentDirectoryModule { }
