import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {educatorBillingCreditsRoutes } from './educator-billing-credits.routing';
import { EducatorBillingCreditsComponent } from './educator-billing-credits.component';
import { EducatorBillingComponent } from './educator-billing/educator-billing.component';
import { EducatorStudentsCreditsComponent } from './educator-students-credits/educator-students-credits.component';
import { EducatorPaymentMethodComponent } from './educator-payment-method/educator-payment-method.component'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng5SliderModule } from 'ng5-slider';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MyDatePickerModule } from 'mydatepicker';
import { BsDatepickerModule,BsDropdownModule } from 'ngx-bootstrap';
import { Comma } from './comma.pipe'

@NgModule({
  declarations: [EducatorBillingCreditsComponent, EducatorBillingComponent, EducatorStudentsCreditsComponent, EducatorPaymentMethodComponent,Comma],
  imports: [
    CommonModule,
    RouterModule.forChild(educatorBillingCreditsRoutes),
    FormsModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    NgMultiSelectDropDownModule.forRoot(),
    MyDatePickerModule,
    ModalModule,
    BsDatepickerModule,
    BsDropdownModule
  ]
})
export class EducatorBillingCreditsModule { }
