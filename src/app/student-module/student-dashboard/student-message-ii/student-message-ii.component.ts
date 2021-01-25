import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-message-ii',
  templateUrl: './student-message-ii.component.html',
  styleUrls: ['./student-message-ii.component.scss']
})
export class StudentMessageIIComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  previousPage(){
    this.router.navigateByUrl('student-module/dashboard/new-student-message');
  }
}
