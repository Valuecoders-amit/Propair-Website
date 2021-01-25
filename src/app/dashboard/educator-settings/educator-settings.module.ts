import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {educatorSettingsRoutes } from './educator-setting.routing';
import { EducatorGeneralComponent } from './educator-general/educator-general.component';
import { EducatorNotificationsComponent } from './educator-notifications/educator-notifications.component';
import { EducatorSettingsComponent } from './educator-settings/educator-settings.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { InternationalPhoneModule } from "ng4-intl-phone";
import { ImageCropperModule } from "ngx-image-cropper";
import { BsDatepickerModule,BsDropdownModule } from 'ngx-bootstrap';
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [EducatorGeneralComponent, EducatorNotificationsComponent, EducatorSettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(educatorSettingsRoutes),
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneModule,
    GooglePlaceModule,
    JwSocialButtonsModule,
    ModalModule,
    ImageCropperModule,
    BsDatepickerModule,
    BsDropdownModule,
    NgbDropdownModule,
    NgbModule,
    FontAwesomeModule
  ]
})
export class EducatorSettingsModule { }
