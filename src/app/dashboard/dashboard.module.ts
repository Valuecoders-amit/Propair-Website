import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing";
import { DashboardComponent } from "./dashboard.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { StatsComponent } from "./stats/stats.component";
import { GroupAnalyticsComponent } from "./group-analytics/group-analytics.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule, BsDropdownModule } from "ngx-bootstrap";

// import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SettingsComponent } from "./settings/settings.component";
import { HelpCenterComponent } from "./help-center/help-center.component";
import { HeaderComponent } from "./header/header.component";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { ImageCropperModule } from "ngx-image-cropper";
import { InternationalPhoneModule } from "ng4-intl-phone";
import { NotificationComponent } from "./notification/notification.component";
import { BillingCreditsComponent } from "./billing-credits/billing-credits.component";
import { Ng5SliderModule } from "ng5-slider";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { MyDatePickerModule } from "mydatepicker";
import { InvoiceComponent } from "./invoice/invoice.component";
import { Comma } from './comma.pipe'
// import { EducatorPaymentMethodComponent } from './educator-students-credits/educator-payment-method/educator-payment-method.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    StatsComponent,
    GroupAnalyticsComponent,
    SettingsComponent,
    HelpCenterComponent,
    HeaderComponent,
    NotificationComponent,
    BillingCreditsComponent,
    InvoiceComponent,
    Comma
    // EducatorPaymentMethodComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    InternationalPhoneModule,
    DashboardRoutingModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    FormsModule,
    NgbModule,
    ModalModule.forRoot(),
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgbDropdownModule,
    Ng5SliderModule,
    NgMultiSelectDropDownModule.forRoot(),
    MyDatePickerModule,
  ],
})
export class DashboardModule {}
