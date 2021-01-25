import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentSignupComponent } from './student-signup/student-signup.component';
import { StudentLandingComponent } from './student-landing/student-landing.component';


export const studentHomeRoutes:Routes=[
  {path:'',
  component:StudentLandingComponent,children:[
    {path:"studentLogin",component:StudentLoginComponent},
    {path:"studentSignup/:token",component:StudentSignupComponent}
  ]},
  
]

@NgModule({
    imports: [RouterModule.forChild(studentHomeRoutes)],
    exports: [RouterModule]
  })
  export class studentHomeRoutingModule { }