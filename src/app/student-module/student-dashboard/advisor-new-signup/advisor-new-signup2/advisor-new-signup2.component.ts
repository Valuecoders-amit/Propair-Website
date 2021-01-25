import { Component, OnInit } from '@angular/core';
import {StudentService } from '../../../../lib/services/student.service'
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import {ToastrService} from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-advisor-new-signup2',
  templateUrl: './advisor-new-signup2.component.html',
  styleUrls: ['./advisor-new-signup2.component.scss']
})
export class AdvisorNewSignup2Component implements OnInit {
  personalDetail:FormGroup;
  options = {};
  submitted:boolean = false;

  constructor(private studentService : StudentService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private profileService : StudentService,
    private fb : FormBuilder,
    private toastr:ToastrService,) {

      this.profileService.AdvisorNewMessageTab1=true;
      this.profileService.AdvisorNewMessageTab2=true;
      this.profileService.AdvisorNewMessageTab3=false;
      this.profileService.AdvisorNewMessageTab4=false;
      this.profileService.AdvisorNewMessageTab5=false;
      this.profileService.AdvisorNewMessageTab6=false;

   }

  ngOnInit() {
    this.personalDetail = this.fb.group({
      'title':new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
      'firstName':new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z]+$' )]),
      'lastName':new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
      'email': new FormControl ('', [Validators.required, Validators.email]),
      // 'contactNumber':['', [Validators.required ,Validators.pattern('/^-?(0|[1-9]\d*)?$/')]],
      'contactNumber':['', [Validators.required]],
      'address1':['', Validators.required],
      'address2':['', Validators.required],
      'location':['', Validators.required],
      'pincode':['', Validators.required]

    })

    this.getPersonalDetails();
  }
  
  get f() { return this.personalDetail.controls; }

  next(){

    this.submitted=true;  

    if (this.personalDetail.invalid) {
      return;
  }
  
    let payload={
      "firsName":this.personalDetail.value.firstName,
      "lastName":this.personalDetail.value.lastName,
      "title":this.personalDetail.value.title,
      "email":this.personalDetail.value.email,
      "contact":this.personalDetail.value.contactNumber,
      "address1":this.personalDetail.value.address1,
      "address2":this.personalDetail.value.address2,
      "location":this.personalDetail.value.location,
      "pincode":this.personalDetail.value.pincode,
      }

      this.updateSignup2( payload);

  }

  skip(){
    this.router.navigate(['/advisor-newsignup',this.profileService.signupFlowtoken,'advisor-new-message3'])

  }


  getPersonalDetails(){
    this.profileService.getPersonalInfo().subscribe(data => {
      let personal = data['data'];
      this.personalDetail.setValue({
      'title':personal.title || '',
      'firstName':personal.firstName || '',
      'lastName':personal.lastName || '',
      'email': personal.email || '',
      'contactNumber':personal.contact || '',
      'address1':personal.address1 || '',
      'address2':personal.address2 || '',
      'location':personal.location || '',
      'pincode':personal.pincode || ''
      })
    })
  }

  updateSignup2( payload){
   
    this.SpinnerService.show();
    this.profileService.signupFlow2( payload).subscribe(data=>{
      this.SpinnerService.hide();
    this.router.navigate(['/advisor-newsignup',this.profileService.signupFlowtoken,'advisor-new-message3']);

    },err => {
      this.SpinnerService.hide();
    })
  }

   //Google_Api
   public handleAddressChange(value: any) {
    this.personalDetail.patchValue({
      location: value.formatted_address,
    });
  }

}
