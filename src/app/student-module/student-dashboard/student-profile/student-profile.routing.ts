
import {Routes} from '@angular/router';
import {StudentProfileComponent} from './student-profile/student-profile.component';
import {StudentBiographyComponent} from './student-biography/student-biography.component';
import {StudentCarrierComponent} from './student-carrier/student-carrier.component';

import {StudentWatchedComponent} from './student-watched/student-watched.component';



export const studentProfileRoutes:Routes=[
    
    {
      path: '',
      component: StudentProfileComponent,
      children: [
        {
          path: '',
          redirectTo: 'student-biography',
          pathMatch: 'full'
        },
        
        {
          path: 'student-biography',
          component: StudentBiographyComponent
        },
        {
          path: 'student-career',
          component: StudentCarrierComponent
        },
        {
          path: 'student-achievements',
          loadChildren : "./student-achievement/student-achievement.module#StudentAchievementModule"
          // component: StudentCarrierComponent

        },
        {
          path : 'student-watched',
          component: StudentWatchedComponent
        }
       
      ]
    }
  ]