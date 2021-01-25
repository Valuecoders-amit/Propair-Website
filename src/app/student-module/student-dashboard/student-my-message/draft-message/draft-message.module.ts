import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftMessageRoutingModule } from './draft-message.routing';
import { DraftMessageComponent } from './draft-message/draft-message.component';
import { LiveMessageComponent } from './live-message/live-message.component';
import { NewMessageComponent } from './new-message/new-message.component'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { TagInputModule } from 'ngx-chips';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [DraftMessageComponent, LiveMessageComponent, NewMessageComponent],
  imports: [
    CommonModule,
    DraftMessageRoutingModule,
    NgbModule,
    TagInputModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DraftMessageModule { }
