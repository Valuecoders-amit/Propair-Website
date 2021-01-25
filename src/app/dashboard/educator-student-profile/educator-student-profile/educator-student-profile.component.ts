import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { StudentService } from '../../../lib/services/student.service';
import { AuthService } from '../../../lib/services/auth.service'

@Component({
  selector: 'app-educator-student-profile',
  templateUrl: './educator-student-profile.component.html',
  styleUrls: ['./educator-student-profile.component.scss']
})
export class EducatorStudentProfileComponent implements OnInit {

  public paramsId:any;
  public currentResource:string;
  public routeCarry:any;

  public studentDetails:any

  constructor(    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService:StudentService,
    private authService : AuthService) 
    {
      this.routeCarry=this.router.events.subscribe(event => {
        if( event instanceof NavigationEnd ) {
          this.currentResource = event.urlAfterRedirects.split('/')[4];  
  
        }
      })
    }

  ngOnInit() {
    console.log('parent component')


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
      console.log(this.studentDetails,'data')
    })
  }

  bio(){

    this.router.navigateByUrl(`/dashboard/educator-student-profile/${this.paramsId}/educator-student-biography`)
  }

  career(){
    this.router.navigateByUrl(`/dashboard/educator-student-profile/${this.paramsId}/educator-student-career`)
  }

  achievements(){
    this.router.navigateByUrl(`/dashboard/educator-student-profile/${this.paramsId}/educator-student-achievements`)
  }

  watch(){
    this.router.navigateByUrl(`/dashboard/educator-student-profile/${this.paramsId}/educator-student-watched`)

  }

}
