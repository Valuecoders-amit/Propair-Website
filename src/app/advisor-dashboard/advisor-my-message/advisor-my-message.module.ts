import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorMyMessageComponent } from './advisor-my-message.component';
import { AdvisorInboxComponent } from './advisor-inbox/advisor-inbox.component';
import { AdvisorMyMessageRoutingModule, advisorMyMessageRoutes } from './advisor-my-message.routing'
import { RouterModule } from '@angular/router';
import { AdvisorDraftComponent } from './advisor-draft/advisor-draft.component';
import { AdvisorArchiveComponent } from './advisor-archive/advisor-archive.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvisorSupportComponent } from './advisor-support/advisor-support.component';
import {TimeStr} from './counter.pipe';

@NgModule({
  declarations: [AdvisorMyMessageComponent, AdvisorInboxComponent, AdvisorDraftComponent, AdvisorArchiveComponent, AdvisorSupportComponent,TimeStr],
  imports: [
    CommonModule,
    AdvisorMyMessageRoutingModule,
    RouterModule.forChild(advisorMyMessageRoutes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdvisorMyMessageModule { }
