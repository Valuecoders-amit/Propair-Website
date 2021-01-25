import { Component, OnInit ,ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StudentService } from '../../../../lib/services/student.service'
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";



@Component({
  selector: 'app-message-exchange1',
  templateUrl: './message-exchange1.component.html',
  styleUrls: ['./message-exchange1.component.scss']
})
export class MessageExchange1Component implements OnInit {

  public data = "";
  public titleForm: FormGroup;
  public title: any
  public selecetdValue: string = 'public';
  public isCancel: boolean;
  public titleData: any;
  public public: any;
  public private: any
  public paramsId: any;
  public draftData: any;
  public typeData: any;
  public isDraft: any;
  public isOutBox: any;
  public Type: any
  public characterValue: any ;
  public minlength = 20;
  public availableMinLength: number = -20
  insufficientModal : BsModalRef;
  public checkType : boolean = false;



  public tagArray = [];
  @ViewChild('insufficientBalance', { static: false }) insufficientBalance: ElementRef;
  


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private studentService: StudentService,
    private toasterService: ToastrService,
    private bsModalService: BsModalService

  ) {


    this.titleForm = this._fb.group({

      title: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],

      type: new FormControl('')
    });
    this.keyUp();
  }

  ngOnInit() {

    this.checkForMessageType();

    this.studentService.tagTab = false
    this.studentService.QuestionTab = false
    this.studentService.ReviewTab = false

    this.activatedRoute.params.subscribe((param) => {
      this.paramsId = param.id;
      if(this.paramsId){
        this.messageDetails(this.paramsId)
      }

    })



    this.localstorageType();


    if (this.studentService.getTitle()) {
      this.titleData = this.studentService.getTitle()
      if (this.titleData) {
        this.titleForm.patchValue({
          title: this.titleData['title'],
          type: this.titleData['type']
        });
      }
    }


  }

  ngAfterViewInit(){
    this.insufficientBalanceChcek();
  }

  checkForMessageType(){
    this.studentService.checkForMessageType().subscribe(data =>{
    },err =>{
      this.checkType = true
    })
  }

  insufficientBalanceChcek(){
    this.studentService.insufficientBalance().subscribe(data =>{
    },err=>{
      this.insufficientModal = this.bsModalService.show(this.insufficientBalance,{backdrop : 'static'})
    })
  }

  navigateSettings(){
    this.router.navigateByUrl('/student-module/dashboard/student-settings/credits')
    this.insufficientModal.hide()
  }

  close(){
    this.router.navigateByUrl('/student-module/dashboard/student-my-message/inbox')
    this.insufficientModal.hide()
  }

  messageDetails(id) {
    this.studentService.messageDetails(id).subscribe(data => {
      this.draftData = data['data']
      this.isOutBox = data['data'].isOutBox

      this.selecetdValue = data['data'].type
      if (this.draftData) {

        this.titleForm.patchValue({
          title: this.draftData.title,
          type: this.draftData.type

        });


      }
    })


  }

  ngOnDestroy() {

    if (!this.isCancel) {
    
      this.studentService.setTitle(this.titleForm.value)

    }
  }

  draft() {


    if(!this.titleForm.value.title){
      return this.toasterService.error( 'Error', "Please enter your title");
    }

    if(this.titleForm.get('title').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 200 characters')
    }

    if (this.paramsId && this.isOutBox == false) {

      if (this.selecetdValue == 'private') {
        this.private = this.selecetdValue
      } else if (this.selecetdValue == 'public') {
        this.public = this.selecetdValue
      }

      let payload = {
        title: this.titleForm.value.title,
        type: this.selecetdValue,
        tags: null,
        sector: null,
        adviceAreas: null,
        typeJob: null,
        fieldStudy: null,
        employers: null,
        college: null,
        location: null,
        introduce: null,
        questions: null,
        details: null,
        message: null,

      }


      this.studentService.updateMessage(payload, this.paramsId).subscribe(data => {
        if (data['status'] == 200) {

          this.toasterService.success('Success', data['message'])


          this.router.navigateByUrl('student-module/dashboard/student-message')
        }
      }, err => {
        this.toasterService.error('Error', err.error.message)
      }
      )
    } else if (!this.paramsId) {
      if (this.selecetdValue == 'private') {
        this.private = this.selecetdValue
      } else if (this.selecetdValue == 'public') {
        this.public = this.selecetdValue
      }

      let payload = {
        title: this.titleForm.value.title,
        type: this.selecetdValue,
        tags: null,
        sector: null,
        adviceAreas: null,
        typeJob: null,
        fieldStudy: null,
        employers: null,
        college: null,
        location: null,
        introduce: null,
        questions: null,
        details: null,
        message: null,

      }

      this.studentService.saveAsDraft(payload).subscribe(data => {
        if (data['status'] == 200) {
          this.toasterService.success('Success', data['message'])
          this.router.navigateByUrl('/student-module/dashboard/student-my-message/draft/new')    
        }

      }, err => {
        this.toasterService.error('Error', err.error.message)
      }
      )
    }
    else if (this.paramsId && this.isOutBox == true) {
      this.toasterService.error('Error', 'You Can not save out box message ')
    }


  }


  next() {

    // this.insufficientModal = this.bsModalService.show(template)

    if(!this.titleForm.value.title){
      return this.toasterService.error("Error" ,"Please enter your title");
    }


    if(this.availableMinLength <= 20){
      return this.toasterService.error('Error', 'Atleast 20 chracter  required in title')
    }

    if(this.titleForm.get('title').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 200 characters')
    }


    if (this.paramsId) {
      this.router.navigateByUrl('/student-module/dashboard/message-exchange/message-exchange2/' + this.paramsId)
    } else {

      if (this.selecetdValue == 'private') {
        this.titleForm.patchValue({ type: 'private' })
      } else if (this.selecetdValue == 'public') {
        this.titleForm.patchValue({ type: 'public' })
      }
      this.title = this.titleForm.value

      this.studentService.tempTile(this.title)
      this.router.navigateByUrl('/student-module/dashboard/message-exchange/message-exchange2')
    }


  }

  cancel() {
    document.getElementById('cancelModal').click();
  }
  cancelSubmit(){
    document.getElementById('closeCancelModal').click();
    this.isCancel = true
    this.studentService.removeData()
    this.studentService.messageTag(null)
    this.router.navigateByUrl('student-module/dashboard/student-my-message/inbox')
    
  }


  type(value) {
    this.selecetdValue = value;

  }

  localstorageType() {

    if (this.studentService.getTitle()) {
      this.Type = this.studentService.getTitle()
      if (this.Type.type) {

        this.selecetdValue = this.Type.type
      } else {
        this.selecetdValue = 'public'
      }

    }
  }

  keyUp() {

    this.titleForm.get('title').valueChanges.subscribe(val => {
      // let temp = this.titleForm.value.title
      this.characterValue = val.length
      if (this.characterValue > 200) {
        return false
      }
      if (this.characterValue < 20) {
        this.availableMinLength = - 20 + this.characterValue
      } else {
        this.availableMinLength = this.characterValue;
      }
    });


  }



}
