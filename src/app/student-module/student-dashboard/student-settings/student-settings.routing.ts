import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentSettingsComponent } from './student-settings.component';
import { StudentGeneralComponent } from './student-general/student-general.component';
import { StudentCreditsComponent } from './student-credits/student-credits.component'




export const studentSettingsRoutes: Routes = [

    {
        path: '',
        component: StudentSettingsComponent,
        children: [
          {
            path: '',
            redirectTo: 'general',
            pathMatch: 'full'
          },
          {
            path: 'general',
            component: StudentGeneralComponent
          },
          {
            path: 'credits',
            component: StudentCreditsComponent
          },
        ]
      }



];

@NgModule({
  imports: [RouterModule.forChild(studentSettingsRoutes)],
  exports: [RouterModule]
})
export class StudentSettingsRoutingModule {}