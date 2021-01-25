import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { StudentService } from '../../../../lib/services/student.service'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-message-exchange3',
  templateUrl: './message-exchange3.component.html',
  styleUrls: ['./message-exchange3.component.scss']
})
export class MessageExchange3Component implements OnInit {

  public questionForm: FormGroup;
  public isCancel: boolean;
  public questionData: any;
  public title:any;
  public tag :any;
  public paramsId :any;
  public tagArray=[];
  public draftData: any;
  public isDraft:any;
public isOutBox:any;

  public Tags:any;
  public selecetdValue:any;

  public characterValue: any;
  public minlength = 200;
  public availableMinLength: number = -200

  public checkType : boolean = false;


  constructor(private router: Router,
    private _fb: FormBuilder,
    private studentService: StudentService,
    private toasterService: ToastrService,
    private activatedRoute: ActivatedRoute
    ) {

    this.studentService.tagTab = true
    this.studentService.QuestionTab = true


  }

  ngOnInit() {

    this.checkForMessageType()

    this.activatedRoute.params.subscribe((param) => {
      this.paramsId = param.id;
      if(this.paramsId){
        this.messageDetails(this.paramsId)
      }

    })

    this.localStorageTags();

    this.temp();
    this.questionForm = this._fb.group({

      introduce: [null, [Validators.required]],
      questions: [null, [Validators.required]],
      details: [null, [Validators.required, Validators.minLength(200), Validators.maxLength(3000)]],

    });
    this.keyUp();


    if (this.studentService.getQuestion()) {
      this.questionData = this.studentService.getQuestion()
      if (this.questionData) {
        this.questionForm.patchValue({
          introduce: this.questionData['introduce'],
          questions: this.questionData['questions'],
          details: this.questionData['details'],
        });

      }
    }
  }

  ngOnDestroy() {


    if (!this.isCancel) {
      let temp = JSON.parse(localStorage.getItem('title'))
   
      temp.type = this.selecetdValue
      localStorage.setItem('title',JSON.stringify(temp))
      
      this.studentService.setQusetion(this.questionForm.value)
      


    }

  }

  checkForMessageType(){
    this.studentService.checkForMessageType().subscribe(data =>{
    },err =>{
      this.checkType = true
    })
  }


  messageDetails(id){
    this.studentService.messageDetails(id).subscribe(data =>{
      this.draftData = data['data']
      this.isDraft = data['data'].isDraft
      this.isOutBox = data['data'].isOutBox
      if (this.draftData) {
        this.questionForm.patchValue({
          introduce: this.draftData.introduce,
          questions: this.draftData.questions,
          details: this.draftData.details,
        });
       

      }
    })


  }

  draft(){

    if(this.questionForm.get('details').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 3000 characters in  Background & Details')
    }

    if(this.paramsId && this.isOutBox == false){
      let payload={
        title:this.title.title,
        type:this.title.type,
        tags:this.tagArray ,
        sector: this.tag.sector,
  
        adviceAreas: this.tag.adviceAreas,
        typeJob: this.tag.typeJob ,
        fieldStudy:this.tag.fieldStudy,
        employers:this.tag.employers ,
        college:this.tag.college,
        location:this.tag.location ,
        introduce: this.questionForm.value.introduce,
        questions: this.questionForm.value.questions,
        details: this.questionForm.value.details,
        message:null
      }

      this.studentService.updateMessage(payload,this.paramsId).subscribe(data => {
        if(data['status']== 200){
  
          this.toasterService.success('Success', data['message'])
  
  
          this.router.navigateByUrl('student-module/dashboard/student-message')
        }
        
  
  
      }, err => {
        this.toasterService.error('Error', err.error.message)
      }
      )

    }
    else if(!this.paramsId){
      let payload={
        title:this.title.title,
        type:this.title.type,
        tags:this.tagArray ,
        sector: this.tag.sector,
        
        adviceAreas: this.tag.adviceAreas,
        typeJob: this.tag.typeJob ,
        fieldStudy:this.tag.fieldStudy,
        employers:this.tag.employers ,
        college:this.tag.college,
        location:this.tag.location ,
        introduce: this.questionForm.value.introduce,
        questions: this.questionForm.value.questions,
        details: this.questionForm.value.details,
        message:null
      }
  
      this.studentService.saveAsDraft(payload).subscribe(data => {
        if(data['status']== 200){
  
          this.toasterService.success('Success', data['message'])
          this.router.navigateByUrl('/student-module/dashboard/student-my-message/draft/new')
        }
  
  
      }, err => {
        this.toasterService.error('Error', err.error.message)
      }
      )

    }
    else if(this.paramsId && this.isOutBox == true){

      this.toasterService.error('Error','You Can not save out box message ')
    }
    
  }

  privious() {
    if(this.paramsId){

    this.studentService.QuestionTab = false
      this.router.navigateByUrl('student-module/dashboard/message-exchange/message-exchange2/' +this.paramsId)

    }else{

      this.studentService.QuestionTab = false
      this.router.navigateByUrl('student-module/dashboard/message-exchange/message-exchange2')
    }

  }

  next() {

    if (! this.questionForm.get('introduce').valid) {
      return this.toasterService.error('Error', 'Please Introduce Yourself')
    }

    if (! this.questionForm.get('questions').valid) {
      return this.toasterService.error('Error', 'Please Enter Career Question')
    }

    if (! this.questionForm.get('details').valid) {
      return this.toasterService.error('Error', 'Please Provide Relevant Background & Details')
    }

    if(this.availableMinLength <= 200){
      return this.toasterService.error('Error', 'Atleast 200 chracter  is required in  Background & Details')

    }

    if(this.questionForm.get('details').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 3000 characters in  Background & Details')
    }




    if(this.paramsId){
    this.router.navigateByUrl('student-module/dashboard/message-exchange/message-exchange4/' +this.paramsId)

    }else{


      this.studentService.tempQuestion(this.questionForm.value)
  
      this.router.navigateByUrl('student-module/dashboard/message-exchange/message-exchange4')
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
  

  temp(){

   this.title =  this.studentService.getTitle();
    this.tag = this.studentService.getTag()

    this.tagArray.push(this.tag.tags) 



  }

  localStorageTags(){

    if(this.studentService.getTitle()){

      this.Tags = this.studentService.getTitle()
  
      this.selecetdValue = this.Tags.type
      
    }
  }

  type(value) {
		this.selecetdValue = value;

  }

  keyUp() {

    this.questionForm.get('details').valueChanges.subscribe(val => {
      // let temp = this.titleForm.value.title
      this.characterValue = val.length
      if (this.characterValue > 3000) {
        return false
      }
      if (this.characterValue < 200) {
        this.availableMinLength = - 200 + this.characterValue
      } else {
        this.availableMinLength = this.characterValue;
      }
    });


  }

}
