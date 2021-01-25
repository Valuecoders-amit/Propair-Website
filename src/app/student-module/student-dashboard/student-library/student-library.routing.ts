import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentLibraryComponent } from './student-library.component';
import { StudentQuestionListComponent } from './student-question-list/student-question-list.component';
import { StudentMessageReplyComponent } from './student-message-reply/student-message-reply.component'



export const dashboardRoutes: Routes = [

  {
    path: '',
    component: StudentLibraryComponent,
    children: [
      {
        path: '',
        redirectTo: 'student-question-list',
        pathMatch: 'full'
      },
      {
        path: 'student-question-list',
        component: StudentQuestionListComponent
      },
      {
        path: 'student-question-reply/:id',
        component: StudentMessageReplyComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class StudentLibraryRoutingModule {}