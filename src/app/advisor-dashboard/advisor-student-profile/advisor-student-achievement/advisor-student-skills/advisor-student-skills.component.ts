import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../lib/services/student.service'

import { AuthService } from '../../../../lib/services/auth.service'

@Component({
  selector: 'app-advisor-student-skills',
  templateUrl: './advisor-student-skills.component.html',
  styleUrls: ['./advisor-student-skills.component.scss']
})
export class AdvisorStudentSkillsComponent implements OnInit {

  skillsData:Array<{}>;
  public studentId :string;

  constructor(private studentService:StudentService,private authService :AuthService) { }

  ngOnInit() {
    this.studentId =this.authService.getStudentId();
    this.studentService.educatorStudentId.subscribe(data=>{
      this.studentService.currentStudentId = data as string
    })
    this.skillListing(this.studentId);
  }


  skillListing(id) {
    this.studentService.getSkillListing(id).subscribe(data =>{
      this.skillsData=data['data'];
    })
  }

}
