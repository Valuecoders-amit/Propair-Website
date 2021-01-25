import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advisor-stats',
  templateUrl: './advisor-stats.component.html',
  styleUrls: ['./advisor-stats.component.scss']
})
export class AdvisorStatsComponent implements OnInit, OnDestroy {

  currentResource : string;
  routeSubscription : Subscription;

  constructor(private router: Router) {
    this.routeSubscription = this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.url.split('/')[3];   
      }
    })
   }

  ngOnInit() {
  }

  ngOnDestroy() {
   this.routeSubscription.unsubscribe();
  }
}
