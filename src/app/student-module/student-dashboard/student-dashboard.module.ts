import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule,BsDropdownModule } from 'ngx-bootstrap';

// import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
// import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { ImageCropperModule } from "ngx-image-cropper";
import { InternationalPhoneModule } from "ng4-intl-phone";
import { StudentStatsComponent } from './student-stats/student-stats.component'
import { StudentDashboardRoutingModule } from './student-dashboard-routing'
import { StudentDashboardComponent } from './student-dashboard.component';
import { StudentMessageComponent } from './student-message/student-message.component';
import { NewStudentMessageComponent } from './new-student-message/new-student-message.component';
import { StudentMessageIIComponent } from './student-message-ii/student-message-ii.component';
import { ViewMessageComponent } from './view-message/view-message.component';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { InboxViewMessageComponent } from './inbox-view-message/inbox-view-message.component';
import { OutboxViewMessageComponent } from './outbox-view-message/outbox-view-message.component';
import { ArchiveViewMessageComponent } from './archive-view-message/archive-view-message.component';
import { PropairViewMessageComponent } from './propair-view-message/propair-view-message.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NewExchangeViewMessageComponent } from './new-exchange-view-message/new-exchange-view-message.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MyDatePickerModule } from 'mydatepicker';
import { StudentHelpCenterComponent } from './student-help-center/student-help-center.component';
import { ModalModule } from 'ngx-bootstrap/modal';


// import { ScrollPercentageDirective } from '../../lib/Directives/scroll-percentage-directives.';


@NgModule({
  declarations: [StudentStatsComponent,StudentDashboardComponent, StudentMessageComponent, NewStudentMessageComponent, StudentMessageIIComponent, ViewMessageComponent, InboxViewMessageComponent, OutboxViewMessageComponent, ArchiveViewMessageComponent, PropairViewMessageComponent, NewExchangeViewMessageComponent, StudentHelpCenterComponent,

  ],
  imports: [
    CommonModule,
    StudentDashboardRoutingModule,
    ImageCropperModule,
    InternationalPhoneModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgbDropdownModule,
    TextareaAutosizeModule,
    // ScrollPercentageDirective,
    NgMultiSelectDropDownModule,
    NgxSpinnerModule,
    MyDatePickerModule,
    ModalModule.forRoot(),
  ]
})
export class StudentDashboardModule {}
