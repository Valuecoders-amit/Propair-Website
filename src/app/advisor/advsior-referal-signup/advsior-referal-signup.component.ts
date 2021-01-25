import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../lib/services/auth.service'
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from "jwt-decode";
import { NgxSpinnerService } from "ngx-spinner"; 
import { AdvisorService } from '../../lib/services/advisor.service'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-advsior-referal-signup',
  templateUrl: './advsior-referal-signup.component.html',
  styleUrls: ['./advsior-referal-signup.component.scss']
})
export class AdvsiorReferalSignupComponent implements OnInit {

  public referralSignupForm:FormGroup
  currentResource: string ;
  selectedOption: number;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
     private authService: AuthService,
      private toasterService: ToastrService,
      private route: ActivatedRoute,
      private SpinnerService: NgxSpinnerService,
      private advsiorService : AdvisorService
  ) { 

    this.selectedOption = 0;
    this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.urlAfterRedirects.split('/')[3];  
      }
    })

    this.referralSignupForm = this._fb.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  ngOnInit() {
    this.advisorViews();
  }
  
// Advsior signup function
  signUp(){

    if (this.referralSignupForm.get('firstName').invalid) {
      return this.toasterService.error('Error', 'First name is required')
    }

    if (this.referralSignupForm.get('lastName').invalid) {
      return this.toasterService.error('Error', 'Last name is required')
    }

    if (this.referralSignupForm.get('email').invalid) {
      return this.toasterService.error('Error', 'Email name is required')
    }

    let paylaod ;
    if(this.currentResource == '0'){
      paylaod = {
        firstName:this.referralSignupForm.value.firstName,
        lastName:this.referralSignupForm.value.lastName,
        email:this.referralSignupForm.value.email,
        type:"normal",
       
      }
    }
    else {
      paylaod = {
        firstName:this.referralSignupForm.value.firstName,
        lastName:this.referralSignupForm.value.lastName,
        email:this.referralSignupForm.value.email,
        type:'referral',
        referralCode : this.currentResource
      }
    }

   

  this.advsiorService.advisorRegisterationThrougReferral(paylaod).subscribe(data=>{
    if(data['status'] == 200){
      this.toasterService.success('Success' , 'Wait List Created')
      this.referralSignupForm.reset()
    }else{
      this.toasterService.error('Error', data['message'])
    }
  },err=>{
    this.toasterService.error('Error', err.error.message)
  })    

  }
  // Advsior signup function end

  
  //Advisor view function
  advisorViews(){
    let payload = { code : this.currentResource}
    this.advsiorService.advisorViews(payload).subscribe(data=>{
      if(data['status']==200){
      }
    })
  }
  //Advisor view function end

}
