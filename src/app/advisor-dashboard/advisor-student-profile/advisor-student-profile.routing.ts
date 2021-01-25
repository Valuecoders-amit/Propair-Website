
import {Routes} from '@angular/router';
import { AdvisorStudentProfileComponent } from './advisor-student-profile/advisor-student-profile.component';
import { AdvisorStudentCarrierComponent } from './advisor-student-carrier/advisor-student-carrier.component';
import { AdvisorStudentWatchedComponent } from './advisor-student-watched/advisor-student-watched.component';
import { AdvisorStudentBiographyComponent } from './advisor-student-biography/advisor-student-biography.component';



export const AdvisorStudentProfileRoutes:Routes=[

    {
        path: '',
        component: AdvisorStudentProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'advisor-student-biography',
            pathMatch: 'full'
          },
          
          {
            path: 'advisor-student-biography',
            component: AdvisorStudentBiographyComponent
          },
          {
            path: 'advisor-student-career',
            component: AdvisorStudentCarrierComponent
          },
          {
            path: 'advisor-student-achievements',
            loadChildren : "./advisor-student-achievement/advisor-student-achievement.module#AdvisorStudentAchievementModule"
            // component: StudentCarrierComponent
  
          },
          {
            path : 'advisor-student-watched',
            component: AdvisorStudentWatchedComponent
          }
         
        ]
      }
]