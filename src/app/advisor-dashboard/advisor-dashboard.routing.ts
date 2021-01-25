import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdvisorDashboardComponent } from "./advisor-dashboard.component";
import { DashoardComponent } from "./dashoard/dashoard.component";
import { AdvisorArchiveViewMessageComponent } from "./advisor-archive-view-message/advisor-archive-view-message.component";
import { AdvisorDraftViewMessageComponent } from "./advisor-draft-view-message/advisor-draft-view-message.component";
import { AdvisorInboxViewMessageComponent } from "./advisor-inbox-view-message/advisor-inbox-view-message.component";

import { OpenDetailingComponent } from "./student-request/open-detailing/open-detailing.component";
import { AdvisorHelpCenterComponent } from './advisor-help-center/advisor-help-center.component';
import { AdvisorPropairViewMessageComponent } from './advisor-propair-view-message/advisor-propair-view-message.component';
import { RequestDetailComponent } from './student-request/request-detail/request-detail.component';

export const advisorDashboardRoutes: Routes = [
  {
    path: "",
    component: AdvisorDashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "stats",
        pathMatch: "full",
      },

      {
        path: "stats",
        component: DashoardComponent
      },
      {
        path: "advisor-setting",
        loadChildren:"./advisor-settings/advisor-settings.module#AdvisorSettingsModule"
      },
      {
        path: "student-requests",
        loadChildren: "./student-request/student-request.module#StudentRequestModule"
      },
      {
        path: "open-detailing/:id",
        component: OpenDetailingComponent,
      },
      {
        path: "request-detailing/:id",
        component: RequestDetailComponent,
      },
      {
        path: "advisor-my-message",
        loadChildren: "./advisor-my-message/advisor-my-message.module#AdvisorMyMessageModule",
      },
      {
        path: "advisor-student-profile/:id",
        loadChildren:"./advisor-student-profile/advisor-student-profile.module#AdvisorStudentProfileModule",
      },
      {
        path: "advisor-profile",
        loadChildren:"./advisor-profile/advisor-profile.module#AdvisorProfileModule",
      },
      {
        path: "advisor-stats",
        loadChildren: "./advisor-stats/advisor-stats.module#AdvisorStatsModule",
      },
      {
        path: "advisor-inbox-view-message/:id",
        component: AdvisorInboxViewMessageComponent,
      },
      {
        path: "advisor-draft-view-message/:id",
        component: AdvisorDraftViewMessageComponent,
      },
      {
        path: "advisor-archive-view-message/:id",
        component: AdvisorArchiveViewMessageComponent,
      },
      {
        path:"advisor-propair-view-message/:id",
        component: AdvisorPropairViewMessageComponent,
      },
      {
        path: "advisor-helpCenter", 
        component : AdvisorHelpCenterComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(advisorDashboardRoutes)],
  exports: [RouterModule],
})
export class AdvisorDashboardRoutingModule {}
