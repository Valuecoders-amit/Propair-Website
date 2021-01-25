import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvisorInboxComponent } from './advisor-inbox/advisor-inbox.component';
import { AdvisorDraftComponent } from './advisor-draft/advisor-draft.component';
import { AdvisorArchiveComponent } from './advisor-archive/advisor-archive.component';
import { AdvisorMyMessageComponent } from './advisor-my-message.component';
import { AdvisorSupportComponent } from './advisor-support/advisor-support.component';





export const advisorMyMessageRoutes:Routes=[

  
    
  {
    path: '',
    component: AdvisorMyMessageComponent,
    children: [
      {
        path: '',
        redirectTo: 'advisor-inbox',
        pathMatch: 'full'
      },
      {
        path: 'advisor-inbox',
        component: AdvisorInboxComponent
      },
      {
        path: 'advisor-draft',
        component: AdvisorDraftComponent
      },
      {
        path: 'advisor-archive',
        component: AdvisorArchiveComponent
      },
      {
        path : 'advisor-support',
        component: AdvisorSupportComponent
      }

    ]
  }
]

@NgModule({
    imports: [RouterModule.forChild(advisorMyMessageRoutes)],
    exports: [RouterModule]
  })
  export class AdvisorMyMessageRoutingModule { }