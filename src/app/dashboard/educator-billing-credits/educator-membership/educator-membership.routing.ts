
import {Routes} from '@angular/router';
import { CurrentPlanComponent } from './current-plan/current-plan.component';
import { AvailableMembershipsComponent } from './available-memberships/available-memberships.component';
import { ChangePlanComponent } from './change-plan/change-plan.component';
import { EducatorMembershipComponent } from './educator-membership/educator-membership.component';





export const educatorMembershipRoutes:Routes=[

    {
        path: '',
        component: EducatorMembershipComponent,
        children: [
          {
            path: '',
            redirectTo: 'current-plan',
            pathMatch: 'full'
          },
          {
            path: 'current-plan',
            component: CurrentPlanComponent
          },
          {
            path: 'available-membership',
            component: AvailableMembershipsComponent
          },
          {
            path: 'change-plan',
            component: ChangePlanComponent
  
          },
         
        ]
      }
  ]