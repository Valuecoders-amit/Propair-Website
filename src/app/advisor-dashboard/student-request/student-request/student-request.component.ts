import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-request',
  templateUrl: './student-request.component.html',
  styleUrls: ['./student-request.component.scss']
})
export class StudentRequestComponent implements OnInit, OnDestroy {
  
  currentResource: string;
  activationRoute : Subscription;

  constructor(private router: Router) { 
   this.activationRoute= this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.urlAfterRedirects.split('/')[3];    
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.activationRoute.unsubscribe();
  }

}
