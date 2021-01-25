import { Component, OnInit } from '@angular/core';
import {StudentService } from '../../../../lib/services/student.service'
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-advisor-new-signup3',
  templateUrl: './advisor-new-signup3.component.html',
  styleUrls: ['./advisor-new-signup3.component.scss']
})
export class AdvisorNewSignup3Component implements OnInit {

  personalDetail:FormGroup;
  constructor(
    private profileService : StudentService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private toastr:ToastrService,
    private fb : FormBuilder,
  ) { 
    this.profileService.AdvisorNewMessageTab1=true;
    this.profileService.AdvisorNewMessageTab2=true;
    this.profileService.AdvisorNewMessageTab3=true;
    this.profileService.AdvisorNewMessageTab4=false;
    this.profileService.AdvisorNewMessageTab5=false;
    this.profileService.AdvisorNewMessageTab6=false;
  }

  ngOnInit() {
    this.personalDetail = this.fb.group({
      'biography': ['', Validators.required]
    })

    this.getBioData();
  }

  next(){

    
  

    let payload ={
      "biography":this.personalDetail.value.biography
    }

    this.updateBio(payload);

  }

  skip(){
    this.router.navigate(['/advisor-newsignup',this.profileService.signupFlowtoken,'advisor-new-message4']);

  }

  privious(){
    this.router.navigate(['/advisor-newsignup',this.profileService.signupFlowtoken,'advisor-new-message2']);

  }

  getBioData(){
    
    this.profileService.bioData().subscribe(data =>{
      let bio = data['data'];
      this.personalDetail.setValue({
        'biography':bio.biography || ''
      })

    })
  }

  updateBio(payload){
    this.SpinnerService.show();
    this.profileService.signupFlow3(payload).subscribe(data => {
      this.SpinnerService.hide();
      this.router.navigate(['/advisor-newsignup',this.profileService.signupFlowtoken,'advisor-new-message4']);
    },err => {
      this.SpinnerService.hide();
    })
  }

}
