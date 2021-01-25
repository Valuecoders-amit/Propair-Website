import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../lib/services/student.service';
import { AuthService } from '../../lib/services/auth.service'
import * as moment from 'moment';

@Component({
  selector: 'app-advisor-draft-view-message',
  templateUrl: './advisor-draft-view-message.component.html',
  styleUrls: ['./advisor-draft-view-message.component.scss']
})
export class AdvisorDraftViewMessageComponent implements OnInit {

  public sub:any;
  public studentId:any
  public tagsData:any;
  public details:any;
  public isDraft:boolean
  public tags:any = []
  public inboxForm: FormGroup;
  public questionId:any;
  public replyId:any;
  public characterValue: any 
  public minlength = 12;
  public availableMinLength: number = -12
  public messageExchangeId: string;
  public messageExchangeThreads: any = [];

  public characterReviewValue: any 
  public minReviewlength = 50;
  public availableReviewMinLength: number = 50
  public userInfo :any;


  public edit = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService:StudentService, 
    private router: Router,
    private toasterService: ToastrService,
    private _fb: FormBuilder,
    private authService : AuthService
  ) { 

    this.inboxForm = this._fb.group({

      reply: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(3200)]],

      status: new FormControl(''),
      questionId: new FormControl(''),
      replyId: new FormControl('')

    });
      this.keyUp();
  }

  ngOnInit() {

    this.userInfo = this.authService.getUserInfo();
    this.sub = this.activatedRoute.params.subscribe((param) => {
      this.studentId = param.id;
      this.messageDetails( this.studentId);
  

      
    })
  }

  
  messageDetails(id){
    
    this.studentService.messageDetailsLive(id).subscribe(data=>{
      this.messageExchangeThreads = data['data']
      this.inboxForm.patchValue({ 
        reply : this.messageExchangeThreads.draftMessage.reply
      })
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

  cancel(){
    this.router.navigateByUrl('/advisor-dashboard/advisor-my-message/advisor-draft')
  }

  // editDraft(){
  //   this.edit = ! this.edit
  //   if(this.edit == true){
  //     this.toasterService.success('Editable')
  //   }
  // }

  draft(){

    if(!this.inboxForm.value.reply){
      return this.toasterService.error('Error',"Please enter your message");
    }

    if(this.inboxForm.get('reply').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 3200 characters')
    }

      this.inboxForm.patchValue({ status: 'reply' })
      this.inboxForm.patchValue({ questionId: this.messageExchangeThreads.draftMessage._id })
      // this.inboxForm.patchValue({ replyId : this.messageExchangeThreads.draftMessage.reply._id})
  
      this.studentService.updateMessageLive(this.inboxForm.value).subscribe(data=>{
        if(data['status']==200){
          this.toasterService.success('Success',data['message'])
          // this.edit = false
          this.router.navigateByUrl(`/advisor-dashboard/advisor-draft-view-message/${this.studentId}`)
  
        }
        else{
          this.toasterService.error('Error',data['message'])
        }

      }, err =>{
          this.toasterService.error('Error',err.error.message)
      })


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

  send(){

    if(!this.inboxForm.value.reply){
      return this.toasterService.error('Error', "Please enter your message");
    }

    if(this.availableMinLength <= 12){
      return this.toasterService.error('Error', 'Atleast 12 characters  are required ')
    }

    if(this.inboxForm.get('reply').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 3200 characters')
    }

    let payload = {
      questionId:this.studentId ,
      reply :this.inboxForm.value.reply,
      replyId : this.messageExchangeThreads.draftMessage._id

    }

  
      this.studentService.sendReplyLiveDraft(payload).subscribe(data=>{
        if(data['status']==200){
          this.toasterService.success('Sucess',data['message'])
          this.router.navigateByUrl('/advisor-dashboard/advisor-my-message/advisor-inbox')
  
        }
        else{
          this.toasterService.error('Error',data['message'])
        }

      }, err =>{
        this.toasterService.error('Error' , err.error.message)
      })

    }
}
