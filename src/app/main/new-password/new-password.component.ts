import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../lib/services/auth.service'
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  fields: any = {};
  newFields :any = {};
  public newForm: FormGroup;
  public token:any;
  currentResource: string ;
  selectedOption: number;
  public email :any;



  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
  ) { 

    this.newForm = this._fb.group({

      password:new FormControl('', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$' )]),


      confirmPassword: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$' )]),

    });
    this.selectedOption = 0;
    this.router.events.subscribe(event => {
    if( event instanceof NavigationEnd ) {
      this.currentResource = event.url.split('/')[2];    
    }
  }) 
  }

  ngOnInit() {
    this.token = this.currentResource

    this.decode()
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
    this.email =decodeToken.email

    }

  showPassword(d) {
    this.fields[d] = !this.fields[d];
  }

  showConfirmPassword(d){
    this.newFields[d] = !this.newFields[d];
  }

  newPasswordSubmit(){

    if (this.newForm.get('password').invalid) {
      return this.toasterService.error('error', 'Password should contains Minimum 8 characters including 1 Special character, 1 Numeric character, 1 Small and 1 Capital Characters.')
    }


    if (this.newForm.value['confirmPassword'] != this.newForm.value['password']) {
      return this.toasterService.error('Error', 'New Password and confirm password do not match');
    }

    let payload = {
      email:this.email,
      password:this.newForm.value.password,
      token:this.token
    }
    this.authService.ForgetPassword(payload).subscribe(data=>{
      if(data['status']==200){
        this.toasterService.success('Success',data['message'])
        this.router.navigateByUrl('')
      }else{
        this.toasterService.error('Error',data['message'])

      }
    })


  }

}
