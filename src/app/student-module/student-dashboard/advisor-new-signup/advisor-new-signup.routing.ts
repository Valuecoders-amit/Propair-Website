import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdvisorNewSignupComponent } from './advisor-new-signup.component';
import { AdvisorNewSignup1Component } from './advisor-new-signup1/advisor-new-signup1.component';
import { AdvisorNewSignup2Component } from './advisor-new-signup2/advisor-new-signup2.component';
import { AdvisorNewSignup3Component } from './advisor-new-signup3/advisor-new-signup3.component';
import { AdvisorNewSignup4Component } from './advisor-new-signup4/advisor-new-signup4.component';
import { AdvisorNewSignup5Component } from './advisor-new-signup5/advisor-new-signup5.component';
import { AdvisorNewSignup6Component } from './advisor-new-signup6/advisor-new-signup6.component'




export const advisorNewSignupRoutes: Routes = [

  {
    path: '',
    component: AdvisorNewSignupComponent,
    children: [
      {
        path: '',
        redirectTo: 'advisor-new-message1',
        pathMatch: 'full'
      },
      {
        path: 'advisor-new-message1',
        component: AdvisorNewSignup1Component
      },
      {
        path: 'advisor-new-message2',
        component: AdvisorNewSignup2Component
      },
      {
        path: 'advisor-new-message3',
        component: AdvisorNewSignup3Component
      },
      {
        path: 'advisor-new-message4',
        component: AdvisorNewSignup4Component
      },
      {
        path: 'advisor-new-message5',
        component: AdvisorNewSignup5Component
      },

      {
        path: 'advisor-new-message6',
        component: AdvisorNewSignup6Component
      },

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(advisorNewSignupRoutes)],
  exports: [RouterModule]
})
export class AdvisorNewSignupRoutingModule {}