
import {Routes} from '@angular/router';
import {StudentAchievementComponent} from './student-achievement/student-achievement.component';

import {StudentEducationComponent} from './student-education/student-education.component';
import {StudentExtrasComponent} from './student-extras/student-extras.component';
import {StudentSkillsComponent} from './student-skills/student-skills.component';
import {StudentWorkComponent} from './student-work/student-work.component';



export const studentAchievementRoutes:Routes=[
    
    {
      path: '',
      component: StudentAchievementComponent,
      children: [
        {
          path: '',
          redirectTo: 'student-education',
          pathMatch: 'full'
        },
        {
          path: 'student-education',
          component: StudentEducationComponent
        },
        {
          path: 'student-work',
          component: StudentWorkComponent
        },
        {
          path: 'student-extras',
          component: StudentExtrasComponent

        },
        {
          path : 'student-skill',
          component: StudentSkillsComponent
        }
       
      ]
    }
  ]