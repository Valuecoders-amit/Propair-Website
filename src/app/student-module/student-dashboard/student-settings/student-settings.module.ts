import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentSettingsComponent } from './student-settings.component';
import { StudentSettingsRoutingModule } from './student-settings.routing';
import { StudentGeneralComponent } from './student-general/student-general.component';
import { StudentCreditsComponent } from './student-credits/student-credits.component'
import { ImageCropperModule } from "ngx-image-cropper";
import { InternationalPhoneModule } from "ng4-intl-phone";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [StudentSettingsComponent, StudentGeneralComponent, StudentCreditsComponent],
  imports: [
    CommonModule,
    StudentSettingsRoutingModule,
    NgbModule,
    InternationalPhoneModule,
    ModalModule.forRoot(),
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    GooglePlaceModule,
  ]
})
export class StudentSettingsModule { }
