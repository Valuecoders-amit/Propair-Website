
import {Routes} from '@angular/router';
import { EducatorBillingCreditsComponent } from './educator-billing-credits.component';
import { EducatorBillingComponent } from './educator-billing/educator-billing.component'
import { EducatorStudentsCreditsComponent } from './educator-students-credits/educator-students-credits.component'
import { EducatorPaymentMethodComponent } from './educator-payment-method/educator-payment-method.component'


// import { EducatorAdvsiorProfileComponent } from './educator-advsior-profile/educator-advsior-profile.component';
// import { EducatorAdvsiorCarrierComponent } from './educator-advsior-carrier/educator-advsior-carrier.component';
// import { EducatorAdvsiorBiographyComponent } from './educator-advsior-biography/educator-advsior-biography.component';
// import { EducatorAdvsiorAdviceComponent } from './educator-advsior-advice/educator-advsior-advice.component';
// import { EducatorAdvsiorEducationComponent } from './educator-advsior-education/educator-advsior-education.component';



export const educatorBillingCreditsRoutes:Routes=[

    {
        path: '',
        component: EducatorBillingCreditsComponent,
        children: [
            {
                path: '',
                redirectTo: 'membership',
                pathMatch: 'full'
              },
          
          {
            path: 'membership',
            loadChildren: "./educator-membership/educator-membership.module#EducatorMembershipModule"
          },
          {
            path: 'billing',
            component: EducatorBillingComponent
          },
            {
              path : 'student-credits',
              component: EducatorStudentsCreditsComponent
            },
          {
            path : 'payment-method',
            component: EducatorPaymentMethodComponent
          },
         
        ]
      }
    

  ]