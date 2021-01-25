import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {educatorMembershipRoutes } from './educator-membership.routing';
import { CurrentPlanComponent } from './current-plan/current-plan.component';
import { AvailableMembershipsComponent } from './available-memberships/available-memberships.component';
import { ChangePlanComponent } from './change-plan/change-plan.component';
import { EducatorMembershipComponent } from './educator-membership/educator-membership.component';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Comma } from './comma.pipe'

@NgModule({
  declarations: [CurrentPlanComponent, AvailableMembershipsComponent, ChangePlanComponent, EducatorMembershipComponent, Comma],
  imports: [
    CommonModule,
    RouterModule.forChild(educatorMembershipRoutes),
    Ng5SliderModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EducatorMembershipModule { }
