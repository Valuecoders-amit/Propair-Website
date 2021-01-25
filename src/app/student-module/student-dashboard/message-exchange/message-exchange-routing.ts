import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MessageExchangeComponent } from './message-exchange.component';

import { MessageExchange1Component } from './message-exchange1/message-exchange1.component';
import { MessageExchange2Component } from './message-exchange2/message-exchange2.component';
import { MessageExchange3Component } from './message-exchange3/message-exchange3.component';
import { MessageExchange4Component } from './message-exchange4/message-exchange4.component';





export const dashboardRoutes: Routes = [

    {
        path: '',
        component: MessageExchangeComponent,
        children: [
          {
            path: '',
            redirectTo: 'message-exchange1',
            pathMatch: 'full'
          },
          {
            path: 'message-exchange1',
            component: MessageExchange1Component
          },
          {
            path: 'message-exchange1/:id',
            component: MessageExchange1Component
          },
          {
            path: 'message-exchange2',
            component: MessageExchange2Component
          },
          {
            path: 'message-exchange2/:id',
            component: MessageExchange2Component
          },
          {
            path: 'message-exchange3',
            component: MessageExchange3Component
          },

          {
            path: 'message-exchange3/:id',
            component: MessageExchange3Component
          },
          {
            path: 'message-exchange4',
            component: MessageExchange4Component
          },
          {
            path: 'message-exchange4/:id',
            component: MessageExchange4Component
          }
        ]
      }


];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class MessageExchangeRoutingModule {}