import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../lib/services/auth.service'
import { ToasterService } from 'angular2-toaster';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  fields: any = {};
  passChange: boolean = false;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,

  ) {

    this.loginForm = this._fb.group({

      email:new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/]).{8,}$' )]),

    });

  }

  ngOnInit() {

    // if (this.authService.getToken()) {
    //   this.router.navigate(['/dashboard']);
    // }

  }
  demo(){
    // window.location.href="https://ben110028.typeform.com/to/yu9gjLbm"
    window.open("https://ben110028.typeform.com/to/yu9gjLbm", "_blank")
  }
  login() {

    if (this.loginForm.get('email').invalid) {
      return this.toasterService.error('error', 'Email  is required')
    }
    if (this.loginForm.get('password').invalid) {
      return this.toasterService.error('error', 'password  is required')
    }

    this.SpinnerService.show();

    let payload = {
      email:this.loginForm.value.email,
      password :this.loginForm.value.password,
      role : 'educator'
    }


    this.authService.login(payload).subscribe(data => {
      
      if (data['status'] == 200) {
        this.router.navigate(['/dashboard']);
        this.toasterService.success('Success', data['message']);
        this.SpinnerService.hide();
        this.authService.setToken(data['data'].token);
        this.authService.setUserInfo(data['data'].UserData);
        this.createCustomer();

      }else{
        this.SpinnerService.hide();
        this.toasterService.error('Error', data['message']);
      }



    },err=>{
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

  createCustomer(){
    this.authService.createCustomer().subscribe(data =>{
    })
  }

}
