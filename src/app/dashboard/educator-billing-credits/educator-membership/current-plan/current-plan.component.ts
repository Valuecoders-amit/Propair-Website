import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../lib/services/auth.service'
import { StudentService } from '../../../../lib/services/student.service'
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-current-plan',
  templateUrl: './current-plan.component.html',
  styleUrls: ['./current-plan.component.scss']
})
export class CurrentPlanComponent implements OnInit {

  public userData:any;
  public userInfo:any;
  public VAT : any;
  public showMembership = false

  public subTotal : any;


  constructor(private authservice : AuthService,
    private studentService : StudentService,
    private router: Router) { }

  ngOnInit() {
    this.currentPlan();
    // this.userInfo =this.authservice.getUserInfo()
    // let membershipEndTime = new Date(this.userInfo.membership.membershipEndingTime).getTime()
    // let newDate =  new Date().getTime()
    // this.authservice.showMembership.subscribe(data =>{
    //   if(!data){
    //     this.showMembership = true
    //   }
    //   else if(newDate > membershipEndTime ){
    //     this.showMembership = true
    //   }else if(newDate < membershipEndTime){
    //     this.showMembership = false
    //   }
    // })

  }

  currentPlan(){
    this.studentService.getCurrentmembership().subscribe(data=>{
      this.userData = data['data']
      this.VAT = Math.round(20/100 * this.userData.totalAmount)
      this.subTotal = this.userData.totalAmount + this.VAT
      let membershipEndTime = new Date(this.userData.membershipEndingTime).getTime()
      let newDate =  new Date().getTime()
     if(newDate > membershipEndTime ){
       this.showMembership = true
     }else if(newDate < membershipEndTime){
       this.showMembership = false
 }
    })
  }

  submit(){
    let key = false
    this.authservice.educatorTootTip.next(key)
    this.router.navigateByUrl('/dashboard/educator-billing-credits/membership/available-membership')
  }

  
}
