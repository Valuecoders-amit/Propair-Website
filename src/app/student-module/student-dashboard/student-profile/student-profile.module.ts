import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MoreStr} from './more.pipe';
import { MemberShip} from './joined.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentBiographyComponent } from './student-biography/student-biography.component';
import { StudentCarrierComponent } from './student-carrier/student-carrier.component';
import { StudentWatchedComponent } from './student-watched/student-watched.component';
import { studentProfileRoutes } from './student-profile.routing';
import { FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [StudentProfileComponent, StudentBiographyComponent, StudentCarrierComponent, StudentWatchedComponent,MoreStr , MemberShip],
  imports: [
    CommonModule,
    RouterModule.forChild(studentProfileRoutes),
    ModalModule.forRoot(),
    FormsModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class StudentProfileModule { }
