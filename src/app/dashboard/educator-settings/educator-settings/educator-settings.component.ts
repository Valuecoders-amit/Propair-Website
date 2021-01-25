import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-educator-settings',
  templateUrl: './educator-settings.component.html',
  styleUrls: ['./educator-settings.component.scss']
})
export class EducatorSettingsComponent implements OnInit {
  currentResource: string;
  routeCarry : Subscription;

  constructor(private router: Router,)
   {
    this.routeCarry=this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.urlAfterRedirects.split('/')[3];    
      }
    })
   }

  ngOnInit() {
  }

}
