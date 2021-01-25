
import {Routes} from '@angular/router';
import { EducatorStudentAchievementsComponent } from './educator-student-achievements/educator-student-achievements.component';
import { EducatorStudentEducationComponent } from './educator-student-education/educator-student-education.component';
import { EducatorStudentExtrasComponent } from './educator-student-extras/educator-student-extras.component';
import { EducatorStudentSkillsComponent } from './educator-student-skills/educator-student-skills.component';
import { EducatorStudentWorkComponent } from './educator-student-work/educator-student-work.component';



export const educatorStudentAchievementRoutes:Routes=[
    
    {
      path: '',
      component: EducatorStudentAchievementsComponent,
      children: [
        {
          path: '',
          redirectTo: 'educator-student-education',
          pathMatch: 'full'
        },
        {
          path: 'educator-student-education',
          component: EducatorStudentEducationComponent
        },
        {
          path: 'educator-student-work',
          component: EducatorStudentWorkComponent
        },
        {
          path: 'educator-student-extras',
          component: EducatorStudentExtrasComponent

        },
        {
          path : 'educator-student-skill',
          component: EducatorStudentSkillsComponent
        }
       
      ]
    }
  ]