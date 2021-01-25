import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentSidebarComponent } from './student-sidebar/student-sidebar.component';
import { StudentHeaderComponent } from './student-header/student-header.component'
import { StudentModuleComponent } from './student-module.component';

@NgModule({
  declarations: [
    StudentSidebarComponent,
    StudentHeaderComponent,
    StudentModuleComponent
  ],
  imports: [
    CommonModule,StudentRoutingModule,
  ]
})
export class StudentModule { }
