import { Component, OnInit } from "@angular/core";
import { StudentRegisterService } from "../student-lib/student-register.service";
import { FormGroup, FormBuilder, Validators,FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {CustomValidators} from './custom-validator'
import * as jwt_decode from "jwt-decode";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { StudentService } from "../../lib/services/student.service"
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from '../../lib/services/auth.service'



@Component({
  selector: "app-student-signup",
  templateUrl: "./student-signup.component.html",
  styleUrls: ["./student-signup.component.scss"]
})
export class StudentSignupComponent implements OnInit {
  studentRegistrationForm: FormGroup;
  public token
  public userId
  fields: any = {};
  newFields :any = {};
  passChange: boolean = false;

  constructor(private http: StudentRegisterService,
     private _fb: FormBuilder,
     private toastr:ToastrService,
    private route: ActivatedRoute,
    private studentService:StudentService,
    private router:Router,
    private SpinnerService: NgxSpinnerService,
    private authService:AuthService 
    ) {

    this.studentRegistrationForm = this._fb.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/]).{8,}$' )]),
      confirmPassword: new FormControl('', Validators.required),
      token: new FormControl('')
    });


  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token")
    this.decode()
    this.checkLink();
    
  }

  checkLink(){

    let signupToken =  Object.assign( { token: this.token});
    this.studentService.checkToken(signupToken).subscribe(data=>{
      if(data['status']==200){
        
      }else{
        this.router.navigate(["**"]);
        this.toastr.error('Error', data['message']);
      }
      
    },    err=>{    
    this.toastr.error('Error', err.error.message);
    this.router.navigate(["**"]);

  }
    
    )

  }



  registerStudent() {

    
    if (this.studentRegistrationForm.get('password').invalid) {
      return this.toastr.error('error', 'Password should Contain Minimum 8 Character , 1 Special character, 1 Numeric character, 1 Alpha in Upper Case')
    }

    if (this.studentRegistrationForm.get('confirmPassword').invalid) {
      return this.toastr.error('Error', 'Please confirm your password')
    }
    if (this.studentRegistrationForm.value.password.length < 5) {
      return this.toastr.error('Error', ' Password length should be atleast 5 characters')
    }

    if (this.studentRegistrationForm.value['confirmPassword'] != this.studentRegistrationForm.value['password']) {
      return this.toastr.error('Error', 'Password and confirm password do not match');
    }

    this.SpinnerService.show();
    this.studentRegistrationForm.patchValue({token: this.token});

    this.studentService.UpdateStudentsPassword(this.studentRegistrationForm.value,this.userId).subscribe(data=>{
      if(data['status']==200){
        this.router.navigate(['/student-module']);
        this.toastr.success('Success', data['message']);
        this.SpinnerService.hide();
        this.authService.setToken(data['data'].token);
        this.authService.setUserInfo(data['data'].UserData);   

      }else{
        this.toastr.error('Error', data['message']);
        this.SpinnerService.hide();
      }

      
    },err => {
      this.toastr.error('Error' , err.error.message)
    })
    
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
    this.studentRegistrationForm.patchValue({
      firstName: decodeToken.firstName,
      lastName: decodeToken.lastName,
      email: decodeToken.email

  });
    
  }

  showPassword(d) {
    this.fields[d] = !this.fields[d];
  }

  showConfirmPassword(d){
    this.newFields[d] = !this.newFields[d];
  }



  changePassword() {
    this.passChange = !this.passChange;
  }
  

}
