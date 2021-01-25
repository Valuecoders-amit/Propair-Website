import { Component, OnInit, TemplateRef,ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../../lib/services/student.service'
import { AuthService } from '../../../lib/services/auth.service'
declare var $
import * as moment from 'moment';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";




@Component({
  selector: 'app-inbox-view-message',
  templateUrl: './inbox-view-message.component.html',
  styleUrls: ['./inbox-view-message.component.scss']
})
export class InboxViewMessageComponent implements OnInit {

  public inboxForm: FormGroup;
  public ReviewForm: FormGroup;

  public sub: any;
  public messageExchangeId: string;
  public messageExchangeThread: any = [];
  public tags: any;
  public currentRate = 0;

  public reviewArray = ['1','2','3','4','5']

  public ratingValue: any;
  public helpFulValue: any = 0
  public relevanceValue: any = 0
  public clarityValue: any = 0
  public averagevalue: any = 0

  public characterValue: any 
  public minlength = 12;
  public availableMinLength: number = -12


  public characterReviewValue: any 
  public minReviewlength = 50;
  public availableReviewMinLength: number = -50
  public studentProfile : boolean = false;
  public userInfo :any;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;

  @ViewChild('success', { static: false }) success: ElementRef;

  constructor(private _fb: FormBuilder,
    private toasterService: ToastrService,
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService : AuthService,
    private modalService1: BsModalService

  ) {

    this.inboxForm = this._fb.group({

      reply: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(3200)]],

      status: new FormControl(''),
      questionId: new FormControl('')

    });
    this.keyUp();
    // if(this.availableMinLength > 10){

    // }

    this.ReviewForm = this._fb.group({

      reviews: [null, [Validators.required, Validators.minLength(50), Validators.maxLength(1000)]],
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
    if(this.activatedRoute.snapshot.queryParams.student){
      this.studentProfile = true;
    }
  }


  messageDetails(id) {

    this.studentService.messageThreadDetail(id).subscribe(data => {
      this.messageExchangeThread = data['data']

      this.messageExchangeThread.replyThread.forEach(item => {
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
    this.router.navigateByUrl('student-module/dashboard/student-my-message/inbox')
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
        this.availableMinLength = -12 + this.characterValue
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

  
        }
      },
        err =>{
        this.toasterService.error('Error', err.error.message);

        }
      )
    }else{
      $("#send-private").modal("hide");

    }


  }

  closePopup(template: TemplateRef<any>){
    this.modalRef2 = this.modalService1.show(template)

  }

  close(x){
    if(x){

      this.studentService.markMessageComplete(this.messageExchangeId).subscribe(data=>{
        if(data['status'] == 200){
          this.toasterService.success('Success',data['message'])
          this.modalRef2.hide();
          this.modalRef3 = this.modalService1.show(this.success , {backdrop : 'static'})
          // this.router.navigateByUrl('student-module/dashboard/student-my-message/inbox')
        }
        else{
          this.toasterService.error('Error',data['message'])
        }
      },err=>{
        this.toasterService.error('Error',err.error.message )
      })
    }else{
    this.modalRef2.hide();

    }
  }

  cancelClosePopup(){
    this.modalRef2.hide();
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
          this.toasterService.success('Success',data['message'])
          this.router.navigateByUrl('student-module/dashboard/student-my-message/draft')
  
        }
        else{
          this.toasterService.error('Error',data['message'])
        }

      },err =>{
        this.toasterService.error('Error',err.error.message)
      })

    }


  }

  closeSuccessPopup(){

  }

  Review(){
  
    this.modalRef3.hide();
    $("#reveiw-modal").modal("show");
    
  }

  dashboard(){
    this.router.navigateByUrl('student-module/dashboard/student-my-message/archive')
    this.modalRef3.hide();

  }
  // review & Rating

  rating(value) {
    this.ratingValue = value
  }

  helpFul(value) {
    this.helpFulValue = value
    this.average();
  }

  relevance(value) {
    this.relevanceValue = value
    this.average();

  }
  clarity(value) {
    this.clarityValue = value
    this.average();

  }

  average(){
    this.averagevalue = (( this.clarityValue + this.relevanceValue + this.helpFulValue)/3).toFixed(2)
  }

  reviewSubmit(x){
    
    if(this.availableReviewMinLength <= 50){
      return this.toasterService.error('Error', 'Atleast 50 characters  are required ')
    }

    if(this.ReviewForm.get('reviews').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 1000 characters ')
    }

    if(x){

      this.ReviewForm.patchValue({ questionId: this.messageExchangeId })
      this.ReviewForm.patchValue({ ratings: this.averagevalue })
      this.ReviewForm.patchValue({ helpful: this.helpFulValue })
      this.ReviewForm.patchValue({ relavance: this.relevanceValue })
      this.ReviewForm.patchValue({ clarity: this.clarityValue }) 
      this.studentService.ratingsAndReviews(this.ReviewForm.value).subscribe(data =>{
        if(data['status'] == 200){
          this.toasterService.success('Success',data['message'])
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

keyUpCharacter(){

  this.ReviewForm.get('reviews').valueChanges.subscribe(val => {
    // let temp = this.titleForm.value.title
    // if(val.length ){

      this.characterReviewValue = val.length
      if (this.characterReviewValue > 1000) {
        return false
      }
      if (this.characterReviewValue < 50) {
        this.availableReviewMinLength = - 50 + this.characterReviewValue
      } else {
        this.availableReviewMinLength = this.characterReviewValue;
      }

    // }
  });

}

navigate(data , id){

  if(data.ownerId.role == 'advisor'){
    window.open(`/student-module/dashboard/student-advisor-profile/${id}/student-advisor-biography`, "_blank");
    // this.router.navigateByUrl(`/student-module/dashboard/student-advisor-profile/${id}/student-advisor-biography`)
  }else{
    // window.open("/student-module/dashboard/student-profile/student-biography", "_blank");
    window.open(`/student-module/dashboard/student-profile/student-biography` , "_blank")
  }


}


}
