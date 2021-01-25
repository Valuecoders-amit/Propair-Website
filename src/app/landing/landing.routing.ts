import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { BecomeAdvisorComponent } from './become-advisor/become-advisor.component';
import { BecomePartnerComponent } from './become-partner/become-partner.component';



export const landingRoutes: Routes = [

  {
    path: '', component: HomeComponent,
  },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'how-it-work', component: HowItWorkComponent },
  { path: 'become-advisor', component: BecomeAdvisorComponent },
  { path: 'become-partner', component: BecomePartnerComponent },

]

@NgModule({
  imports: [RouterModule.forChild(landingRoutes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
