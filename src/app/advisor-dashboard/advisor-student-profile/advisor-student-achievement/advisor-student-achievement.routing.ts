
import {Routes} from '@angular/router';
import { AdvisorStudentAchievementComponent } from './advisor-student-achievement/advisor-student-achievement.component';
import { AdvisorStudentEducationComponent } from './advisor-student-education/advisor-student-education.component';
import { AdvisorStudentExtrasComponent } from './advisor-student-extras/advisor-student-extras.component';
import { AdvisorStudentSkillsComponent } from './advisor-student-skills/advisor-student-skills.component';
import { AdvisorStudentWorkComponent } from './advisor-student-work/advisor-student-work.component';



export const advisorStudentAchievementRoutes:Routes=[

    {
        path: '',
        component: AdvisorStudentAchievementComponent,
        children: [
          {
            path: '',
            redirectTo: 'advisor-student-education',
            pathMatch: 'full'
          },
          {
            path: 'advisor-student-education',
            component: AdvisorStudentEducationComponent
          },
          {
            path: 'advisor-student-work',
            component: AdvisorStudentWorkComponent
          },
          {
            path: 'advisor-student-extras',
            component: AdvisorStudentExtrasComponent
  
          },
          {
            path : 'advisor-student-skill',
            component: AdvisorStudentSkillsComponent
          }
         
        ]
      }
]