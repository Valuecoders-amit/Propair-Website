import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component';
import { BecomeAdvisorComponent } from './become-advisor/become-advisor.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { BecomePartnerComponent } from './become-partner/become-partner.component';
import { BecomePartnerSchoolComponent } from './become-partner-school/become-partner-school.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SafegaurdingPolicyComponent } from './safegaurding-policy/safegaurding-policy.component';





export const homeRoutes: Routes = [

  {
    path: '', component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup/:token', component: SignupComponent },
  { path: 'become-advisor', component : BecomeAdvisorComponent },
  { path: 'become-partner', component : BecomePartnerComponent },
  { path: 'become-partnerSchool', component : BecomePartnerSchoolComponent },
  { path: 'about-us', component : AboutUsComponent },
  { path: 'faq', component : FaqComponent },
  { path: 'forget-password', component : ForgetPasswordComponent },
  { path: 'new-password/:id', component : NewPasswordComponent },
  { path: 'termsCondition', component : TermsConditionComponent },
  { path: 'privacyPolicy', component : PrivacyPolicyComponent },
  { path: 'safegaurdingPolicy', component : SafegaurdingPolicyComponent },


  


]

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
