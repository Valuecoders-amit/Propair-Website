import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LandingRoutingModule } from './landing.routing'
import { AboutUsComponent } from './about-us/about-us.component';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { BecomeAdvisorComponent } from './become-advisor/become-advisor.component';
import { BecomePartnerComponent } from './become-partner/become-partner.component';
import { HeaderComponent} from '../new-shared/header/header.component';
import { FooterComponent } from '../new-shared/footer/footer.component';

@NgModule({
  declarations: [HomeComponent,
    FooterComponent,
     AboutUsComponent,
     HeaderComponent, 
     HowItWorkComponent, 
     BecomeAdvisorComponent, 
     BecomePartnerComponent],


  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
