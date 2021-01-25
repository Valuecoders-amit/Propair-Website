import { Component, OnInit ,ViewChild, ElementRef, TemplateRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../../lib/services/auth.service';
import { StudentService } from '../../../../lib/services/student.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-student-message-reply',
  templateUrl: './student-message-reply.component.html',
  styleUrls: ['./student-message-reply.component.scss']
})
export class StudentMessageReplyComponent implements OnInit {

  public messageExchangeId: string;
  public messageExchangeArchiveThread : any ;
  flagPopupModal: BsModalRef;
  flag:Array<any>=[];
  FlagId:string;
  public issueReason:Array<any>=[{reason:'It’s rude, vulgar or uses bad language', key:1},{reason:'It’s contains sensitive or inapprpiate content', key:2},{reason:'It’s expresses intentions of self-harm or sucide', key:3}];
  modalRef2 : BsModalRef;
  modalRef3 : BsModalRef;
  flagModal : BsModalRef;
  flagSuccessModal : BsModalRef;
  userData:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService : BsModalService,
    private toasterService: ToastrService,
    private studentService: StudentService,
    private authService : AuthService,
    private router : Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.userData = this.authService.getUserInfo();

    this.activatedRoute.params.subscribe((param) => {
      this.messageExchangeId = param.id;
      this.views(); 
      this.messageDetails(this.messageExchangeId);

    })
  }

  
  messageDetails(id) {

    this.studentService.messageThreadDetail(id).subscribe(data => {
      this.messageExchangeArchiveThread = data['data']
      
    })
  }
  
  back(){
    this.location.back();
  }

  
  upvote(){
  
    this.authService.upVotes(this.messageExchangeId).subscribe(data=>{
      if(data['status'] == 200){
        this.toasterService.success('Success',data['message'])
        this.messageDetails(this.messageExchangeId)
      }else{
        this.toasterService.error('Error' , data['message'])
      }
    },err =>{
      this.toasterService.error('Error' , 'Sorry , You have already upvoted');
    })
  }

  views(){
    this.authService.views(this.messageExchangeId).subscribe(data=>{
      // this.toasterService.success('Sucess',data['message'])/
      // this.messageDetails(this.messageExchangeId)
    })

  }

  markFavorite(){
    this.authService.favorites(this.messageExchangeId).subscribe(data=>{
      this.toasterService.success('Sucess',data['message'])
      this.messageDetails(this.messageExchangeId)
    })
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

    this.flagModal = this.modalService.show(template);
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
    
      this.messageDetails(this.messageExchangeId);
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

  studentProfileNavigate(id){
    if(this.userData._id == id){
      this.router.navigateByUrl('/student-module/dashboard/student-profile/student-biography')

    }else{
      this.toasterService.error('Student can not see another student profile')
    }
  }

  profile(data,id){
    if(data.ownerId.role == 'advisor'){
      window.open(`/student-module/dashboard/student-advisor-profile/${id}/student-advisor-biography`)
    }else{
      this.router.navigateByUrl(`/student-module/dashboard/student-profile/student-biography`)
    }
  }

}
