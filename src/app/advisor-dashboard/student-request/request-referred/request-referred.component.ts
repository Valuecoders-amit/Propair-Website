import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../../../lib/services/auth.service'
import { ToastrService } from 'ngx-toastr';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-referred',
  templateUrl: './request-referred.component.html',
  styleUrls: ['./request-referred.component.scss']
})
export class RequestReferredComponent implements OnInit {

 liveRequestData:Array<any>=[];
 expiredRequestData:Array<any>=[];
 referralData : Object;
 userFirstName : string= null;
 modalRef2 : BsModalRef;
 modalRef3 : BsModalRef;
 modalRef4: BsModalRef;
 questionId:string;
 liveTab:boolean = true;
 validRefer: FormGroup;
 submitted : boolean = false;


  constructor( private authservice: AuthService,
    private toasterService: ToastrService,
    private modalService : BsModalService,
    private fb : FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.liveRequests();
    this.validRefer = this.fb.group({
      'email':['', Validators.compose([Validators.required,Validators.pattern(/^(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*(;|,)\s*|\s*$))+$/)])]
      });
  }

  get f(){ 
    
    return this.validRefer.controls;}

  liveRequests(){
    this.authservice.liveRequestsData().subscribe(data => {
      this.liveRequestData=data['data'];
    })
  }

  liveFilter(filter){
    if(filter == 'all'){
      this.liveRequests();
    }
    else{
      this.authservice.liveFilterData(filter).subscribe(data => {
        this.liveRequestData = data['data'];
      })
    }

  }

  referRequest(template: TemplateRef<any> , id){
    this.validRefer.reset();
    this.submitted = false;
    this.questionId =id;
    this.modalRef2 = this.modalService.show(template);
  }

  referMail(template: TemplateRef<any> ){
    this.submitted = true;
    if(this.validRefer.invalid){
      return;
    }
   
    let mails = this.validRefer.value.email.split(",");
    let payload ={
      'questionId':this.questionId,
      'email':mails
      }
    this.authservice.referMail(payload).subscribe(data=>{
      if(data['status'] == 200){
        this.validRefer.reset();
        this.modalRef2.hide();
        this.liveRequests();
        this.submitted = false;
        this.modalRef3 = this.modalService.show(template)

      }else{
        this.toasterService.error("Error" , data["message"])
      }
    }, err=>{
         this.toasterService.error("Error" , err.error.message);
    })
   
  }



 expiredRequests(){
   this.authservice.expiredRequestsData().subscribe(data => {
     this.expiredRequestData = data['data'];
   })
 }

 expiredFilter(filter){
  if(filter == 'all'){
    this.expiredRequests();
  }
  else{
    this.authservice.expiredFilterData(filter).subscribe(data => {
      this.expiredRequestData = data['data'];
    })
  }

 }

 showReferralList(template : TemplateRef < any > , id){
  this.questionId = id;
  this.authservice.getReferral(id).subscribe(data => {
    this.referralData = data;
   this.modalRef4 = this.modalService.show(template);

  })

 }

 showMore(data){
  data['showMore'] = true;
}
showLess(data){
  data['showMore'] = false;
}

referToAnother(template: TemplateRef<any>){
  if(this.modalRef4){
   this.modalRef4.hide();

  }
  if( this.modalRef3){
   this.modalRef3.hide();

  }

 this.modalRef2 = this.modalService.show(template);
}

refertoDashboard(){
  this.modalRef3.hide();
  this.router.navigate(['/advisor-dashboard/stats']);
}

navigateToStudent(id : string){
  if(this.modalRef4){
    this.modalRef4.hide();
  }
  window.open(`/advisor-dashboard/advisor-student-profile/${id}`, "_blank");
  // this.router.navigate(['advisor-dashboard','advisor-student-profile',id , 'advisor-student-biography']);
}


}
