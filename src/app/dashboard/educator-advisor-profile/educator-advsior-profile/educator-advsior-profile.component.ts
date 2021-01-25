import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { StudentService } from '../../../lib/services/student.service';
import { AuthService } from '../../../lib/services/auth.service';

@Component({
  selector: 'app-educator-advsior-profile',
  templateUrl: './educator-advsior-profile.component.html',
  styleUrls: ['./educator-advsior-profile.component.scss']
})
export class EducatorAdvsiorProfileComponent implements OnInit {

  currentResource: string ;
  showBio: boolean = false;
  advisorDetails:any;
  public paramsId:any;
  public studentDetails:any;
  public routeCarry:any;

  constructor(    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService:StudentService,
    private authService : AuthService) 
  {
    this.routeCarry =this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.url.split('/')[4];    
        if(this.currentResource==='educator-advisor-biography'){
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

  ngOnDestroy() {
    this.routeCarry.unsubscribe();
   }

  getProfileDetails(id){
    this.studentService.getAdvisorProfile(id).subscribe(data=>{
      this.advisorDetails = data['data'];
    })
  }

  bio(){

    this.router.navigateByUrl(`/dashboard/educator-advisor-profile/${this.paramsId}/educator-advisor-biography`)

  }
  career(){
    this.router.navigateByUrl(`/dashboard/educator-advisor-profile/${this.paramsId}/educator-advisor-career`)
    
  }
  education(){
    this.router.navigateByUrl(`/dashboard/educator-advisor-profile/${this.paramsId}/educator-advisor-education`)
    
  }
  advice(){
    this.router.navigateByUrl(`/dashboard/educator-advisor-profile/${this.paramsId}/educator-advisor-advice`)
    
  }

}
