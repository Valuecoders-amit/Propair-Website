import { Routes } from '@angular/router';
import { StudentRequestComponent } from './student-request/student-request.component';
import { OpenRequestComponent } from './open-request/open-request.component';
import { RequestReferredComponent } from './request-referred/request-referred.component';
import { OpenDetailingComponent } from './open-detailing/open-detailing.component';


 export const studentRequestRoutes:Routes=[
    
    {
      path: '',
      component: StudentRequestComponent,
      children: [
        {
          path: '',
          redirectTo: 'open-request',
          pathMatch: 'full'
        },
        {
          path: 'open-request',
          component: OpenRequestComponent
        },
        {
          path: 'request-referred',
          component: RequestReferredComponent
        },
        // {
        //   path: 'open-detailing/:id',
        //   component: OpenDetailingComponent

        // },
       
       
      ]
    }
  ]



