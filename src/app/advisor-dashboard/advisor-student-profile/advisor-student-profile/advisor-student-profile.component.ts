import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { StudentService } from '../../../lib/services/student.service';
import { AuthService } from '../../../lib/services/auth.service'

@Component({
  selector: 'app-advisor-student-profile',
  templateUrl: './advisor-student-profile.component.html',
  styleUrls: ['./advisor-student-profile.component.scss']
})
export class AdvisorStudentProfileComponent implements OnInit {

  public paramsId:any;
  public currentResource:string;
  public routeCarry:any;
  public noData: boolean = false;
  public studentDetails:any
  
  constructor(    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService:StudentService,
    private authService : AuthService) 
    {
      this.routeCarry=this.router.events.subscribe(event => {
        if( event instanceof NavigationEnd ) {
          this.currentResource = event.urlAfterRedirects.split('/')[5]; 
  
        }
      })
    }

    ngOnInit() {
      this.activatedRoute.params.subscribe((param) => {
        this.paramsId = param.id;    
        this.studentService.educatorStudentId.next(this.paramsId)
      })
  
      this.authService.setStudentId(this.paramsId)
      this.getProfileDetails(this.paramsId);
    }
  
    ngOnDestroy() {
      this.routeCarry.unsubscribe();
     }
  
    getProfileDetails(id){
      this.studentService.getStudentProfile(id).subscribe(data=>{
        this.studentDetails = data['data'];
        this.noData = true;
      })
    }
  
    bio(){
  
      this.router.navigateByUrl(`/advisor-dashboard/advisor-student-profile/${this.paramsId}/advisor-student-biography`)
    }
  
    career(){
      this.router.navigateByUrl(`/advisor-dashboard/advisor-student-profile/${this.paramsId}/advisor-student-career`)
    }
  
    achievements(){
      this.router.navigateByUrl(`/advisor-dashboard/advisor-student-profile/${this.paramsId}/advisor-student-achievements`)
    }
  
    watch(){
      this.router.navigateByUrl(`/advisor-dashboard/advisor-student-profile/${this.paramsId}/advisor-student-watched`)
  
    }

}
