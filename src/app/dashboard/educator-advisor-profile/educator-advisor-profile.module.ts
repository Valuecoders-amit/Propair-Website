import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { educatorAdvisorProfileRoutes } from './educator-advisor-profile.routing'
import { FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import {MoreStr} from './more.pipe';
import { MemberShip} from './joined.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EducatorAdvsiorProfileComponent } from './educator-advsior-profile/educator-advsior-profile.component';
import { EducatorAdvsiorCarrierComponent } from './educator-advsior-carrier/educator-advsior-carrier.component';
import { EducatorAdvsiorBiographyComponent } from './educator-advsior-biography/educator-advsior-biography.component';
import { EducatorAdvsiorAdviceComponent } from './educator-advsior-advice/educator-advsior-advice.component';
import { EducatorAdvsiorEducationComponent } from './educator-advsior-education/educator-advsior-education.component';

@NgModule({
  declarations: [EducatorAdvsiorProfileComponent, EducatorAdvsiorCarrierComponent, EducatorAdvsiorBiographyComponent,MoreStr,MemberShip, EducatorAdvsiorAdviceComponent, EducatorAdvsiorEducationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(educatorAdvisorProfileRoutes),
    ModalModule.forRoot(),
    FormsModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class EducatorAdvisorProfileModule { }
