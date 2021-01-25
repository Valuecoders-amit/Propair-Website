import { Routes } from '@angular/router';
import { AdvisorSettingsComponent } from './advisor-settings/advisor-settings.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { InviteSettingsComponent } from './invite-settings/invite-settings.component';

 export const advisorSettingsRoutes:Routes=[
    
    {
      path: '',
      component: AdvisorSettingsComponent,
      children: [
        {
          path: '',
          redirectTo: 'general-setting',
          pathMatch: 'full'
        },
        {
          path: 'general-setting',
          component: GeneralSettingsComponent
        },
        {
          path: 'notification-setting',
          component: NotificationSettingsComponent
        },
        {
          path: 'invite-setting',
          component: InviteSettingsComponent

        },
       
       
      ]
    }
  ]



