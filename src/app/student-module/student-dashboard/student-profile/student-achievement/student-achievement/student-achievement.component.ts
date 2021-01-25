import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-achievement',
  templateUrl: './student-achievement.component.html',
  styleUrls: ['./student-achievement.component.scss']
})
export class StudentAchievementComponent implements OnInit , OnDestroy {

  currentResource:string;
  routeCarry : Subscription;
  constructor(private router: Router) {
    this.routeCarry=this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.url.split('/')[5];    
      }
    })
   }

  ngOnInit() {
  }

  ngOnDestroy() {
   this.routeCarry.unsubscribe();
  }

}
