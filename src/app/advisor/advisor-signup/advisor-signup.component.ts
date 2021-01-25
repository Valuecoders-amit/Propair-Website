import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../lib/services/auth.service'
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from "@angular/router";
import * as jwt_decode from "jwt-decode";
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-advisor-signup',
  templateUrl: './advisor-signup.component.html',
  styleUrls: ['./advisor-signup.component.scss']
})
export class AdvisorSignupComponent implements OnInit {

  public token
  public userId
  fields: any = {};
  passChange: boolean = false;


  public signupForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
     private router: Router,
      private authService: AuthService,
       private toasterService: ToastrService,
       private route: ActivatedRoute,
       private SpinnerService: NgxSpinnerService,
  ) { 
    this.signupForm = this._fb.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/]).{8,}$' )]),
      confirmPassword: new FormControl('', Validators.required),
      token: new FormControl('')
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token")
    this.decode()
  }

  checkLink(){

    let signupToken =  Object.assign( { token: this.token});
    this.authService.checkToken(signupToken).subscribe(data=>{
      if(data['status']==200){
        
      }else{

        this.router.navigate(["**"]);
        this.toasterService.error('error', data['message']);
      }
      
    },    err=>{
      
    this.toasterService.error('error', err.error.message);
    this.router.navigate(["**"]);

  }
    
    )

  }



  signUp() {
    
    if (this.signupForm.get('password').invalid) {
      return this.toasterService.error('error', 'Password should contains Minimum 8 characters including 1 Special character, 1 Numeric character, 1 Small and 1 Capital Characters.')
    }

    if (this.signupForm.get('confirmPassword').invalid) {
      return this.toasterService.error('Error', 'Please confirm your password')
    }
    if (this.signupForm.value.password.length < 5) {
      return this.toasterService.error('Error', ' Password length should be atleast 5 characters')
    }

    if (this.signupForm.value['confirmPassword'] != this.signupForm.value['password']) {
      return this.toasterService.error('Error', 'Password and confirm password do not match');
    }

    this.SpinnerService.show();

    
    this.signupForm.patchValue({token: this.token});
    
    

    this.authService.UpdateEducatorPassword(this.signupForm.value,this.userId).subscribe(data => {
      if (data['status'] == 200) {
        this.SpinnerService.hide();
        this.toasterService.success('success', data['message']);
        this.router.navigate(["/advisor/advisor-login"]);
      }else{
        this.SpinnerService.hide();
        
        this.toasterService.error('error', data['message']);
      }
  

  },    err=>{
      this.SpinnerService.hide();
      
    this.toasterService.error('error', err.error.message);
  }
  
  )

  }

      /* Get Token Info */
      getDecodedAccessToken(token: string): any {
        try {
          return jwt_decode(token);
        } catch (Error) {
          return null;
        }
      }

      decode(){
        const decodeToken = this.getDecodedAccessToken(this.token);
        this.userId = decodeToken.userId
        this.signupForm.patchValue({
          firstName: decodeToken.firstName,
          lastName: decodeToken.lastName,
          email: decodeToken.email
    
      });
        
      }

      showPassword(d) {
        this.fields[d] = !this.fields[d];
      }
    
    
      changePassword() {
        this.passChange = !this.passChange;
      }

}
