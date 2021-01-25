import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { StudentService } from '../../../../lib/services/student.service';
import { AuthService } from '../../../../lib/services/auth.service';

@Component({
  selector: 'app-student-advisor-profile',
  templateUrl: './student-advisor-profile.component.html',
  styleUrls: ['./student-advisor-profile.component.scss']
})
export class StudentAdvisorProfileComponent implements OnInit {

  currentResource: string ='student-module';
  showBio: boolean = false;
  advisorDetails:any;
  public paramsId:any;
  public studentDetails:any;
  public noData: boolean = false;

  constructor(    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService:StudentService,
    private authService : AuthService) 
  {
    this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.url.split('/')[5];    
        if(this.currentResource==='student-advisor-biography'){
          this.showBio=true;
        }else{
          this.showBio =false;
        }
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

  getProfileDetails(id){
    this.studentService.getAdvisorProfile(id).subscribe(data=>{
      this.advisorDetails = data['data'];
      this.noData = true
    })
  }

  bio(){

    this.router.navigateByUrl(`/student-module/dashboard/student-advisor-profile/${this.paramsId}/student-advisor-biography`)

  }
  career(){
    this.router.navigateByUrl(`/student-module/dashboard/student-advisor-profile/${this.paramsId}/student-advisor-career`)
    
  }
  education(){
    this.router.navigateByUrl(`/student-module/dashboard/student-advisor-profile/${this.paramsId}/student-advisor-education`)
    
  }
  advice(){
    this.router.navigateByUrl(`/student-module/dashboard/student-advisor-profile/${this.paramsId}/student-advisor-advice`)
    
  }

}
