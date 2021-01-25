import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from "../../lib/services/student.service"
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../lib/services/auth.service'

@Component({
  selector: 'app-advisor-propair-view-message',
  templateUrl: './advisor-propair-view-message.component.html',
  styleUrls: ['./advisor-propair-view-message.component.scss']
})
export class AdvisorPropairViewMessageComponent implements OnInit {

  public inboxForm: FormGroup;
  public ReviewForm: FormGroup;
  public imageQuestionUrl = [];
  public imagereplyUrl = [];
  public imageUrl = [];
  public characterValue: any 
  public minlength = 12;
  public availableMinLength: number = 12;
  public sub: any;
  public messageExchangeId: string;
  public messageExchangeThread: any = [];
  public tags: any;
  public currentRate = 0;
  public studentImage :any;

  public reviewArray = ['1','2','3','4','5'];

  public ratingValue: any;
  public helpFulValue: any;
  public relevanceValue: any;
  public clarityValue: any;
  public userInfo : any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService:StudentService, 
    private router: Router,
    private toasterService: ToastrService,
    private _fb: FormBuilder,
    private authService : AuthService
  ) { 
    this.inboxForm = this._fb.group({ 
      messageId: new FormControl(''),
      reply: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(3199)]],
      file: new FormControl(''),

    });
  }

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo()
    this.activatedRoute.params.subscribe((param) => {
      this.messageExchangeId = param.id;
      this.messageDetails(this.messageExchangeId);

    })
  }

  messageDetails(id) {

    this.studentService.messageThreadDetailPropair(id).subscribe(data => {
      this.messageExchangeThread = data['data']
      this.messageExchangeThread.question.student.forEach(element => {
        this.studentImage = element.image
      });
      if(this.messageExchangeThread.question.file){
        this. imageQuestionUrl = this.messageExchangeThread.question.file

      }
      if(this.messageExchangeThread.replyThread.file){
        this.imagereplyUrl = this.messageExchangeThread.replyThread.file
      }


    })
  }

  cancel(){
    this.router.navigateByUrl('/advisor-dashboard/advisor-my-message/advisor-support');
  }

  keyUp() {

    this.inboxForm.get('reply').valueChanges.subscribe(val => {
      // let temp = this.titleForm.value.title

      if(val.length ){
  
        this.characterValue = val.length
        if (this.characterValue > 3200) {
          return false
        }
        if (this.characterValue < this.minlength) {
          this.availableMinLength = this.minlength - this.characterValue
        } else {
          this.availableMinLength = this.characterValue;
        }
      }
    });
  
  
  }


  send(){

    if(!this.inboxForm.value.reply && !this.inboxForm.value.file){
      return this.toasterService.error('Error','Please write some thing or send image')
    }
    
    this.inboxForm.patchValue({ messageId:  this.messageExchangeId})
    this.inboxForm.patchValue({file : this.imageUrl })
    this.studentService.SendReplyPropairSupport(this.inboxForm.value).subscribe(data=>{
      if(data['status'] == 200){
        this.toasterService.success('Success',data['message'])
        this.messageDetails(this.messageExchangeId)
        this.inboxForm.reset();
        this.imageUrl = [];

      }else{
        this.toasterService.error('Error',data['message'])
      }
    },err =>{
      this.toasterService.error('error',err.error.message)
    }
    )
  }

  imageClick(imageUrl) {
    window.open(imageUrl)
  }


  uploadFile(files: any[]) {
    if (files[0] && files[0].type.includes("image")) {
      const file = files[0];

      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.studentService.fileUpload(formData).subscribe(data => {
        if (data['status'] == 200) {
          this.inboxForm.patchValue({ file: data['data'] })
          let image = data['data'];
          this.imageUrl.push(image)

        }else{
          this.toasterService.error('Error' , "Image can not be greater than 5MB")
        }
      },err=>{
        this.toasterService.error('Error' , err.error.message )
      })


    }

  }


  
  removeImgae(value){

    let payload = {
      image : value
    }
    this.studentService.removeImageUpload(payload).subscribe(data =>{
      if(data['status'] == 200){
        let index = this.imageUrl.findIndex(x => x == value)       
        this.imageUrl.splice(index ,1)
      }else{
        this.toasterService.error("Error" , data["message"])
      }
    },err =>{
      this.toasterService.error('Error' , err.error.message)
    })
  }

  fileImageClick(imageUrl){

    window.open(imageUrl)

  }

}
