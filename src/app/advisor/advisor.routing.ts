import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvisorLoginComponent } from './advisor-login/advisor-login.component';
import { AdvisorSignupComponent } from './advisor-signup/advisor-signup.component';
import { AdvsiorReferalSignupComponent } from './advsior-referal-signup/advsior-referal-signup.component';


export const homeRoutes: Routes = [

  { path: 'advisor-login', component: AdvisorLoginComponent },
  { path: 'advisor-signup/:token', component: AdvisorSignupComponent },
  { path: 'advisor-referal-signup/:id', component: AdvsiorReferalSignupComponent },
]

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class AdvisorRoutingModule { }
