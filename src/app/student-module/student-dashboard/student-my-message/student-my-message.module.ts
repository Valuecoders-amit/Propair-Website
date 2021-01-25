import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentMyMessageComponent } from './student-my-message.component';
import { StudentMyMessageRoutingModule } from './student-my-message.routing'
import { InboxComponent } from './inbox/inbox.component';
import { DraftComponent } from './draft/draft.component';
import { OutboxComponent } from './outbox/outbox.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ArchiveComponent } from './archive/archive.component';
import { PropairSupportComponent } from './propair-support/propair-support.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { TagInputModule } from 'ngx-chips';
import {TimeStr} from './counter.pipe';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [StudentMyMessageComponent, InboxComponent, DraftComponent, OutboxComponent, ArchiveComponent, PropairSupportComponent,TimeStr],
  imports: [
    CommonModule,
    StudentMyMessageRoutingModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    FormsModule,
    NgxSpinnerModule,
    TagInputModule,
    NgbModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentMyMessageModule { }
