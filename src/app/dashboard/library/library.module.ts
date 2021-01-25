import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';
import { MessageReplyComponent } from './message-reply/message-reply.component';
import { QuestionListComponent } from './question-list/question-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MoreStr} from './more.pipe';
import { PaginationModule } from 'ngx-bootstrap';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";




@NgModule({
  declarations: [LibraryComponent, MessageReplyComponent, QuestionListComponent,MoreStr],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    GooglePlaceModule,
    NgxSpinnerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA] 
})
export class LibraryModule { }
