import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorSettingsComponent } from './advisor-settings/advisor-settings.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { InviteSettingsComponent } from './invite-settings/invite-settings.component';
import { advisorSettingsRoutes } from './advisor-settings.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { InternationalPhoneModule } from "ng4-intl-phone";




@NgModule({
  declarations: [AdvisorSettingsComponent, GeneralSettingsComponent, NotificationSettingsComponent, InviteSettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(advisorSettingsRoutes),
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    JwSocialButtonsModule,
    GooglePlaceModule,
  
    InternationalPhoneModule,
   

  ]
})
export class AdvisorSettingsModule { }
