import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../lib/services/student.service'
import { AuthService } from '../../../../lib/services/auth.service'
@Component({
  selector: 'app-educator-student-extras',
  templateUrl: './educator-student-extras.component.html',
  styleUrls: ['./educator-student-extras.component.scss']
})
export class EducatorStudentExtrasComponent implements OnInit {


  activityData:Array<{}>;
  public studentId :string;

  constructor(private studentService:StudentService,private authService :AuthService) { }

  ngOnInit() {

    this.studentId =this.authService.getStudentId();
    this.studentService.educatorStudentId.subscribe(data=>{
      this.studentService.currentStudentId = data as string
    })
    this.listingActivities(this.studentId);
  }

  listingActivities(id) {
    this.studentService.getActivitiesData(id).subscribe(data=>{
      this.activityData=data['data'];

    })
  }

}
