import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorNewSignupComponent } from './advisor-new-signup.component';
import { AdvisorNewSignupRoutingModule } from './advisor-new-signup.routing';
import { AdvisorNewSignup1Component } from './advisor-new-signup1/advisor-new-signup1.component';
import { AdvisorNewSignup2Component } from './advisor-new-signup2/advisor-new-signup2.component';
import { AdvisorNewSignup3Component } from './advisor-new-signup3/advisor-new-signup3.component';
import { AdvisorNewSignup4Component } from './advisor-new-signup4/advisor-new-signup4.component';
import { AdvisorNewSignup5Component } from './advisor-new-signup5/advisor-new-signup5.component';
import { AdvisorNewSignup6Component } from './advisor-new-signup6/advisor-new-signup6.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from "ngx-spinner";
import { MyDatePickerModule } from 'mydatepicker';
import { MemberShip } from './joined.pipe';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";



@NgModule({
  declarations: [AdvisorNewSignupComponent, AdvisorNewSignup1Component, AdvisorNewSignup2Component, AdvisorNewSignup3Component, AdvisorNewSignup4Component, AdvisorNewSignup5Component, AdvisorNewSignup6Component,MemberShip],
  imports: [
    CommonModule,
    AdvisorNewSignupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    MyDatePickerModule,
    NgxSpinnerModule,
    GooglePlaceModule
  ]
})
export class AdvisorNewSignupModule { }
