import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators ,FormControl } from '@angular/forms';
import { StudentService } from '../../../../lib/services/student.service';
import { AuthService } from '../../../../lib/services/auth.service';
import { MustMatch } from './mustMatch';

@Component({
  selector: 'app-advisor-new-signup1',
  templateUrl: './advisor-new-signup1.component.html',
  styleUrls: ['./advisor-new-signup1.component.scss']
})
export class AdvisorNewSignup1Component implements OnInit {
  
  signupForm:FormGroup;
  public token;
  public myToken;
  public userId;
  submitted:boolean = false;

  constructor(
    private router: Router,
    private toastr:ToastrService,
    private SpinnerService: NgxSpinnerService,
    private fb : FormBuilder,
    private profileService: StudentService, 
    private authService : AuthService
  ) { 
    this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.token = event.url.split('/')[2];    
      }
    })

    this.profileService.AdvisorNewMessageTab1=true;
    this.profileService.AdvisorNewMessageTab2=false;
    this.profileService.AdvisorNewMessageTab3=false;
    this.profileService.AdvisorNewMessageTab4=false;
    this.profileService.AdvisorNewMessageTab5=false;
    this.profileService.AdvisorNewMessageTab6=false;


  }

  ngOnInit() {
   
    this.signupForm = this.fb.group({
     'password':new FormControl('', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/]).{8,}$' )]),
     'confirmPassword': ['', Validators.required]
    },{
      validator: MustMatch('password', 'confirmPassword')
  });

  this.profileService.signupFlowtoken = this.token;
  this.decode();

  }

  get f() { return this.signupForm.controls; }


  next(){

    this.submitted=true;

    if (this.signupForm.invalid) {
      return;
  }
    let payload = {
      password: this.signupForm.value.password,
      token:this.myToken
    }

    this.SpinnerService.show();
    this.profileService.signupPassword(this.userId , payload).subscribe(data=>{
      this.SpinnerService.hide();
      this.router.navigate(['/advisor-newsignup',this.profileService.signupFlowtoken,'advisor-new-message2'])
    },err => {
      this.SpinnerService.hide();
    })

    

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  decode(){
    const decodeToken = this.getDecodedAccessToken(this.token);
    this.myToken =decodeToken.token;
    this.userId = decodeToken.userId;

    this.authService.setToken(this.myToken);
   
    
  }

}
