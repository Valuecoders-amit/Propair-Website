import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../lib/services/student.service'
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { AuthService } from '../../../../lib/services/auth.service'

@Component({
  selector: 'app-educator-student-achievements',
  templateUrl: './educator-student-achievements.component.html',
  styleUrls: ['./educator-student-achievements.component.scss']
})
export class EducatorStudentAchievementsComponent implements OnInit {

  public currentResource:string;
  public studentId : string;
  public routeCarry:any;

  constructor(private studentService:StudentService,
    private authService :AuthService,
    private router:Router) 
    {
      this.routeCarry=this.router.events.subscribe(event => {
        if( event instanceof NavigationEnd ) {
          this.currentResource = event.urlAfterRedirects.split('/')[5];  
  
        }
      })
      }

  ngOnInit() {       
    this.studentId =this.authService.getStudentId();
    this.studentService.educatorStudentId.subscribe(data=>{
      this.studentService.currentStudentId = data as string
    })
  }

  ngOnDestroy() {
    this.routeCarry.unsubscribe();
   }

  education(){
    this.router.navigateByUrl(`/dashboard/educator-student-profile/${this.studentId}/educator-student-achievements/educator-student-education`)
  }

  work(){
    this.router.navigateByUrl(`/dashboard/educator-student-profile/${this.studentId}/educator-student-achievements/educator-student-work`)
  }

  Extracurricular(){
    this.router.navigateByUrl(`/dashboard/educator-student-profile/${this.studentId}/educator-student-achievements/educator-student-extras`)
  }

  Skills(){
    this.router.navigateByUrl(`/dashboard/educator-student-profile/${this.studentId}/educator-student-achievements/educator-student-skill`)
  }
}
