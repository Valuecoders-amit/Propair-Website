import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { StudentService } from '../../../lib/services/student.service'
import { AuthService } from '../../../lib/services/auth.service'

@Component({
  selector: 'app-educator-student-carrier',
  templateUrl: './educator-student-carrier.component.html',
  styleUrls: ['./educator-student-carrier.component.scss']
})
export class EducatorStudentCarrierComponent implements OnInit {

  public paramsId:any;
  public currentResource:any;
  public biography: string;
  public studentId:string
  more:boolean=false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService:StudentService,
    private authService : AuthService
  ) {}

  ngOnInit() {

    
    this.studentId =this.authService.getStudentId();

    // console.log('subscribe inside creer')
    // console.log( this.studentService.currentStudentId,' this.studentService.currentStudentId inside creer')
    this.studentService.educatorStudentId.subscribe(data=>{
      this.studentService.currentStudentId = data as string
      // console.log( this.studentService.currentStudentId,'--------> inside creer')
    })
    
    this.getBioData(this.studentId)

  }

  getBioData(id){
    this.studentService.bioData(id).subscribe(data=>{
      this.biography = data['data'].biography;
    })
  }

}
