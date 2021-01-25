import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { StudentService } from '../../../../lib/services/student.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  currentResource: string ;
  studentDetails:any;
  routerContent : Subscription
  public noData: boolean = false;

  constructor(
    private router: Router,
    private profileService: StudentService
  ) {
   this.routerContent = this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.url.split('/')[4];    
      }
    })
   }

  ngOnInit() {
    this.getProfileDetails()
  }

  getProfileDetails(){
    this.profileService.getStudentProfile().subscribe(data=>{
      if(data['status'] == 200){
        this.studentDetails = data['data'];
        this.noData = true;
      }
    })
  }

  ngOnDestroy() {
    this.routerContent.unsubscribe();
  }

}
