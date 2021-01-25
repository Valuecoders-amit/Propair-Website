
import {Routes} from '@angular/router';
import { EducatorAdvsiorProfileComponent } from './educator-advsior-profile/educator-advsior-profile.component';
import { EducatorAdvsiorCarrierComponent } from './educator-advsior-carrier/educator-advsior-carrier.component';
import { EducatorAdvsiorBiographyComponent } from './educator-advsior-biography/educator-advsior-biography.component';
import { EducatorAdvsiorAdviceComponent } from './educator-advsior-advice/educator-advsior-advice.component';
import { EducatorAdvsiorEducationComponent } from './educator-advsior-education/educator-advsior-education.component';



export const educatorAdvisorProfileRoutes:Routes=[

    {
        path: '',
        component: EducatorAdvsiorProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'educator-advisor-biography',
            pathMatch: 'full'
          },
          
          {
            path: 'educator-advisor-biography',
            component: EducatorAdvsiorBiographyComponent
          },
          {
            path: 'educator-advisor-career',
            component: EducatorAdvsiorCarrierComponent
          },
            {
              path : 'educator-advisor-education',
              component: EducatorAdvsiorEducationComponent
            },
          {
            path : 'educator-advisor-advice',
            component: EducatorAdvsiorAdviceComponent
          },
         
        ]
      }
    

  ]