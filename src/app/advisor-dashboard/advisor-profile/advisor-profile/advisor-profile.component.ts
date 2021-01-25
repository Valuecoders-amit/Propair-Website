import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { StudentService } from '../../../lib/services/student.service';


@Component({
  selector: 'app-advisor-profile',
  templateUrl: './advisor-profile.component.html',
  styleUrls: ['./advisor-profile.component.scss']
})
export class AdvisorProfileComponent implements OnInit {


  currentResource: string ='advisor-dashboard';
   showBio: boolean = false;
   advisorDetails:any;
   public noData: boolean = false;

  constructor(
    private router: Router,
    private profileService: StudentService
    
  ) {
    this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.url.split('/')[3];    
        if(this.currentResource==='advisor-biography'){
          this.showBio=true;
        }else{
          this.showBio =false;
        }
      }
    })
   }

  ngOnInit() {
   this.getAdvisorDetails();
  }

  getAdvisorDetails() {
    this.profileService.getAdvisorProfile().subscribe(data => {
      this.advisorDetails=data['data'];
      this.noData = true;
    })
  }
 
}
