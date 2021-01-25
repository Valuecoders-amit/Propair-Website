import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentMyMessageComponent } from './student-my-message.component';
import { InboxComponent } from './inbox/inbox.component';
import { DraftComponent } from './draft/draft.component';
import { OutboxComponent } from './outbox/outbox.component';
import { ArchiveComponent } from './archive/archive.component';
import { PropairSupportComponent } from './propair-support/propair-support.component';



export const dashboardRoutes: Routes = [

  {
    path: '',
    component: StudentMyMessageComponent,
    children: [
      {
        path: '',
        redirectTo: 'inbox',
        pathMatch: 'full'
      },
      {
        path: 'inbox',
        component: InboxComponent
      },
      // {
      //   path: 'draft',
      //   component: DraftComponent
      // },
      {
        path:'draft',
        loadChildren:'./draft-message/draft-message.module#DraftMessageModule'
     },
      {
        path: 'outbox',
        component: OutboxComponent
      },
      {
        path: 'archive',
        component: ArchiveComponent
      },
      {
        path: 'propair-support',
        component: PropairSupportComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class StudentMyMessageRoutingModule {}