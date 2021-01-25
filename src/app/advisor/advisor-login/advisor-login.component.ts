import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../lib/services/auth.service'
import { ToasterService } from 'angular2-toaster';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-advisor-login',
  templateUrl: './advisor-login.component.html',
  styleUrls: ['./advisor-login.component.scss']
})
export class AdvisorLoginComponent implements OnInit {

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
    this.SpinnerService.hide();
  }

  // Advisor login function 
  login() {

    if (this.loginForm.get('email').invalid) {
      return this.toasterService.error('Error', 'Email  is required')
    }
    if (this.loginForm.get('password').invalid) {
      return this.toasterService.error('Error', 'Password  is required')
    }

    this.SpinnerService.show();
    let payload = {
      email:this.loginForm.value.email,
      password:this.loginForm.value.password,
      role:'advisor'
    }

    this.authService.login(payload).subscribe(data => {  
      if (data['status'] == 200) {
        this.router.navigate(['/advisor-dashboard']);
        this.toasterService.success('Success', data['message']);
        this.SpinnerService.hide();
        localStorage.clear();
        this.authService.setToken(data['data'].token);
        this.authService.setUserInfo(data['data'].UserData);        

      }else{
        this.SpinnerService.hide();
        this.toasterService.error('Error', data['message']);
      }

    },err=>{
      this.SpinnerService.hide();
      this.toasterService.error('Error', err.error.message);
  })
  }
  // Advisor login function end



  // Toggele  password button
  showPassword(d) {
    this.fields[d] = !this.fields[d];
  }
  // Toggele  password button end 


  changePassword() {
    this.passChange = !this.passChange;
  }


  // Navigate to signup page
  signup(){
    this.router.navigateByUrl("/advisor/advisor-referal-signup/0")
  }
  // Navigate to signup page end

}
