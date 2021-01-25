import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AdvisorStudentProfileRoutes } from './advisor-student-profile.routing'
import { FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import {MoreStr} from './more.pipe';
import { MemberShip} from './joined.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdvisorStudentProfileComponent } from './advisor-student-profile/advisor-student-profile.component';
import { AdvisorStudentCarrierComponent } from './advisor-student-carrier/advisor-student-carrier.component';
import { AdvisorStudentWatchedComponent } from './advisor-student-watched/advisor-student-watched.component';
import { AdvisorStudentBiographyComponent } from './advisor-student-biography/advisor-student-biography.component';

@NgModule({
  declarations: [AdvisorStudentProfileComponent, AdvisorStudentCarrierComponent, AdvisorStudentWatchedComponent, AdvisorStudentBiographyComponent,MoreStr,MemberShip],
  imports: [
    CommonModule,
    RouterModule.forChild(AdvisorStudentProfileRoutes),
    ModalModule.forRoot(),
    FormsModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class AdvisorStudentProfileModule { }
