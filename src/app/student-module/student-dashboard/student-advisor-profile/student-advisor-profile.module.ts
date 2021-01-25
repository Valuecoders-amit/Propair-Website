import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { studentAdvisorProfileRoutes } from './student-advisor-profile.routing'
import { FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MoreStr} from './more.pipe';
import { MemberShip} from './joined.pipe';
import { StudentAdvisorProfileComponent } from './student-advisor-profile/student-advisor-profile.component';
import { StudentAdvisorBiographyComponent } from './student-advisor-biography/student-advisor-biography.component';
import { StudentAdvisorCarrierComponent } from './student-advisor-carrier/student-advisor-carrier.component';
import { StudentAdvisorEducationComponent } from './student-advisor-education/student-advisor-education.component';
import { StudentAdvisorAdviceComponent } from './student-advisor-advice/student-advisor-advice.component';

@NgModule({
  declarations: [StudentAdvisorProfileComponent, StudentAdvisorBiographyComponent, MoreStr,MemberShip,StudentAdvisorCarrierComponent, StudentAdvisorEducationComponent, StudentAdvisorAdviceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(studentAdvisorProfileRoutes),
    ModalModule.forRoot(),
    FormsModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class StudentAdvisorProfileModule { }
