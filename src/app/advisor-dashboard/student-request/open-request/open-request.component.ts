import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../../../lib/services/auth.service';
import { StudentService} from '../../../lib/services/student.service';
import { ToastrService } from 'ngx-toastr';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-open-request',
  templateUrl: './open-request.component.html',
  styleUrls: ['./open-request.component.scss']
})
export class OpenRequestComponent implements OnInit {

  openRequests:Array<any>=[];
  validRefer : FormGroup;
  userFirstName : string= null;
  modalRef2 : BsModalRef;
  modalRef3 : BsModalRef;
  modalAccept : BsModalRef;
  modalAccept2 : BsModalRef;
  questionId:string;
  submitted : boolean = false;
  acceptId : string = null;
  requestCount : any

  constructor(  private authservice: AuthService,
    private toasterService: ToastrService,
    private modalService : BsModalService,
    private fb : FormBuilder,
    private router: Router,
    private SpinnerService : NgxSpinnerService,
    private studentService: StudentService) { }

  ngOnInit() {
    let userData=this.authservice.getUserInfo()
    this.userFirstName = userData.firstName;

    this.validRefer = this.fb.group({
    'email':['', Validators.compose([Validators.required,Validators.pattern(/^(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*(;|,)\s*|\s*$))+$/)])]
    });

    this.openRequestsListing();
  }

  get f(){ 
    
    
    return this.validRefer.controls;}


  openRequestsListing(){
    this.SpinnerService.show();
    this.authservice.studentmessageRequests().subscribe(data=>{
      this.requestCount = data['matchCount']
      this.studentService.openRequestCounts(this.requestCount)
      if(data['referredData'] && data['referredData'].length){
      this.openRequests = data['data'].concat(data['referredData']);
      }
      else {
        this.openRequests = data['data'];
      }
      this.SpinnerService.hide();

    },err=>{
      this.SpinnerService.hide();
    })
  }

  
  acceptMessage(id , template: TemplateRef<any>){
    this.acceptId = id ;
    this.modalAccept = this.modalService.show(template, Object.assign({}, { class: 'aacrqwidth' }) );
   
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
        this.openRequestsListing();
        this.validRefer.reset();
        this.modalRef2.hide();
        this.modalRef3 = this.modalService.show(template);

      }else{
        this.toasterService.error('Error' , data['message'])
      }
    }, err =>{
      this.toasterService.error("Erroe" , err.error.message);
    })
   
  }


  openRequestFilter(filter){
    if(filter == 'all'){
      this.openRequestsListing();
    }
    else {
      this.authservice.openRequestFilter(filter).subscribe(data =>{
      this.openRequests = data['data'];
      })
    }
   
  }


  showMore(data){
    data['showMore'] = true;
  }
  showLess(data){
    data['showMore'] = false;
  }

  referToAnother(template: TemplateRef<any>){
 
    if( this.modalRef3){
     this.modalRef3.hide();
 
    }
   this.modalRef2 = this.modalService.show(template);
  }


  proceedAccept(template: TemplateRef<any>){
 this.authservice.studentAcceptRequest(this.acceptId).subscribe(data=>{
        if(data['status'] == 200 ){
          this.toasterService.success('Success', data['message'])
          // this.router.navigateByUrl('/advisor-dashboard/advisor-my-message/advisor-inbox')
          this.openRequestsListing();
          this.modalAccept.hide();
          this.modalAccept2 = this.modalService.show(template , Object.assign({}, { class: 'gray modal-md' }));
          this.acceptId= null;

        }else{
          this.toasterService.error('Error', data['message'])
        }

    },err =>{
      this.modalAccept.hide();
      this.toasterService.error('Error',err.error.message)

    }
    )
  }

  new(){
    this.modalAccept2.hide()
    this.router.navigateByUrl('/advisor-dashboard/advisor-my-message/advisor-inbox')
  }


  navigateToStudent(id : string){
    window.open(`/advisor-dashboard/advisor-student-profile/${id}`, "_blank");
    // this.router.navigate(['advisor-dashboard','advisor-student-profile',id , 'advisor-student-biography']);
  }


  moveToDashboard(){
    this.modalRef3.hide();
    this.router.navigate(['advisor-dashboard']);
  }


}
