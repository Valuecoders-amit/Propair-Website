import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { StudentService } from '../../../lib/services/student.service'
import { AuthService } from '../../../lib/services/auth.service'

@Component({
  selector: 'app-advisor-student-carrier',
  templateUrl: './advisor-student-carrier.component.html',
  styleUrls: ['./advisor-student-carrier.component.scss']
})
export class AdvisorStudentCarrierComponent implements OnInit {

  public paramsId:any;
  public currentResource:any;
  public biography: string;
  public studentId:string
  more:boolean=false;
  public noData: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService:StudentService,
    private authService : AuthService
  ) {}

  ngOnInit() {

    
    this.studentId =this.authService.getStudentId();
    this.studentService.educatorStudentId.subscribe(data=>{
      this.studentService.currentStudentId = data as string
    }) 
    this.getBioData(this.studentId)

  }

  getBioData(id){
    this.studentService.bioData(id).subscribe(data=>{
      this.biography = data['data'].carrerGoal;
      this.noData = true
    })
  }

}
