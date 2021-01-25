import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdvisorProfileComponent } from './advisor-profile/advisor-profile.component';
import { AdvisorBiographyComponent } from './advisor-biography/advisor-biography.component';
import {  advisorProfileRoutes} from './advisor-profile.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvisorCareerComponent } from './advisor-career/advisor-career.component';
import {MoreStr} from './more.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdvisorEducationComponent } from './advisor-education/advisor-education.component';
import { AdvisorAdviceComponent } from './advisor-advice/advisor-advice.component';
import { MyDatePickerModule } from 'mydatepicker';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MemberShip } from './joined.pipe';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";



@NgModule({
  declarations: [AdvisorProfileComponent, AdvisorBiographyComponent, AdvisorCareerComponent , MoreStr, AdvisorEducationComponent, AdvisorAdviceComponent , MemberShip],
  imports: [
    CommonModule,
    RouterModule.forChild(advisorProfileRoutes),
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    MyDatePickerModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    GooglePlaceModule
  ]
})
export class AdvisorProfileModule { }
