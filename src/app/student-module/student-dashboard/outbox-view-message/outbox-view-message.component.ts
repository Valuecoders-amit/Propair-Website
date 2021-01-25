import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from "../../../lib/services/student.service"
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';



@Component({
  selector: 'app-outbox-view-message',
  templateUrl: './outbox-view-message.component.html',
  styleUrls: ['./outbox-view-message.component.scss']
})
export class OutboxViewMessageComponent implements OnInit {

  public sub:any;
  public studentId:any
  public tagsData:any;
  public details:any;
  public isDraft:boolean
  public tags:any = []
  public studentIdArray = []
  public tempTags:any = []
  public sectorTags: any;
  public advice :any;


public selecetdValue:any;


public characterValue: any ; 
public minlength = 200;
public availableMinLength: number = -200


public characterTitleValue: any;
public minTitlelength = 20;
public availableMinTitleLength: number = -20
public checkType : boolean = false;

public messageForm: FormGroup;
public  placeHolder = "Start typing and/or use the drop down menus below to help you"

dropdownSettings :IDropdownSettings= {
  singleSelection: false,
  idField: '_id',
  textField: 'name',
  enableCheckAll : false,
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 3,
  allowSearchFilter: false
};

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService:StudentService, 
    private router: Router,
    private toasterService: ToastrService,
    private _fb: FormBuilder)
     {

      this.messageForm = this._fb.group({

        title: ['' , [Validators.required ,Validators.minLength(20), Validators.maxLength(200)]],

        message: ['' , [Validators.required ,Validators.minLength(200), Validators.maxLength(3000)]],
        tags: [null, [Validators.required]],
        sector: [null, [Validators.required]],

        adviceAreas: [null, [Validators.required]],
  
      });
      this.keyUp();
      this. keyTitleUp();

 
      }

  ngOnInit() {

    this.checkForMessageType();
    this.sub = this.activatedRoute.params.subscribe((param) => {
      this.studentId = param.id;
      this.adviceList();
      this.SectorData();
      this.messageDetails( this.studentId);
      
    })

  }

  checkForMessageType(){
    this.studentService.checkForMessageType().subscribe(data =>{
    },err =>{
      this.checkType = true
    })
  }

  messageDetails(id){
    
    this.studentService.messageDetails(id).subscribe(data=>{
      this.details = data['data']
      this.selecetdValue = this.details.type

      if(this.details){
        this.messageForm.patchValue({
          title: this.details['title'],
          message: this.details['message'],
          sector:this.details['sector'],
          adviceAreas:this.details['adviceAreas']
  
        });
        
      }
      this.tempTags = this.details.tags
      if(data['data'].tags){
        this.tags = data['data'].tags;

      }

      if(this.tempTags.length){
        this.placeHolder = ""
      }else{
        this.placeHolder = "Start typing and/or use the drop down menus below to help you"
      }

      
      // this.tags.forEach(element => {
      //   this.tagsData = element  
      // });
      
      
    })
  }


  enter(){

    this.placeHolder = ""
    this.tempTags.push(this.messageForm.value.tags)
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

    
    let tempTagsValue = this.tempTags
    
    let index = this.tempTags.findIndex(tag =>  tag == item.name)

    this.tempTags.splice(index, 1);

    if(!this.tempTags.length){
      this.placeHolder = "Start typing and/or use the drop down menus below to help you"
    }



  }
  
  
  onItemDeSelectAdviseArea(item:any){

    
    let tempTagsValue = this.tempTags

    let index = this.tempTags.findIndex(tag =>  tag == item.name)

    this.tempTags.splice(index, 1);

    if(!this.tempTags.length){
      this.placeHolder = "Start typing and/or use the drop down menus below to help you"
    }
    

  }




  navigate(){
	  this.router.navigateByUrl('student-module/dashboard/student-my-message/outbox')
	  
  }

  edit(){
    this.router.navigateByUrl('/student-module/dashboard/message-exchange/message-exchange1/'+ this.studentId )

  }

  // send(){

  // }

  // sendNow() {

  //   this.studentService.sendNow().subscribe(data => {
  //     if (data['status'] == 200) {
  //       this.toasterService.success('success', data['message']);
  //     } else {
  //       this.toasterService.error('error', data['message']);
  //     }

  //   },
  //   err=>{
  //     this.toasterService.error('error',err.error.message);
  //   })

  // }


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

  type(value) {
		this.selecetdValue = value;

  }

  // delete(tag,i){
  //   this.details.tags.splice(i,1);
  //     }

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
  
  
  
      }
          this.details.tags.splice(i,1);
          if(!this.tempTags.length){
            this.placeHolder = "Start typing and/or use the drop down menus below to help you"
          }
  
  
    }

      back(){
        this.router.navigateByUrl('student-module/dashboard/student-my-message/outbox')
      }


      send(){

        if(!this.messageForm.value.title){
          return this.toasterService.error('Error',"Please enter your title");
        }
        if(!this.messageForm.value.message){
          return this.toasterService.error('Error',"Please enter your message");
        }

        if(this.availableMinTitleLength <= 20){
          return this.toasterService.error('Error', 'Atleast 20 chracters are  required in title')  
        }

        if(this.availableMinLength <= 200){
          return this.toasterService.error('Error', 'Atleast 200 chracters are required in message')
    
        }

        if(this.tempTags.length <= 2){
          return this.toasterService.error('Error', 'Alteast 3 tags are required')
        }

        if(this.tempTags.length > 10){
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

        let payload ={
          title : this.messageForm.value.title,
          details : this.messageForm.value.message,
          sector:this.messageForm.value.sector,
          adviceAreas:this.messageForm.value.adviceAreas,
          type:this.selecetdValue,
          tags:this.tempTags,
          _id:this.studentId
        }
    
        this.studentService.sendUpdatedOutBox(payload).subscribe(data=>{
          if(data['status'] == 200){
            this.toasterService.success('Success', data['message'])
            this.router.navigateByUrl('student-module/dashboard/student-my-message/outbox')
          }else{
            this.toasterService.error('Error', data['message'])
    
          }
        })
      }

      update(){

        if(!this.messageForm.value.title){
          return this.toasterService.error('Error',"Please enter your title");
        }
        if(!this.messageForm.value.message){
          return this.toasterService.error('Error',"Please enter your message");
        }

        if(this.availableMinTitleLength <= 20){
          return this.toasterService.error('Error', 'Atleast 20 chracters are  required in title')  
        }

        if(this.availableMinLength <= 200){
          return this.toasterService.error('Error', 'Atleast 200 chracters are required in message')
    
        }

        if(this.tempTags.length <= 2){
          return this.toasterService.error('Error', 'Alteast 3 tags are required')
        }

        if(this.tempTags.length > 10){
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
        
        let payload ={

          title : this.messageForm.value.title,
          details : this.messageForm.value.message,
          type:this.selecetdValue,
          tags:this.tempTags,
          sector:this.messageForm.value.sector,
          adviceAreas:this.messageForm.value.adviceAreas

        }

        this.studentService.updateMessage(payload,this.studentId).subscribe(data =>{
          if(data['status'] == 200){
            
          this.toasterService.success('Sucess', data['message'])
    
            this.router.navigateByUrl('student-module/dashboard/student-my-message/outbox')
          }else{
          this.toasterService.error('Error', data['message'])
          }
        },
         err => {
          this.toasterService.error('Error', err.error.message)
    
        })
      }
}
