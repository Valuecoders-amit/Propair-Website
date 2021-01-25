import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DraftMessageComponent } from './draft-message/draft-message.component';
import { LiveMessageComponent } from './live-message/live-message.component';
import { NewMessageComponent } from './new-message/new-message.component'


export const dashboardRoutes: Routes = [

    {
        path: '',
        component: DraftMessageComponent,
        children: [
          {
            path: '',
            redirectTo: 'live',
            pathMatch: 'full'
          },
          {
            path: 'live',
            component: LiveMessageComponent
          },
          {
            path: 'new',
            component: NewMessageComponent
          },
        ]
      }
    
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DraftMessageRoutingModule {}