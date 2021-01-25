import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StudentService } from '../../../../lib/services/student.service'
import { cloneWithOffset } from 'ngx-bootstrap/chronos/units/offset';
import { ITag } from 'src/app/lib/interfaces/Itag';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner"; 
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";


@Component({
  selector: 'app-message-exchange4',
  templateUrl: './message-exchange4.component.html',
  styleUrls: ['./message-exchange4.component.scss']
})
export class MessageExchange4Component implements OnInit {
// alldata = [this.studentService.title,this.studentService.tag,this.studentService.question];

public messageForm: FormGroup;
public title:any;
public messageData:any;
public type:any;
public public = false;
public private = false;
public typeTemp : any;
public localstorageTitle:any;
public paramsId :any;
public draftData: any;
public isDraft:any;
public isOutBox:any;
public sectorTags: any;
public advice :any;
modalRef2: BsModalRef;
modalRef3: BsModalRef;
public selecetdValue:any;
public characterValue: any ;
public minlength = 200;
public availableMinLength: number = -200
public characterTitleValue: any;
public minTitlelength = 20;
public availableMinTitleLength: number = -20
public checkType : boolean = false;
public  placeHolder = "Start typing and/or use the drop down menus below to help you"
public detailsValue:any;
public isCancel: boolean;
public toArray:any;
public Title:any;
public Tags:any;
public Question:any; 
public memberShip : any;
public titleValue:any;
public orderId : any;
public messageCost : any;
public tag:ITag;
public question: FormGroup;
dropdownSettings :IDropdownSettings= {
  singleSelection: false,
  idField: '_id',
  textField: 'name',
  enableCheckAll : false,
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 3,
  allowSearchFilter: false
};


  constructor(private router:Router,
    private _fb: FormBuilder,
    private studentService:StudentService,
    private toasterService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    private modalService1: BsModalService
    )
    
    {
    this.studentService.tagTab = true
    this.studentService.QuestionTab = true
    this.studentService.ReviewTab = true


      this.messageForm = this._fb.group({
        title: ['' , [Validators.required ,Validators.minLength(20), Validators.maxLength(200)]],
        message: ['' , [Validators.required ,Validators.minLength(200), Validators.maxLength(3000)]],
        tags: new FormControl(''),
        sector: [null, [Validators.required]],

        adviceAreas: [null, [Validators.required]],


      });
 
      this.keyUp();
      this. keyTitleUp();
     }

  ngOnInit() {

    this.checkForMessageType();

    this.activatedRoute.params.subscribe((param) => {
      this.paramsId = param.id;
      if(this.paramsId){

        this.messageDetails(this.paramsId)
      }

    })

  this.allData();

  this.temp();
  
  this.tags();

  this.adviceList();

  this.SectorData();

  
  if(this.studentService.getMessage()){
    this.messageData = this.studentService.getMessage()
    if (this.messageData) {
      this.messageForm.patchValue({

        message: this.messageData['message'],

      });
    }
}

  } 

  ngOnDestroy() {
    
        
    
    
    if (!this.isCancel) {
      let temp = JSON.parse(localStorage.getItem('title'))
      temp.type = this.selecetdValue
      localStorage.setItem('title',JSON.stringify(temp))

      this.studentService.setMessage(this.messageForm.value)
      
			
    }
    
  }

  memeberShipData(){
    this.studentService.creditGenral().subscribe(data=>{
      this.memberShip = data['data']

      this.studentService.membershipPriseCount(this.memberShip)
    })
  }

  checkForMessageType(){
    this.studentService.checkForMessageType().subscribe(data =>{
    },err =>{
      this.checkType = true
    })
  }

  onSectorSelect(item: any) {



    this.messageForm.patchValue({
      tags: item.name,
    })
    this.enter()



  }


  onAdviseAresSelect(item: any){

    this.messageForm.patchValue({
      tags: item.name,
    })
    this.enter()


  }

  onItemDeSelectSector(item:any){


    
    let tempTagsValue = this.toArray

    let index = this.toArray.findIndex(tag =>  tag == item.name)

    this.toArray.splice(index, 1);

    if(!this.toArray.length){
      this.placeHolder = "Start typing and/or use the drop down menus below to help you"
    }
    



  }

  onItemDeSelectAdviseArea(item:any){

    
    let tempTagsValue = this.toArray

    let index = this.toArray.findIndex(tag =>  tag == item.name)

    this.toArray.splice(index, 1);

    if(!this.toArray.length){
      this.placeHolder = "Start typing and/or use the drop down menus below to help you"
    }
    

  }
  

  
  messageDetails(id){
    this.studentService.messageDetails(id).subscribe(data =>{
      this.draftData = data['data']

      this.titleValue = data['data'].title
      this.isDraft = data['data'].isDraft
      this.isOutBox = data['data'].isOutBox

      if (this.draftData) {
        this.messageForm.patchValue({
  
          message: this.draftData['message'],
  
        });
      }
    })


  }


  allData(){


    this.typeTemp = this.studentService.getTitle()
    if(this.typeTemp['type'] == 'public'){
      this.public = true
      this. private = false
    }
    else{
      this.private = true
      this.public = false
    }


    
    this.title = this.studentService.title  

    this.localstorageTitle = this.studentService.getTitle()

    if(this.localstorageTitle.title){
      this.titleValue = this.localstorageTitle.title
    }

    
    this.tag = this.studentService.getTag()
    this.question = this.studentService.question
  

  }

  // enter(){

  //   this.tempTags.push(this.tagForm.value.tags)
  //   this.studentService.messageTag(this.tempTags);

  //   this.tagForm.patchValue({
  //     tags: '',
  //   })


  // }

  draft(){
  
    if(!this.messageForm.value.title){
      return this.toasterService.error('Error',"Please enter your title");
    }
    if(!this.messageForm.value.message){
      return this.toasterService.error('Error',"Please enter your message");
    }

    if(this.messageForm.get('title').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 200 characters in title')
    }

    if(this.messageForm.get('message').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 3000 characters in message')
    }
    
    if(this.paramsId && this.isOutBox == false){
      this.isCancel = true
      let payload = {
        title: this.Title['title'],
        type:this.Title['type'],
  
        tags: this.Tags['tags'],
  
        sector: this.tag['sector'],
        
        adviceAreas: this.tag['adviceAreas'],
        typeJob:this.tag['typeJob'],
        fieldStudy: this.tag['fieldStudy'],
        employers: this.tag['employers'],
        college: this.tag['college'],
        location: this.tag['location'],
        introduce: this.Question['introduce'] ,
        questions: this.Question['questions'],
        details:this.Question['details'],
        message: this.messageForm.value.message,
        
      }
      
  
      this.studentService.updateMessage(payload,this.paramsId).subscribe(data => {
        if(data['status']== 200){
  
          this.toasterService.success('Success', data['message'])
  
  
          this.router.navigateByUrl('/student-module/dashboard/student-my-message/draft/new')
        }
  
  
      }, err => {
        this.toasterService.error('error', err.error.message)
      }
      )

    }else if(!this.paramsId) {
      this.isCancel = true

      let payload = {

        title: this.messageForm.value.title,
        type:this.Title['type'],
  
        tags: this.toArray,
        sector: this.messageForm.value.sector,
        
        adviceAreas: this.messageForm.value.adviceAreas,
        typeJob:this.tag['typeJob'],
        fieldStudy: this.tag['fieldStudy'],
        employers: this.tag['employers'],
        college: this.tag['college'],
        location: this.tag['location'],
        introduce: this.Question['introduce'] ,
        questions: this.Question['questions'],
        details:this.Question['details'],
        message: this.messageForm.value.message,
        
      }
      
  
      this.studentService.saveAsDraft(payload).subscribe(data => {
        if(data['status']== 200){
  
          this.toasterService.success('Success', data['message'])
          this.router.navigateByUrl('/student-module/dashboard/student-my-message/draft/new')
          this.studentService.removeData();
        }
  
  
      }, err => {
        this.toasterService.error('error', err.error.message)
      }
      )

    }

    else if(this.paramsId && this.isOutBox == true){

      this.toasterService.error('Error','You Can not save out box message ')
    }


  }

  send(template: TemplateRef<any>){

    if(!this.messageForm.value.title){
      return this.toasterService.error('Error',"Please enter your title");
    }
    if(!this.messageForm.value.message){
      return this.toasterService.error('Error',"Please enter your message");
    }


    if(this.availableMinTitleLength <= this.minTitlelength){
      return this.toasterService.error('Error', 'Atleast 20 chracters are  required in title')

    }

    if(this.availableMinLength <= this.minlength){
      return this.toasterService.error('Error', 'Atleast 200 chracters are required in message')
    }

    if(this.toArray.length <= 2){
      return this.toasterService.error('Error', 'Alteast 3 tags are required')
    }

    if(this.toArray.length >= 10){
      return this.toasterService.error('Error', 'Tags can not be more than 10')
    }

    if (! this.messageForm.get('sector').valid) {
      return this.toasterService.error('Error', 'Sectors is required')
    }

    if (! this.messageForm.get('adviceAreas').valid) {
      return this.toasterService.error('Error', 'Advice Areas is required')
    }

    if(this.messageForm.get('title').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 200 characters in title')
    }

    if(this.messageForm.get('message').status == 'INVALID'){
      return this.toasterService.error('Error', 'Please do not exceed 3000 characters in message')
    }

    
    // document.getElementById('openType').click();
    this.modalRef3 = this.modalService1.show(template)
  }

  closeSendMessagePop(){
    this.modalRef3.hide();
  }
 
  submit(template: TemplateRef<any>){ 
    // this.SpinnerService.show();
    
    if(this.paramsId && this.isDraft == false){

      this.isCancel = true
      let payload = {
        title: this.Title['title'],
        type:this.Title['type'],
  
        tags: this.Tags['tags'],
  
        sector: this.tag['sector'],
        
        adviceAreas: this.tag['adviceAreas'],
        typeJob:this.tag['typeJob'],
        fieldStudy: this.tag['fieldStudy'],
        employers: this.tag['employers'],
        college: this.tag['college'],
        location: this.tag['location'],
        introduce: this.Question['introduce'] ,
        questions: this.Question['questions'],
        details:this.Question['details'],
        message: this.messageForm.value.message,
        
      }
      

      this.SpinnerService.show();
      this.studentService.updateMessage(payload,this.paramsId).subscribe(data =>{
        if(data['status'] == 200){
          
          this.studentService.messageTag(null)
        this.toasterService.success('Success', data['message'])
  
          this.router.navigateByUrl('student-module/dashboard/student-message')
        }else{
        this.toasterService.error('Error', data['message'])
        }
      },
       err => {
        this.toasterService.error('Error', err.error.message)
  
      })
  
      this.studentService.removeData();
    }
    else if(this.paramsId && this.isDraft == true){
      this.isCancel = true
      let payload = {
        title: this.Title['title'],
        type:this.Title['type'],
  
        tags: this.Tags['tags'],
  
        sector: this.tag['sector'],
        
        adviceAreas: this.tag['adviceAreas'],
        typeJob:this.tag['typeJob'],
        fieldStudy: this.tag['fieldStudy'],
        employers: this.tag['employers'],
        college: this.tag['college'],
        location: this.tag['location'],
        introduce: this.Question['introduce'] ,
        questions: this.Question['questions'],
        details:this.Question['details'],
        message: this.messageForm.value.message,
        
      }
      
      
      this.studentService.newExchange(payload).subscribe(data =>{
        if(data['status'] == 200){
          this.studentService.messageTag(null)
        this.toasterService.success('Success', data['message'])
  
          this.router.navigateByUrl('student-module/dashboard/student-message')
        }else{
        this.toasterService.error('Error', data['message'])
  
        }
      },
       err => {
        this.toasterService.error('Error', err.error.message)
  
      })
  
      this.studentService.removeData();
    }

    else if( !this.paramsId){

  

      let payload = {
        title: this.messageForm.value.title,
        type:this.Title['type'],
        tags: this.toArray,
        sector: this.messageForm.value.sector,
        adviceAreas: this.messageForm.value.adviceAreas,
        typeJob:this.tag['typeJob'],
        fieldStudy: this.tag['fieldStudy'],
        employers: this.tag['employers'],
        college: this.tag['college'],
        location: this.tag['location'],
        introduce: this.Question['introduce'] ,
        questions: this.Question['questions'],
        details:this.Question['details'],
        message: this.messageForm.value.message,
        
      }
      
      
      this.studentService.newExchange(payload).subscribe(data =>{
        
        if(data['status'] == 200){
         this.isCancel = true
         this.orderId = data['data'].orderId
         this.messageCost = data['data']['messageCost']
          this.modalRef3.hide(); 
          this.studentService.messageTag(null)
          this.studentService.removeData();
          this.memeberShipData()
          this.modalRef2 = this.modalService1.show(template , {backdrop : 'static'});

        }else{
        this.toasterService.error('Error', data['message'])
        }
        this.SpinnerService.hide()

      },
       err => {
        this.SpinnerService.hide();
        this.toasterService.error('Error', err.error.message)
  
      })
      

    }
  }


  navigateSuccess(){
    this.SpinnerService.show()
    this.modalRef2.hide();
    this.router.navigateByUrl('student-module/dashboard/student-my-message/outbox')
    this.SpinnerService.hide()
  }

  navigateSettings(){
    this.router.navigateByUrl('/student-module/dashboard/student-settings/credits')
  }


  privious(){

    if(this.paramsId){
    this.studentService.ReviewTab = false
      this.router.navigateByUrl('student-module/dashboard/message-exchange/message-exchange3/' +this.paramsId )
    }else{

      this.studentService.ReviewTab = false
      this.router.navigateByUrl('student-module/dashboard/message-exchange/message-exchange3')
    }

  }


  tags(){
    this.toArray = this.Tags.tags

    if(this.toArray.length){
      this.placeHolder = ""
    }else{
      this.placeHolder = "Start typing and/or use the drop down menus below to help you"
    }

  }

  
  enter(){

    this.placeHolder = ""
    this.toArray.push(this.messageForm.value.tags)
    this.studentService.messageTag(this.toArray);
    this.messageForm.patchValue({
      tags: '',
    })


  }


  adviceList() {
		this.studentService.adviceList().subscribe(data => {
      this.advice = data['data']

		})
  }

  SectorData() {
		this.studentService.sector().subscribe(data => {
      this.sectorTags = data['data']

		})
  }

  deleteData(tag, i) {
 

      let tempAdviseAreaTags = this.messageForm.value.adviceAreas

      if(tempAdviseAreaTags){
        let index = tempAdviseAreaTags.findIndex(item =>  item.name == tag)
    
        if(index > -1){
          tempAdviseAreaTags.splice(index,1)
          this.messageForm.patchValue({
    
            adviceAreas:tempAdviseAreaTags
    
          })
    
        }
 
        let tempAdviseAreaValue = JSON.parse(localStorage.getItem('tag'))

        tempAdviseAreaValue.adviceAreas = this.messageForm.value.adviceAreas
        localStorage.setItem('tag',JSON.stringify(tempAdviseAreaValue))

      }
  



    let tempSectorTags = this.messageForm.value.sector

    if(tempSectorTags){
      let indexSector = tempSectorTags.findIndex(item => item.name == tag)
  
      if(indexSector > -1){
        tempSectorTags.splice(indexSector,1)
        this.messageForm.patchValue({
  
          sector:tempSectorTags
  
        })
  
      }


      let tempSectorValue = JSON.parse(localStorage.getItem('tag'))

      tempSectorValue.sector = this.messageForm.value.sector
      localStorage.setItem('tag',JSON.stringify(tempSectorValue))

    }


    let deleteTag = this.Tags.tags.splice(i,1);

    let tempDeleteTag = JSON.parse(localStorage.getItem('tag'))

    tempDeleteTag.tags = this.Tags.tags

    localStorage.setItem('tag',JSON.stringify(tempDeleteTag))

    if(!this.toArray.length){
      this.placeHolder = "Start typing and/or use the drop down menus below to help you"
    }

  }


  // delete(tag,i){
    

  //   let deleteTag = this.Tags.tags.splice(i,1);

  //   let tempDeleteTag = JSON.parse(localStorage.getItem('tag'))

  //   tempDeleteTag.tags = this.Tags.tags

  //   localStorage.setItem('tag',JSON.stringify(tempDeleteTag))

	// }

  cancel(){
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
  this.Title = this.studentService.getTitle()
  if(this.Title){
    this.messageForm.patchValue({
      title:this.Title.title
    })
  }
  if(this.Title.type){
    this.selecetdValue = this.Title.type

  }
  this.Tags = this.studentService.getTag()
  if(this.Tags){
    this.messageForm.patchValue({
      sector:this.Tags.sector,
      adviceAreas:this.Tags.adviceAreas
    })

  }
  this.Question = this.studentService.getQuestion();
  this.detailsValue = this.Question.details
  if (this.detailsValue) {
    this.messageForm.patchValue({
      message: this.detailsValue,

    });
  }


  }


  types(value) {
    this.selecetdValue = value;

    this.Title.type = this.selecetdValue
    let temp = JSON.parse(localStorage.getItem('title'))
    temp.type = this.selecetdValue
    localStorage.setItem('title',JSON.stringify(temp))
    
    if(this.selecetdValue == 'public'){
      this.public = true
      this. private = false
    }
    else{
      this.private = true
      this.public = false
    }

  }

  keyUp() {

    this.messageForm.get('message').valueChanges.subscribe(val => {
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

  keyTitleUp() {

    this.messageForm.get('title').valueChanges.subscribe(val => {
      // let temp = this.titleForm.value.title
      this.characterTitleValue = val.length
      if (this.characterTitleValue > 200) {
        return false
      }
      if (this.characterTitleValue < 20) {
        this.availableMinTitleLength = - 20 + this.characterTitleValue
      } else {
        this.availableMinTitleLength = this.characterTitleValue;
      }
    });


  }

  



}
