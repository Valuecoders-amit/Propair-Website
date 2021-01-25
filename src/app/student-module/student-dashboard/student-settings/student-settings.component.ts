import { Component, OnInit } from "@angular/core";
import { NavigationEnd } from "@angular/router";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-student-settings",
  templateUrl: "./student-settings.component.html",
  styleUrls: ["./student-settings.component.scss"],
})
export class StudentSettingsComponent implements OnInit {
  currentResource: string;
  routerContent : Subscription

  constructor(private router: Router) {

    this.routerContent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentResource = event.urlAfterRedirects.split("/")[4];
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy(){
    this.routerContent.unsubscribe();
  }
}
