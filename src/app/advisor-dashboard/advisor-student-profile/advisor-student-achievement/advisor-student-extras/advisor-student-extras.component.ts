import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../lib/services/student.service'
import { AuthService } from '../../../../lib/services/auth.service'

@Component({
  selector: 'app-advisor-student-extras',
  templateUrl: './advisor-student-extras.component.html',
  styleUrls: ['./advisor-student-extras.component.scss']
})
export class AdvisorStudentExtrasComponent implements OnInit {

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
