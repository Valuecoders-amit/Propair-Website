import { Routes } from '@angular/router';

import {AdvisorProfileComponent} from './advisor-profile/advisor-profile.component';
import {AdvisorBiographyComponent} from './advisor-biography/advisor-biography.component';
import {AdvisorCareerComponent} from './advisor-career/advisor-career.component';
import {AdvisorEducationComponent} from './advisor-education/advisor-education.component';
import {AdvisorAdviceComponent} from './advisor-advice/advisor-advice.component';

 export const advisorProfileRoutes:Routes=[
    
    {
      path: '',
      component: AdvisorProfileComponent,
      children: [
        {
          path: '',
          redirectTo: 'advisor-biography',
          pathMatch: 'full'
        },
        {
          path: 'advisor-biography',
          component: AdvisorBiographyComponent
        },
        {
          path: 'advisor-career',
          component: AdvisorCareerComponent
        },
        {
          path: 'advisor-education',
          component: AdvisorEducationComponent

        },
        {
          path : 'advisor-advice',
          component: AdvisorAdviceComponent
        }
       
      ]
    }
  ]



