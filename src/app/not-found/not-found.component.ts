import { Component, OnInit } from '@angular/core';
import { StudentService } from '../lib/services/student.service'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor( public studentService :StudentService ) { }

  ngOnInit() {
  }


}
