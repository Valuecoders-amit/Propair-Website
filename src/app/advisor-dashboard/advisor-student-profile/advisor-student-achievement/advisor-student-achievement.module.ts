import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MemberShip } from './joined.pipe';
import { AdvisorStudentAchievementComponent } from './advisor-student-achievement/advisor-student-achievement.component';
import { AdvisorStudentEducationComponent } from './advisor-student-education/advisor-student-education.component';
import { AdvisorStudentExtrasComponent } from './advisor-student-extras/advisor-student-extras.component';
import { AdvisorStudentSkillsComponent } from './advisor-student-skills/advisor-student-skills.component';
import { AdvisorStudentWorkComponent } from './advisor-student-work/advisor-student-work.component';
import { advisorStudentAchievementRoutes } from './advisor-student-achievement.routing'

@NgModule({
  declarations: [AdvisorStudentAchievementComponent, AdvisorStudentEducationComponent, AdvisorStudentExtrasComponent, AdvisorStudentSkillsComponent, AdvisorStudentWorkComponent,MemberShip],
  imports: [
    CommonModule,
    RouterModule.forChild(advisorStudentAchievementRoutes),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    SelectDropDownModule
  ]
})
export class AdvisorStudentAchievementModule { }
