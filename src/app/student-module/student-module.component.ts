import { Component, OnInit } from '@angular/core';
import {StudentService } from '../lib/services/student.service'

@Component({
  selector: 'app-student-module',
  templateUrl: './student-module.component.html',
  styleUrls: ['./student-module.component.scss']
})
export class StudentModuleComponent implements OnInit {

  constructor(private studentService:StudentService) { }

  ngOnInit() {

    
  }


}
