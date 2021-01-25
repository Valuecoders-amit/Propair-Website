import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorComponent } from './advisor.component';
import { AdvisorLoginComponent } from './advisor-login/advisor-login.component';
import { AdvisorSignupComponent } from './advisor-signup/advisor-signup.component';
import {AdvisorRoutingModule} from './advisor.routing'
import { HeaderComponent } from '../advisor-header/header/header.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { AdvsiorReferalSignupComponent } from './advsior-referal-signup/advsior-referal-signup.component';


@NgModule({
  declarations: [AdvisorComponent, AdvisorLoginComponent, AdvisorSignupComponent,HeaderComponent, AdvsiorReferalSignupComponent ],
  imports: [
    CommonModule,
    AdvisorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class AdvisorModule { }
