
import {Routes} from '@angular/router';
import { EducatorStudentProfileComponent } from './educator-student-profile/educator-student-profile.component';
import { EducatorStudentCarrierComponent } from './educator-student-carrier/educator-student-carrier.component';
import { EducatorStudentWatchedComponent } from './educator-student-watched/educator-student-watched.component';
import { EducatorStudentBiographyComponent } from './educator-student-biography/educator-student-biography.component';



export const educatorStudentProfileRoutes:Routes=[

    {
        path: '',
        component: EducatorStudentProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'educator-student-biography',
            pathMatch: 'full'
          },
          
          {
            path: 'educator-student-biography',
            component: EducatorStudentBiographyComponent
          },
          {
            path: 'educator-student-career',
            component: EducatorStudentCarrierComponent
          },
          {
            path: 'educator-student-achievements',
            loadChildren : "./educator-student-achievement/educator-student-achievement.module#EducatorStudentAchievementModule"
            // component: StudentCarrierComponent
  
          },
          {
            path : 'educator-student-watched',
            component: EducatorStudentWatchedComponent
          }
         
        ]
      }
    

  ]