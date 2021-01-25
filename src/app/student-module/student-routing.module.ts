import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentModuleComponent } from './student-module.component';
// import { StudentLoginComponent } from '../student-landing/student-login/student-login.component';

export const studentModuleRoutes: Routes = [
    {
        path: "",
        component: StudentModuleComponent,
        children: [
            {
                path:"",
                redirectTo: "dashboard",
                pathMatch: 'full'
            },
            {
                path: "dashboard", 
                loadChildren: './student-dashboard/student-dashboard.module#StudentDashboardModule'
            },
        ]
    },

]
@NgModule({
    imports: [RouterModule.forChild(studentModuleRoutes)],
    exports: [RouterModule]
})
export class StudentRoutingModule { }
