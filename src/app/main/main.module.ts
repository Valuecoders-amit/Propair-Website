import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main.routing';
import { MainComponent } from './main.component'
import { HomeComponent } from './home/home.component';
import { FooterComponent } from '../shared/footer/footer.component'
import { HeaderComponent } from '../shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeHeaderComponent } from './home-header/home-header.component';
import { BecomeAdvisorComponent } from './become-advisor/become-advisor.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BecomePartnerComponent } from './become-partner/become-partner.component';
import { BecomePartnerSchoolComponent } from './become-partner-school/become-partner-school.component';
import { FaqComponent } from './faq/faq.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SafegaurdingPolicyComponent } from './safegaurding-policy/safegaurding-policy.component';

@NgModule({
  declarations: [HomeComponent, FooterComponent, LoginComponent, MainComponent,SignupComponent, PasswordStrengthComponent,HeaderComponent, HomeHeaderComponent, BecomeAdvisorComponent, AboutUsComponent, BecomePartnerComponent, BecomePartnerSchoolComponent, FaqComponent, ForgetPasswordComponent, NewPasswordComponent, TermsConditionComponent, PrivacyPolicyComponent, SafegaurdingPolicyComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class MainModule { }
