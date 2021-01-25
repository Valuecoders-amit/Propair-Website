import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { StatsComponent } from "./stats/stats.component";
import { GroupAnalyticsComponent } from "./group-analytics/group-analytics.component";
import { SettingsComponent } from "./settings/settings.component";
import { HelpCenterComponent } from "./help-center/help-center.component";
import { StudentDirectoryComponent } from "./student-directory/student-directory.component";
import { NotificationComponent } from "./notification/notification.component";
import { BillingCreditsComponent } from './billing-credits/billing-credits.component';
import { InvoiceComponent } from './invoice/invoice.component';


export const dashboardRoutes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "stats",
        pathMatch: "full"
      },
      {
        path: "stats",
        component: StatsComponent
      },
      {
        path: "invoice/:id",
        component: InvoiceComponent
      },
      {
        path: "library",
        loadChildren: "./library/library.module#LibraryModule"
      },
      { path: "group-analytics", component: GroupAnalyticsComponent },
      { path: "billing-credits", component: BillingCreditsComponent },

      { path: "settings", component: SettingsComponent },
      { path: "settings/notifications", component: NotificationComponent },
      { path: "helpCenter", component: HelpCenterComponent },
      {
        path: "studentDirectory",
        loadChildren:
          "./student-directory/student-directory.module#StudentDirectoryModule"
      },
      
      {
        path: "educator-student-profile/:id",
        loadChildren:
          "./educator-student-profile/educator-student-profile.module#EducatorStudentProfileModule"
      },
      {
        path: "educator-advisor-profile/:id",
        loadChildren:
          "./educator-advisor-profile/educator-advisor-profile.module#EducatorAdvisorProfileModule"
      },
      {
        path: "educator-billing-credits",
        loadChildren:
          "./educator-billing-credits/educator-billing-credits.module#EducatorBillingCreditsModule"
      },
      {
        path: "educator-settings",
        loadChildren:
          "./educator-settings/educator-settings.module#EducatorSettingsModule"
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
