import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { educatorStudentProfileRoutes } from './educator-student-profile.routing'
import { FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import {MoreStr} from './more.pipe';
import { MemberShip} from './joined.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EducatorStudentProfileComponent } from './educator-student-profile/educator-student-profile.component';
import { EducatorStudentCarrierComponent } from './educator-student-carrier/educator-student-carrier.component';
import { EducatorStudentWatchedComponent } from './educator-student-watched/educator-student-watched.component';
import { EducatorStudentBiographyComponent } from './educator-student-biography/educator-student-biography.component';



@NgModule({
  declarations: [EducatorStudentProfileComponent, 
    EducatorStudentCarrierComponent, 
    EducatorStudentWatchedComponent, 
    EducatorStudentBiographyComponent,
    MemberShip,
    MoreStr
  ],
  
  imports: [
    CommonModule,
    RouterModule.forChild(educatorStudentProfileRoutes),
    ModalModule.forRoot(),
    FormsModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class EducatorStudentProfileModule { }
