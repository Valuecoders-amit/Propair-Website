import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MemberShip } from './joined.pipe';
import { EducatorStudentAchievementsComponent } from './educator-student-achievements/educator-student-achievements.component';
import { EducatorStudentEducationComponent } from './educator-student-education/educator-student-education.component';
import { EducatorStudentExtrasComponent } from './educator-student-extras/educator-student-extras.component';
import { EducatorStudentSkillsComponent } from './educator-student-skills/educator-student-skills.component';
import { EducatorStudentWorkComponent } from './educator-student-work/educator-student-work.component';
import { educatorStudentAchievementRoutes } from './educator-student-achievements.routing'
@NgModule({
  declarations: [EducatorStudentAchievementsComponent, 
    EducatorStudentEducationComponent, 
    EducatorStudentExtrasComponent, 
    EducatorStudentSkillsComponent,
     EducatorStudentWorkComponent,
     MemberShip],
     
  imports: [
    CommonModule,
    RouterModule.forChild(educatorStudentAchievementRoutes),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    SelectDropDownModule
  ]
})
export class EducatorStudentAchievementModule { }
