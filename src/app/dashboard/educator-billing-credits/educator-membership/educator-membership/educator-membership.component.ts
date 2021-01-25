import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Options } from "ng5-slider";
import { StudentService } from '../../../../lib/services/student.service'
import { ToastrService } from "ngx-toastr";
import { AuthService } from '../../../../lib/services/auth.service'

@Component({
  selector: 'app-educator-membership',
  templateUrl: './educator-membership.component.html',
  styleUrls: ['./educator-membership.component.scss']
})
export class EducatorMembershipComponent implements OnInit {

  currentResource: string;
  routeCarry : Subscription;
  public current:boolean = true;
  public available:boolean = false;
  public change : boolean = false;
  public userInfo : any;
  public showMembership = false
  public userData:any;

  student: number = 50;
  credit: number = 2;
  options: Options = {
    floor: 50,
    ceil: 1000,
    step: 50,
    // showTicks: true,
    // showTicksValues: true,
    showSelectionBar: true
  };

  options2: Options = {
    floor: 2,
    ceil: 10,
    step: 1,
    // showTicks: true,
    // showTicksValues: true,
    showSelectionBar: true
  };


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService : StudentService,
    private toasterService: ToastrService,
    private authService : AuthService,
  )
   { 
    this.routeCarry=this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.urlAfterRedirects.split('/')[4];    
      }
    })
   }

  ngOnInit() {

    this.CurrentPlan();
    this.authService.showMembership.subscribe(data =>{
      if(data == false){
        this.showMembership = false
      }else{
        this.showMembership = true
      }

    })

    this.authService.educatorTootTip.subscribe(data=>{
      this.available = true ;
      this.current = false ;
      this.change = false;
      this.studentCountChange();
    })

    
    if(this.currentResource =='available-membership'){
      this.available = true ;
      this.current = false ;
      this.change = false;
      this.studentCountChange();
    }else if (this.currentResource =='current-plan'){
      this.current = true;
      this.available = false;
      this.change = false;
    }else if (this.currentResource =='change-plan'){
      this.change = true;
      this.current = false;
      this.available = false;
    }
  }

  CurrentPlan(){
    this.studentService.getCurrentmembership().subscribe(data=>{
      this.userData = data['data']
         let membershipEndTime = new Date(this.userData.membershipEndingTime).getTime()
         let newDate =  new Date().getTime()
        if(newDate > membershipEndTime ){
          this.showMembership = true
        }else if(newDate < membershipEndTime){
          this.showMembership = false
    }
    })
  }

  ngOnDestroy() {
    this.routeCarry.unsubscribe();
   }

   currentPlan(){
    // this.available = ! this.available
    this.current = true;
    this.available = false;
    this.change = false;

   }

   availableMembership(){
     this.available = true ;
     this.current = false ;
     this.change = false;
     this.studentCountChange();

   }

   changePlan(){
    this.change = true;
    this.current = false;
    this.available = false;

   }

   studentCountChange() {
     
    let data = {
      students: this.student,
      credit: this.credit
    };

    // this.studentService.studentSliderData.next(data)
    this.studentService.membershipPrize(data).subscribe(
      data => {

          this.studentService.setSliderData(data['data'])
          this.studentService.sliderData.next(data['data'])
      },
      error => {
        // this.toasterService.error("error", "Students can not be Zero ");
      }

    );
  }

}
