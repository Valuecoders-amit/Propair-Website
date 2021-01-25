import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../lib/services/auth.service'
import { ToasterService } from 'angular2-toaster';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss']
})
export class StudentLoginComponent implements OnInit {

  public loginForm: FormGroup;
  public roles:any;
  fields: any = {};
  passChange: boolean = false;

  constructor(    private router: Router,
    private _fb: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
) {

    this.loginForm = this._fb.group({

      email:new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/]).{8,}$' )]),
      // password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$' )]),


    });

     }

  ngOnInit() {
  }


  login() {

    if (this.loginForm.get('email').invalid) {
      return this.toasterService.error('Error', 'Email  is required')
    }
    if (this.loginForm.get('password').invalid) {
      return this.toasterService.error('Error', 'password  is required')
    }

    this.SpinnerService.show();

    let payload = {
      email:this.loginForm.value.email,
      password : this.loginForm.value.password,
      role:'Student'

    }

    this.authService.login(payload).subscribe(data => {  
      if (data['status'] == 200) {
        this.router.navigate(['/student-module']);
        this.toasterService.success('Success', data['message']);
        this.SpinnerService.hide();
        this.authService.setToken(data['data'].token);
        this.authService.setUserInfo(data['data'].UserData);   

      }else{
        this.SpinnerService.hide();
        this.toasterService.error('Error', data['message']);
      }


    }
    ,  err=>{
      this.SpinnerService.hide();
      this.toasterService.error('Error', err.error.message);
  })
  }


  showPassword(d) {
    this.fields[d] = !this.fields[d];
  }


  changePassword() {
    this.passChange = !this.passChange;
  }

}
