import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { StudentService } from '../../../lib/services/student.service'
import { AuthService } from '../../../lib/services/auth.service'

@Component({
  selector: 'app-educator-student-biography',
  templateUrl: './educator-student-biography.component.html',
  styleUrls: ['./educator-student-biography.component.scss']
})
export class EducatorStudentBiographyComponent implements OnInit {

  public paramsId:any;
  public studentId:string
  public currentResource:any;
  public biography: string
  inboxData : Array < any >= [];
  more:boolean=false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService:StudentService,
    private authService : AuthService
  ) { }

  ngOnInit() {
    
    this.studentId =this.authService.getStudentId();
    // console.log('subscribe')
    // console.log( this.studentService.currentStudentId,' this.studentService.currentStudentId')
    this.studentService.educatorStudentId.subscribe(data=>{
      this.studentService.currentStudentId = data as string
      // console.log( this.studentService.currentStudentId,'-------->')
    })

    this.getBioData(this.studentId);
    this.archiveContentData( 'public' , this.studentId);

}

getBioData(id){
  this.studentService.bioData(id).subscribe(data=>{
    this.biography = data['data'].biography;
  })
}

archiveContentData( value , id) {

  this.studentService.archiveProfileFilter(value , id).subscribe(data => {
      this.inboxData = data['data']

  })
}

filterInbox(val){
  console.log(val);
  this.archiveContentData(val , this.studentId)

}

}
