
import {Routes} from '@angular/router';
import { StudentAdvisorProfileComponent } from './student-advisor-profile/student-advisor-profile.component';
import { StudentAdvisorBiographyComponent } from './student-advisor-biography/student-advisor-biography.component';
import { StudentAdvisorCarrierComponent } from './student-advisor-carrier/student-advisor-carrier.component';
import { StudentAdvisorEducationComponent } from './student-advisor-education/student-advisor-education.component';
import { StudentAdvisorAdviceComponent } from './student-advisor-advice/student-advisor-advice.component';



export const studentAdvisorProfileRoutes:Routes=[

    {
        path: '',
        component: StudentAdvisorProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'student-advisor-biography',
            pathMatch: 'full'
          },
          
          {
            path: 'student-advisor-biography',
            component: StudentAdvisorBiographyComponent
          },
          {
            path: 'student-advisor-career',
            component: StudentAdvisorCarrierComponent
          },
            {
              path : 'student-advisor-education',
              component: StudentAdvisorEducationComponent
            },
          {
            path : 'student-advisor-advice',
            component: StudentAdvisorAdviceComponent
          },
         
        ]
      }
    

  ]