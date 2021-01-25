import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageExchangeRoutingModule} from './message-exchange-routing'
import { MessageExchangeComponent } from './message-exchange.component';
import { MessageExchange1Component } from './message-exchange1/message-exchange1.component';
import { MessageExchange2Component } from './message-exchange2/message-exchange2.component';
import { MessageExchange3Component } from './message-exchange3/message-exchange3.component';
import { MessageExchange4Component } from './message-exchange4/message-exchange4.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { TagInputModule } from 'ngx-chips';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [MessageExchangeComponent, MessageExchange1Component, MessageExchange2Component, MessageExchange3Component, MessageExchange4Component],
  imports: [
    
    CommonModule,
    MessageExchangeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    TagInputModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularMultiSelectModule,
    ModalModule.forRoot(),
  ]
})
export class MessageExchangeModule { }
