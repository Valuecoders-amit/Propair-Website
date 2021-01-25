import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './library.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { MessageReplyComponent } from './message-reply/message-reply.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    children: [
      {
        path: '',
        redirectTo: 'question-list',
        pathMatch: 'full'
      },
      {
        path: 'question-list',
        component: QuestionListComponent
      },
      {
        path: 'question-reply/:id',
        component: MessageReplyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
