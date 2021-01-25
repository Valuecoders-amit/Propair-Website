import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from '../../lib/services/student.service'
@Component({
  selector: 'app-educator-billing-credits',
  templateUrl: './educator-billing-credits.component.html',
  styleUrls: ['./educator-billing-credits.component.scss']
})
export class EducatorBillingCreditsComponent implements OnInit {

  currentResource: string;
  routeCarry : Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService : StudentService
  )
   {
    this.routeCarry=this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.urlAfterRedirects.split('/')[3];    
        // console.log(this.currentResource,'current resource')
      }
    })
    }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routeCarry.unsubscribe();
   }
   biiling(){
    
   }

   studentCredits(){
    
   }

   paymentMethod(){
    
   }

}
