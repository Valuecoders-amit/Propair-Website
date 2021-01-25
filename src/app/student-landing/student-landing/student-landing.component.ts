import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-landing',
  templateUrl: './student-landing.component.html',
  styleUrls: ['./student-landing.component.scss']
})
export class StudentLandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openNav(){
    document.getElementById("mySidenav").style.width = "100%";
  }
  closeNav(){
    document.getElementById("mySidenav").style.width = "0";
  }

}
