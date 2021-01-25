import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentDirectoryComponent } from './student-directory.component';

const routes: Routes = [
    {
        path: '',
        component: StudentDirectoryComponent,
        children: [
          {
            path: ':id',
            component: StudentDetailComponent
          }
        ]
      }

  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class StudentDirectoryRoutingModule { }