import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../lib/services/student.service'
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { AuthService } from '../../../../lib/services/auth.service'

@Component({
  selector: 'app-advisor-student-achievement',
  templateUrl: './advisor-student-achievement.component.html',
  styleUrls: ['./advisor-student-achievement.component.scss']
})
export class AdvisorStudentAchievementComponent implements OnInit {

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
        this.router.navigateByUrl(`/advisor-dashboard/advisor-student-profile/${this.studentId}/advisor-student-achievements/advisor-student-education`)
      }
    
      work(){
        this.router.navigateByUrl(`/advisor-dashboard/advisor-student-profile/${this.studentId}/advisor-student-achievements/advisor-student-work`)
      }
    
      Extracurricular(){
        this.router.navigateByUrl(`/advisor-dashboard/advisor-student-profile/${this.studentId}/advisor-student-achievements/advisor-student-extras`)
      }
    
      Skills(){
        this.router.navigateByUrl(`/advisor-dashboard/advisor-student-profile/${this.studentId}/advisor-student-achievements/advisor-student-skill`)
      }

}
