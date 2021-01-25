import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MemberShip } from './joined.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { StudentEducationComponent } from './student-education/student-education.component';
import { StudentWorkComponent } from './student-work/student-work.component';
import { StudentExtrasComponent } from './student-extras/student-extras.component';
import { StudentSkillsComponent } from './student-skills/student-skills.component';
import { StudentAchievementComponent } from './student-achievement/student-achievement.component';
import {studentAchievementRoutes} from './student-achievement.routing';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [StudentEducationComponent, StudentWorkComponent, StudentExtrasComponent, StudentSkillsComponent, StudentAchievementComponent, MemberShip],
  imports: [
    GooglePlaceModule,
    CommonModule,
    RouterModule.forChild(studentAchievementRoutes),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    SelectDropDownModule,
   
  ]
})
export class StudentAchievementModule { }
