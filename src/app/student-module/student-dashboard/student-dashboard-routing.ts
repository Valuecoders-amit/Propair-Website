import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentDashboardComponent } from './student-dashboard.component';
import { StudentStatsComponent } from './student-stats/student-stats.component'
import { StudentMessageComponent } from './student-message/student-message.component'
import { NewStudentMessageComponent } from './new-student-message/new-student-message.component'
import { StudentMessageIIComponent } from './student-message-ii/student-message-ii.component';
import { ViewMessageComponent } from './view-message/view-message.component'
import { InboxViewMessageComponent } from './inbox-view-message/inbox-view-message.component';
import { OutboxViewMessageComponent } from './outbox-view-message/outbox-view-message.component';
import { ArchiveViewMessageComponent } from './archive-view-message/archive-view-message.component';
import { PropairViewMessageComponent } from './propair-view-message/propair-view-message.component';
import { NewExchangeViewMessageComponent } from './new-exchange-view-message/new-exchange-view-message.component';
import { StudentHelpCenterComponent } from './student-help-center/student-help-center.component';



export const dashboardRoutes: Routes = [

    {
        path:"",
        component:StudentDashboardComponent,
        children: [
          {
            path: '',
            redirectTo: "stats",
            pathMatch: 'full'
          },
          {
            path: "stats",
            component: StudentStatsComponent
          },

          {
            path: "student-message",
            component: StudentMessageComponent
          },
          {
            path: "new-student-message",
            component: NewStudentMessageComponent
          },
          {
            path: 'Step2',
            component: StudentMessageIIComponent
          },
          {
            path: 'view-message/:id',
            component: ViewMessageComponent
          },

          {
            path: "student-library",
            loadChildren: "./student-library/student-library.module#StudentLibraryModule"
          },

          {
            path: "student-advisor-profile/:id",
            loadChildren: "./student-advisor-profile/student-advisor-profile.module#StudentAdvisorProfileModule"
          },
          {
            path: "student-my-message",
            loadChildren: "./student-my-message/student-my-message.module#StudentMyMessageModule"
          },
          {
            path: "student-profile",
            loadChildren: "./student-profile/student-profile.module#StudentProfileModule"
          },

          { 
            path: "message-exchange",
            loadChildren: "./message-exchange/message-exchange.module#MessageExchangeModule"
          },

          { 
            path: "student-settings",
            loadChildren: "./student-settings/student-settings.module#StudentSettingsModule"
          },
  
          {
            path: 'inbox-view-message/:id',
            component: InboxViewMessageComponent
          },

          {
            path: 'outbox-view-message/:id',
            component: OutboxViewMessageComponent
          },
          {
            path: 'archive-view-message/:id',
            component: ArchiveViewMessageComponent
          },
          {
            path: 'propair-view-message/:id',
            component: PropairViewMessageComponent
          },
          {
            path: 'new-exchange-view-message/:id',
            component: NewExchangeViewMessageComponent
          },
          {
            path : 'student-helpCenter',
            component: StudentHelpCenterComponent
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class StudentDashboardRoutingModule {}
