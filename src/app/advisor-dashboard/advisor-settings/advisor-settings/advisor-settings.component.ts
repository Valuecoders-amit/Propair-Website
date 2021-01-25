import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advisor-settings',
  templateUrl: './advisor-settings.component.html',
  styleUrls: ['./advisor-settings.component.scss']
})
export class AdvisorSettingsComponent implements OnInit {

  currentResource: string;
  routerSubs : Subscription;


  constructor(private router : Router) {
    this.routerSubs = this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.url.split('/')[3];    

      }
    })
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

}
