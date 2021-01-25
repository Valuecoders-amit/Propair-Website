import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import {AuthGuard } from './lib/auth/auth.guard';
import { StudentGuard } from './lib/auth/student.guard';
import { AdvisorGuard } from './lib/auth/advisor.guard';
// import { ForgetPasswordComponent } from './forget-password/forget-password.component';


// import {studentLanding} from './student-landing/student-landing.module'
const routes: Routes = [
  // { path: '', redirectTo: 'user', pathMatch: 'full' },
  // { path: '', loadChildren: './main/main.module#MainModule' },
  { path: '', loadChildren: './main/main.module#MainModule' },
  // { path: '', loadChildren: './landing/landing.module#LandingModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',canActivate:[AuthGuard]  },
  {path:'student',loadChildren:'./student-landing/student-landing.module#StudentLandingModule'},
  {path:'student-module',loadChildren:'./student-module/student-module#StudentModule',canActivate:[StudentGuard] },
  {path:'advisor',loadChildren:'./advisor/advisor.module#AdvisorModule' },

  {path:'advisor-dashboard',loadChildren:'./advisor-dashboard/advisor-dashboard.module#AdvisorDashboardModule',canActivate:[AdvisorGuard] },
  {path:'advisor-newsignup/:id' , loadChildren :'./student-module/student-dashboard/advisor-new-signup/advisor-new-signup.module#AdvisorNewSignupModule'},

  { path: '**', component: NotFoundComponent },
  // { path: 'forget', component: ForgetPasswordComponent },
// 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
