import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../lib/services/student.service'
import { AuthService } from '../../../../lib/services/auth.service'
@Component({
  selector: 'app-advisor-student-work',
  templateUrl: './advisor-student-work.component.html',
  styleUrls: ['./advisor-student-work.component.scss']
})
export class AdvisorStudentWorkComponent implements OnInit {

  carrerData : Array < any >= [];
  careeListing : Array < any >= [];
  moreData : number;
  public studentId :string;
  checkData : boolean = false;

  constructor(private studentService:StudentService,private authService :AuthService) {}

  ngOnInit() {

    this.studentId =this.authService.getStudentId();
    this.studentService.educatorStudentId.subscribe(data=>{
      this.studentService.currentStudentId = data as string
    })

    this. careerListing(this.studentId);
  }

  careerListing(id) {
    this.studentService.careerListingData(id).subscribe(data => {
        this.moreData = data['data'].length - 3;
        this.carrerData = data['data'];
        this.careeListing = [...this.carrerData]
        this.careeListing.splice(3);


    })
}

}
