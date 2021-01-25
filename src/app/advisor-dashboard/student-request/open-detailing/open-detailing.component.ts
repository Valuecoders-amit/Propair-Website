import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../lib/services/student.service';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../lib/services/auth.service';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-open-detailing',
  templateUrl: './open-detailing.component.html',
  styleUrls: ['./open-detailing.component.scss']
})
export class OpenDetailingComponent implements OnInit {

  modalRef2 : BsModalRef;
  modalRef3 : BsModalRef;
  modalAccept : BsModalRef;
  flagModal : BsModalRef;
  flagSuccessModal : BsModalRef;
  validRefer : FormGroup;
  questionId:string;
  detailingId : string = null;
  openDetailing :any =[];
  flag:Array<any>=[];
  FlagId:string;
  submitted : boolean = false;
  issueReason:Array<any>=[{reason:'It’s rude, vulgar or uses bad language', key:1},{reason:'It’s contains sensitive or inapprpiate content', key:2},{reason:'It’s expresses intentions of self-harm or sucide', key:3}];

  constructor(private activatedRoute : ActivatedRoute,
    private  router : Router,
    private studentService: StudentService,
    private authservice: AuthService,
    private toasterService: ToastrService,
    private modalService : BsModalService,
    private fb : FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      this.detailingId = param.id;
      this.openDetails(this.detailingId);

    })

    this.validRefer = this.fb.group({
      'email':['',  Validators.compose([Validators.required,Validators.pattern(/^(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*(;|,)\s*|\s*$))+$/)])]
      });
     
  }

  get f(){ 
    
    return this.validRefer.controls;}

  openDetails(id) {

    this.studentService.messageThreadDetail(id).subscribe(data => {
      this.openDetailing = data['data']
      

    })
  }

  cancel() {
    this.router.navigateByUrl('/advisor-dashboard/student-requests/open-request');
  }

  referRequest(template: TemplateRef<any>){
    this.validRefer.reset();
    this.submitted = false;
    this.questionId = this.detailingId;
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
    })
    this.validRefer.reset();
    this.modalRef2.hide();
    this.modalRef3 = this.modalService.show(template)
  }

  acceptMessage(template : TemplateRef<any>){
   
    this.modalAccept = this.modalService.show(template, Object.assign({}, { class: 'aacrqwidth' }) );
  }

  proceedAccept(){
    this.authservice.studentAcceptRequest(this.detailingId).subscribe(data=>{
          this.toasterService.success('Sucess', data['message'])
          this.detailingId = null;
          this.modalAccept.hide();
          this.router.navigate(['/advisor-dashboard/advisor-my-message/advisor-inbox'])
  
      },err =>{
        this.toasterService.error('Error',err.error.message)
  
      }
      )
     }

     

  flagChange(item ){
      
    if(!item['status']){
         item['status']=true;
        this.flag.push(item);
       
    }
    else{
       item['status']=false;
        let pos=this.flag.map(el=>el.key).indexOf(item.key)
        this.flag.splice(pos,1) 
    }
    
  }

  flagshow(template : TemplateRef<any> ,ids:string){
    this.FlagId=ids;

    this.flagModal = this.modalService.show(template ,Object.assign({}, { class: 'gray modal-md' }) );
  }
  disableFlag(){
    this.issueReason.forEach(el=>{
      delete el['status'];
    })
    this.flag=[];

    this.flagModal.hide();
  }
  
  flagSubmit(template: TemplateRef<any>){
    if(!this.flag.length){
      this.toasterService.error(`Please check atleast one Reason`)
      return;
    }
   
    this.flagModal.hide();
    let payload={
      flagReason:this.flag,
    }
   
    this.studentService.flagIssue(this.FlagId,payload).subscribe(data => {
      this.flagSuccessModal = this.modalService.show(template);
      this.issueReason.forEach(el=>{
        delete el['status'];
      })
      this.flag=[];
      this.openDetails(this.detailingId);
      this.FlagId='';
      
    },
    error=>{
      this.toasterService.error(`${error.error.messages}`)
      this.issueReason.forEach(el=>{
        delete el['status'];
      })
      this.flag=[];
      this.FlagId='';
    })
  }

  navigateToStudent(id : string){
    window.open(`/advisor-dashboard/advisor-student-profile/${id}`, "_blank");
    // this.router.navigate(['advisor-dashboard','advisor-student-profile',id , 'advisor-student-biography']);
  }
  

  
}
