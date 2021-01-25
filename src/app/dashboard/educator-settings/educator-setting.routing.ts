
import {Routes} from '@angular/router';
import { EducatorGeneralComponent } from './educator-general/educator-general.component';
import { EducatorNotificationsComponent } from './educator-notifications/educator-notifications.component';
import { EducatorSettingsComponent } from './educator-settings/educator-settings.component';


// import { EducatorAdvsiorProfileComponent } from './educator-advsior-profile/educator-advsior-profile.component';
// import { EducatorAdvsiorCarrierComponent } from './educator-advsior-carrier/educator-advsior-carrier.component';
// import { EducatorAdvsiorBiographyComponent } from './educator-advsior-biography/educator-advsior-biography.component';
// import { EducatorAdvsiorAdviceComponent } from './educator-advsior-advice/educator-advsior-advice.component';
// import { EducatorAdvsiorEducationComponent } from './educator-advsior-education/educator-advsior-education.component';



export const educatorSettingsRoutes:Routes=[

    {
        path: '',
        component: EducatorSettingsComponent,
        children: [
          {
            path: '',
            redirectTo: 'educator-general',
            pathMatch: 'full'
          },
          {
            path: 'educator-general',
            component: EducatorGeneralComponent
          },
          {
            path: 'educator-notification',
            component: EducatorNotificationsComponent
          },
        ]
    }
  ]