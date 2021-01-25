import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../lib/services/student.service';
import { AuthService } from '../../lib/services/auth.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';


declare var $


@Component({
  selector: 'app-advisor-inbox-view-message',
  templateUrl: './advisor-inbox-view-message.component.html',
  styleUrls: ['./advisor-inbox-view-message.component.scss']
})
export class AdvisorInboxViewMessageComponent implements OnInit {

  public inboxForm: FormGroup;
  public ReviewForm: FormGroup;
  public sub: any;
  public messageExchangeId: string;
  public messageExchangeThreads: any = [];
  public tags: any;
  public currentRate = 0;
  public issueReason:Array<any>=[{reason:'It’s rude, vulgar or uses bad language', key:1},{reason:'It’s contains sensitive or inapprpiate content', key:2},{reason:'It’s expresses intentions of self-harm or sucide', key:3}];
  public reviewArray = ['1','2','3','4','5']
  public ratingValue: any;
  public helpFulValue: any;
  public relevanceValue: any;
  public clarityValue: any;
  public averagevalue:number;
  flagPopupModal: BsModalRef;
  flag:Array<any>=[];
  FlagId:string;
  public characterValue: any 
  public minlength = 12;
  public availableMinLength: number = -12;
  public advisorProfile : boolean = false;
  public userInfo:any;
  @ViewChild('FlagPopup', { static: false }) FlagPopup: ElementRef;

  constructor(private _fb: FormBuilder,
    private toasterService: ToastrService,
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private authService:AuthService

  ) {

    this.inboxForm = this._fb.group({
      reply: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(3200)]],
      status: new FormControl(''),
      questionId: new FormControl('')

    });
    this.keyUp();
    if(this.availableMinLength > 10){

    }

    this.ReviewForm = this._fb.group({
      reviews: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(999)]],
      ratings: new FormControl(''),
      helpful: new FormControl(''),
      relavance: new FormControl(''),
      clarity: new FormControl(''),
      questionId: new FormControl('')

    });

  }

  ngOnInit() {

    this.userInfo = this.authService.getUserInfo()
    this.activatedRoute.params.subscribe((param) => {
      this.messageExchangeId = param.id;
      this.messageDetails(this.messageExchangeId);

    })

    this.checkRoute();
  }


  checkRoute(){
    if(this.activatedRoute.snapshot.queryParams.advisor){
      this.advisorProfile = true;
    }
  }

  messageDetails(id) {

    this.studentService.messageThreadDetail(id).subscribe(data => {
      this.messageExchangeThreads = data['data']
      this.messageExchangeThreads.replyThread.forEach(item => {
        let duration = moment.duration(moment(new Date()).diff(moment(item.createdAt)));
        if (duration['_data'].seconds > 0) {
          item['duration'] = `Submitted ${duration['_data'].seconds} ${(duration['_data'].seconds) > 1 ? 'seconds' : 'second'} ago by`;
        }
        if (duration['_data'].minutes > 0) {
          item['duration'] = `Submitted ${duration['_data'].minutes} ${(duration['_data'].minutes) > 1 ? 'minutes' : 'minute'} ago by`;
        }
        if (duration['_data'].hours > 0) {
          item['duration'] = `Submitted ${duration['_data'].hours} ${(duration['_data'].hours) > 1 ? 'hours' : 'hour'} 
          ${(duration['_data'].minutes > 0) ? (duration['_data'].minutes == 1) ? `${duration['_data'].minutes} minute` : `${duration['_data'].minutes} minutes` : ''} ago by`;
        }
        if (duration['_data'].days > 0) {
          item['duration'] = `Submitted ${duration['_data'].days} ${(duration['_data'].days) > 1 ? 'days' : 'days'} ago by`;
        }
      })


    })
  }
  cancel(){
    this.router.navigateByUrl('/advisor-dashboard/advisor-my-message/advisor-inbox')
  }


  keyUp() {

  this.inboxForm.get('reply').valueChanges.subscribe(val => {
    // let temp = this.titleForm.value.title
    // if(val.length ){

      this.characterValue = val.length
      if (this.characterValue > 3200) {
        return false
      }
      if (this.characterValue < 12) {
        this.availableMinLength = - 12 + this.characterValue
      } else {
        this.availableMinLength = this.characterValue;
      }

    // }
  });


}



  sendPopup(){

    
    if (!this.inboxForm.value.reply) {
      this.toasterService.error('Error',"Please enter your message");
    }
    else if(this.availableMinLength <= 12){
      return this.toasterService.error('Error', 'Atleast 12 characters  are required ')
    }
    else if(this.inboxForm.get('reply').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 3200 characters ')
    } else {
      // this.approveModal = this.modalService.show(this.approvePopup);
      $("#send-private").modal("show");
    }

  }


  send(x) {
    if(x){

      this.inboxForm.patchValue({ status: 'reply' })
      this.inboxForm.patchValue({ questionId: this.messageExchangeId })
  
      this.studentService.sendReply(this.inboxForm.value).subscribe(data=>{
        if(data['status']== 200){
          this.toasterService.success('Success',data['message'])
          this.messageDetails(this.messageExchangeId)
          this.inboxForm.reset();
        $("#send-private").modal("hide");
        $("#ma-sucsess").modal("show");
  
        }else{
          this.toasterService.error('Error', data['message'])
        }
      },err =>{
        this.toasterService.error('Error' ,err.error.message)
      }
      )
    }else{
      $("#send-private").modal("hide");

    }


  }

  closePopup(){
    // $("#reveiw-modal").modal("show");
    $("#checklist").modal("show");

  }

  close(x){
    if(x){
      this.studentService.markMessageComplete(this.messageExchangeId).subscribe(data=>{
        if(data['status'] == 200){
          this.toasterService.success('Success',data['message'])
        $("#m-sucsess").modal("show");
        // this.router.navigateByUrl('student-module/dashboard/student-my-message/inbox')
        }
        else{
          this.toasterService.error('Error',data['message'])
        }
      },err=>{
        this.toasterService.error('Error', err.error.message)
      })
    }else{
    $("#checklist").modal("hide");

    }
  }

  draft(){

    if(!this.inboxForm.value.reply){
      this.toasterService.error('Error', "Please enter your message");

    }else if(this.inboxForm.get('reply').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 3200 characters ')
    }
    else{
      this.inboxForm.patchValue({ status: 'reply' })
      this.inboxForm.patchValue({ questionId: this.messageExchangeId })
  
      this.studentService.saveAsDraftLive(this.inboxForm.value).subscribe(data=>{
        if(data['status']==200){
          this.toasterService.success('Sucess',data['message'])
          this.router.navigateByUrl('/advisor-dashboard/advisor-my-message/advisor-draft')
  
        }
        else{
          this.toasterService.error('Error',data['message'])
        }

      },err =>{
        this.toasterService.error('Error' , err.error.message)
      })

    }


  }

  Review(){
  
    $("#reveiw-modal").modal("show");
    
    $("#m-sucsess").modal("hide");
  }
  dashboard(){
    $("#m-sucsess").modal("hide");
        this.router.navigateByUrl('student-module/dashboard/student-my-message/archive')

  }

  // review & Rating

  rating(value){
    this.ratingValue = value
  

  }

  helpFul(value){
    this.helpFulValue = value
    this.average();

  }

  relevance(value){

    this.relevanceValue = value
    this.average();

  }
  clarity(value){

    this.clarityValue = value
    this.average();

  }
  average(){
    this.averagevalue = Math.round(( this.clarityValue + this.relevanceValue + this.helpFulValue)/3)
  }

  reviewSubmit(x){

    if(x){

      this.ReviewForm.patchValue({ questionId: this.messageExchangeId })
      this.ReviewForm.patchValue({ ratings: this.averagevalue })
      this.ReviewForm.patchValue({ helpful: this.helpFulValue })
      this.ReviewForm.patchValue({ relavance: this.relevanceValue })
      this.ReviewForm.patchValue({ clarity: this.clarityValue })
  
      this.studentService.ratingsAndReviews(this.ReviewForm.value).subscribe(data =>{
        if(data['status'] == 200){
          this.toasterService.success('Sucess',data['message'])
          this.ReviewForm.reset();
          this.averagevalue = 0
          this.helpFulValue = 0
          this.relevanceValue = 0
          this.clarityValue = 0
          $("#reveiw-modal").modal("hide");

          this.router.navigateByUrl('student-module/dashboard/student-my-message/inbox')
        }else{
          this.toasterService.error('Error',data['message'])
        }
      },

      err => {
        this.toasterService.error('Error', err.error.error);
      }

      )


    }else{
      this.ReviewForm.reset();
      this.averagevalue = 0
      this.helpFulValue = 0
      this.relevanceValue = 0
      this.clarityValue = 0
    $("#reveiw-modal").modal("hide");


    }

  
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
flagshow(ids:string){
  this.FlagId=ids;
}
disableFlag(){
  this.issueReason.forEach(el=>{
    delete el['status'];
  })
  this.flag=[];
}

flagSubmit(){
  if(!this.flag.length){
    this.toasterService.error(`Please check atleast one Reason`)
    return;
  }
  let payload={
    flagReason:this.flag,
  }
 
  this.studentService.flagIssue(this.FlagId,payload).subscribe(data => {
    this.issueReason.forEach(el=>{
      delete el['status'];
    })
    this.flag=[];
    document.getElementById("openModalButton").click();
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
  // this.router.navigateByUrl(`/advisor-dashboard/advisor-student-profile/${id}`)
  window.open(`/advisor-dashboard/advisor-student-profile/${id}`, "_blank");
}

navigate(data , id){

  if(data.ownerId.role == "Student"){
    // this.router.navigateByUrl(`/advisor-dashboard/advisor-student-profile/${id}`)
    window.open(`/advisor-dashboard/advisor-student-profile/${id}`, "_blank");
    
  }else{
    window.open('/advisor-dashboard/advisor-profile/advisor-biography')
  }
}

}
