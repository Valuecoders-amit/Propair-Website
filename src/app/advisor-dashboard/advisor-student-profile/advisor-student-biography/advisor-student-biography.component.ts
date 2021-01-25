import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { StudentService } from '../../../lib/services/student.service'
import { AuthService } from '../../../lib/services/auth.service'

@Component({
  selector: 'app-advisor-student-biography',
  templateUrl: './advisor-student-biography.component.html',
  styleUrls: ['./advisor-student-biography.component.scss']
})
export class AdvisorStudentBiographyComponent implements OnInit {

  public paramsId:any;
  public studentId:string
  public currentResource:any;
  public biography: string
  inboxData : Array < any >= [];
  more:boolean=false;
  public noData: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService:StudentService,
    private authService : AuthService
  ) { }
  ngOnInit() {
    
    this.studentId =this.authService.getStudentId();
    this.studentService.educatorStudentId.subscribe(data=>{
      this.studentService.currentStudentId = data as string
    })

    this.getBioData(this.studentId);
    this.archiveContentData('public' , this.studentId);

}

getBioData(id){
  this.studentService.bioData(id).subscribe(data=>{
    this.biography = data['data'].biography;
    this.noData = true
  })
}

archiveContentData( val , id) {

  this.studentService.archiveMessageFilter(val,id).subscribe(data => {
      this.inboxData = data['data']
      this.noData = true
  })
}

filterInbox(val){
  this.archiveContentData(val , this.studentId)

}

}
