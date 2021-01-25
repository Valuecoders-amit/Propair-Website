import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../lib/services/auth.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public forgetForm: FormGroup;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
  ) {
    this.forgetForm = this._fb.group({

      email: [null, [Validators.required, Validators.email]],


    });
   }

  ngOnInit() {
  }


  send(){

    if (this.forgetForm.get('email').invalid) {
      return this.toasterService.error('error', 'Please enter email')
    }

    this.authService.sendForgetPasswordLink(this.forgetForm.value).subscribe(data=>{
      if(data['status']==200){
        this.toasterService.success('Success',data['message'])
        this.forgetForm.reset()
      }else{

        this.toasterService.error('Error',data['message'])
      }
    },err =>{
      this.toasterService.error('Error', err.error.message)
    })
  }
}
