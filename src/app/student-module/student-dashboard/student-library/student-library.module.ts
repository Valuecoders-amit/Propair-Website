import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentLibraryComponent } from './student-library.component';
import { StudentLibraryRoutingModule } from './student-library.routing';
import { StudentQuestionListComponent } from './student-question-list/student-question-list.component';
import { StudentMessageReplyComponent } from './student-message-reply/student-message-reply.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MoreStr} from './more.pipe';
import { PaginationModule } from 'ngx-bootstrap';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxSpinnerModule } from "ngx-spinner";






@NgModule({
  declarations: [StudentLibraryComponent, StudentQuestionListComponent, StudentMessageReplyComponent , MoreStr],
  imports: [
    CommonModule,
    StudentLibraryRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    GooglePlaceModule,
    NgxSpinnerModule
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentLibraryModule { }
