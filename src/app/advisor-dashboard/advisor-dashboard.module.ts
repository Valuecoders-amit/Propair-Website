import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdvisorDashboardComponent } from "./advisor-dashboard.component";
import {
  AdvisorDashboardRoutingModule,
  advisorDashboardRoutes,
} from "./advisor-dashboard.routing";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { MoreStr, Joined } from "./more.pipe";
import { DashoardComponent } from "./dashoard/dashoard.component";
import { RouterModule } from "@angular/router";
import { AdvisorArchiveViewMessageComponent } from "./advisor-archive-view-message/advisor-archive-view-message.component";
import { AdvisorDraftViewMessageComponent } from "./advisor-draft-view-message/advisor-draft-view-message.component";
import { AdvisorInboxViewMessageComponent } from "./advisor-inbox-view-message/advisor-inbox-view-message.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ImageCropperModule } from "ngx-image-cropper";
import { InternationalPhoneModule } from "ng4-intl-phone";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { OpenDetailingComponent } from "./student-request/open-detailing/open-detailing.component";
import { MyDatePickerModule } from "mydatepicker";
import { AdvisorHelpCenterComponent } from "./advisor-help-center/advisor-help-center.component";
import { JwSocialButtonsModule } from "jw-angular-social-buttons";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AdvisorPropairViewMessageComponent } from './advisor-propair-view-message/advisor-propair-view-message.component';
import { RequestDetailComponent } from './student-request/request-detail/request-detail.component';

@NgModule({
  declarations: [
    AdvisorDashboardComponent,
    SidebarComponent,
    HeaderComponent,
    MoreStr,
    Joined,
    DashoardComponent,
    AdvisorArchiveViewMessageComponent,
    AdvisorDraftViewMessageComponent,
    AdvisorInboxViewMessageComponent,
    OpenDetailingComponent,
    AdvisorHelpCenterComponent,
    AdvisorPropairViewMessageComponent,
    RequestDetailComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    FormsModule,
    ModalModule.forRoot(),
    ImageCropperModule,
    InternationalPhoneModule,
    NgbModule,
    NgMultiSelectDropDownModule,
    SelectDropDownModule,
    MyDatePickerModule,
    RouterModule.forChild(advisorDashboardRoutes),
    JwSocialButtonsModule,
    GooglePlaceModule,
  ],
})
export class AdvisorDashboardModule {}
