import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../lib/services/student.service'
import { AuthService } from '../../../../lib/services/auth.service'

@Component({
  selector: 'app-educator-student-education',
  templateUrl: './educator-student-education.component.html',
  styleUrls: ['./educator-student-education.component.scss']
})
export class EducatorStudentEducationComponent implements OnInit {

  firstData:Array<{}>;
  secondData:Array<{}>;
  carrerData : Array < any >= [];
  careeListing : Array < any >= [];
  moreData : number;
  public studentId :string;
  educationData:Array<any>=[]

  constructor(private studentService:StudentService,
    private authService :AuthService ) {}

  ngOnInit() {

    this.studentId =this.authService.getStudentId();
    this.studentService.educatorStudentId.subscribe(data=>{
      this.studentService.currentStudentId = data as string
    })
    this.educationList(this.studentId);

  }


   educationList(id) {
    this.studentService.getStudentEducationList(id).subscribe(data => {
      this.educationData = data['data'];
    }, err=>{
    })
 
  }


}
