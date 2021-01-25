import { Component, OnInit } from '@angular/core';
import { StudentService } from '../lib/services/student.service'

@Component({
  selector: 'app-advisor-dashboard',
  templateUrl: './advisor-dashboard.component.html',
  styleUrls: ['./advisor-dashboard.component.scss']
})
export class AdvisorDashboardComponent implements OnInit {

  public shrink:any;

  constructor( private studentService : StudentService) { }

  ngOnInit() {

  }


  onActivate(event) {
    window.scroll(0,0);
    
}

}
