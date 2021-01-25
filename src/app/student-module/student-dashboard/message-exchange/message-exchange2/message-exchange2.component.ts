import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../../../lib/services/student.service'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Item } from 'angular2-multiselect-dropdown';

@Component({
  selector: 'app-message-exchange2',
  templateUrl: './message-exchange2.component.html',
  styleUrls: ['./message-exchange2.component.scss']
})
export class MessageExchange2Component implements OnInit {

  public tagForm: FormGroup;
  public tagData: any;
  public isCancel: boolean = false;
  public formData: any;
  public toArray : any = [];
  public title :any
  public sectorTags: any;
  public advice :any;
  public jobData :any;
  public question: any;
  public paramsId :any;
  public draftData: any;
  public adviseValue=[]
  public sectorValue=[]

  public isDraft:any;
  public isOutBox:any;
  public tempSectorArray:any=[];
  public tempSectorNameArray:any=[];

  public Tags:any;
  public sectorId:any;
  public AdviseId:any;

  public sectorChangeValue:any;
  public AdviseAreaChangeValue:any;


  
  public selecetdValue:any;
  public tempArray = []

  public sectorName:any;
  public adviseAreaName:any;
  public checkType : boolean = false;



  public tempTags:any = []
  public tagArray = [];
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
    private router: Router,
    private _fb: FormBuilder,
    private studentService: StudentService,
    private toasterService: ToastrService,
    private activatedRoute: ActivatedRoute,

  ) {

    this.studentService.tagTab = true
    this.tagForm = this._fb.group({

      tags: [null, [Validators.required]],
      sector: [null, [Validators.required]],

      adviceAreas: [null, [Validators.required]],
      typeJob: [null],
      fieldStudy: [null],
      employers: [null],
      college: [null],
      location: [null],


    });




  }

  ngOnInit() {


    this.temp();
    this.tags();
    this.adviceList();
    this.jobList();
    this.localStorageTags();
    this.checkForMessageType();


    this.activatedRoute.params.subscribe((param) => {
      this.paramsId = param.id;
      if(this.paramsId){

        this.messageDetails(this.paramsId)
      }

    })


    if (this.studentService.getTag()) {
      this.tagData = this.studentService.getTag()

      if (this.tagData) {
        this.tagForm.patchValue({
          // tags: this.tagData['tags'],
          sector: this.tagData['sector'],

          adviceAreas: this.tagData['adviceAreas'],
          typeJob: this.tagData['typeJob'],
          fieldStudy: this.tagData['fieldStudy'],
          employers: this.tagData['employers'],
          college: this.tagData['college'],
          location: this.tagData['location'],
        });

        // this.enter();
        this.tempTags = this.tagData['tags']

        

      }
    }

    if(this.tempTags.length){
      this.placeHolder = ""
    }else{
      this.placeHolder = "Start typing and/or use the drop down menus below to help you"
    }
  }

  ngOnDestroy() {
    if (!this.isCancel) {

      let temp = JSON.parse(localStorage.getItem('title'))
      temp.type = this.selecetdValue
      localStorage.setItem('title',JSON.stringify(temp))

      this.tagForm.patchValue({ tags : this.tempTags})

      this.studentService.setTag(this.tagForm.value)

    }

  }

  checkForMessageType(){
    this.studentService.checkForMessageType().subscribe(data =>{
    },err =>{
      this.checkType = true
    })
  }

  onSectorSelect(item: any) {

    this.tagForm.patchValue({
      tags: item.name,
    })
    this.enter()



  }


  onAdviseAresSelect(item: any){

    this.tagForm.patchValue({
      tags: item.name,
    })
    this.enter()


  }


  onSelectAllSectors(items: any) {

    items.forEach(element => {
      let name = element.name
      this.tagForm.patchValue({
        tags: name,
      })
      
      this.enter()
    });

  }

  onSelectAllAdviseArea(items: any) {
    items.forEach(element => {
      let name = element.name
      this.tagForm.patchValue({
        tags: name,
      })
      
      this.enter()
    });
    
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
  
  change(){
    this.tagForm.value.tags

   
  }
  messageDetails(id){
    this.studentService.messageDetails(id).subscribe(data =>{
      this.draftData = data['data']
      this.isDraft = data['data'].isDraft
      this.isOutBox = data['data'].isOutBox

      if (this.draftData) {
        this.tagForm.patchValue({
          tags: this.draftData.tags,
          sector: this.draftData.sector,

          adviceAreas: this.draftData.adviceAreas,
          typeJob: this.draftData.typeJob,
          fieldStudy: this.draftData.fieldStudy,
          employers: this.draftData.employers,
          college: this.draftData.college,
          location: this.draftData.location,
        });

        this.enter();
      }
    })


  }

  enter(){

    this.placeHolder = ""
    this.tempTags.push(this.tagForm.value.tags)
    this.studentService.messageTag(this.tempTags);

    this.tagForm.patchValue({
      tags: '',
    })


  }

  focusOutFunction(data) {
    
  if(this.tagForm.value.tags && typeof this.tagForm.value.tags == "string"){
    this.formData = this.tagForm.value.tags
    this.toArray = this.tagForm.value.tags.split(",");
    this.studentService.messageTag(this.toArray);
    if(this.toArray.length >= 3 && this.toArray.length <= 10){
      this.tempTags = this.toArray

    }else{
      this.toasterService.error('Error',' Tags value can not be less than  3 or greater then 10')
    }
  }else{
    this.tempTags =  this.tagForm.value.tags
    this.studentService.messageTag(this.tempTags);

  }
  


  }


  delete(tag, i) {
 

      let tempAdviseAreaTags = this.tagForm.value.adviceAreas

      if(tempAdviseAreaTags){
        let index = tempAdviseAreaTags.findIndex(item =>  item.name == tag)
    
        if(index > -1){
          tempAdviseAreaTags.splice(index,1)
          this.tagForm.patchValue({
    
            adviceAreas:tempAdviseAreaTags
    
          })
    
        }

      }
  



    let tempSectorTags = this.tagForm.value.sector

    if(tempSectorTags){
      let indexSector = tempSectorTags.findIndex(item => item.name == tag)
  
      if(indexSector > -1){
        tempSectorTags.splice(indexSector,1)
        this.tagForm.patchValue({
  
          sector:tempSectorTags
  
        })
  
      }

    }


    this.tempTags.splice(i, 1);

    if(!this.tempTags.length){
      this.placeHolder = "Start typing and/or use the drop down menus below to help you"
    }

    
 

    // this.tagForm.patchValue({ 'tags': this.toArray.join(',') });
    // this.focusOutFunction({});


  }



  privious() {
    if(this.paramsId){

      this.studentService.tagTab = false
      this.router.navigateByUrl('/student-module/dashboard/message-exchange/message-exchange1/' + this.paramsId)

    }else{

      this.studentService.tagTab = false
      this.router.navigateByUrl('/student-module/dashboard/message-exchange/message-exchange1')
    }

  }

  next() {

    if(this.tempTags.length <= 2){
      return this.toasterService.error('Error', 'Alteast 3 tags are required')
    }
    
    if(this.tempTags.length > 10){
      return this.toasterService.error('Error', 'Tags can not be more than 10')
    }

    if (! this.tagForm.get('sector').valid) {
      return this.toasterService.error('Error', 'Sectors is required')
    }

    if (! this.tagForm.get('adviceAreas').valid) {
      return this.toasterService.error('Error', 'Advice Areas is required')
    }


    if(this.paramsId){
      this.router.navigateByUrl('/student-module/dashboard/message-exchange/message-exchange3/' + this.paramsId)
    }else{

      this.studentService.tempTag(this.tagForm.value)
      this.router.navigateByUrl('/student-module/dashboard/message-exchange/message-exchange3')
    }

  }

  cancel() {
    document.getElementById('cancelModal').click();
  }
  
  cancelSubmit(){
    document.getElementById('closeCancelModal').click();
    this.isCancel = true
    localStorage.removeItem('title')
    this.studentService.removeData()
    this.studentService.messageTag(null)
    this.router.navigateByUrl('student-module/dashboard/student-my-message/inbox')

  }

  draft(){

    // if(this.tempTags.length <= 2){
    //   return this.toasterService.error('error', 'Alteast 3 tags are required')
    // }
    
    // if(this.tempTags.length > 10){
    //   return this.toasterService.error('error', 'Tags can not be more than 10')
    // }

    // if (! this.tagForm.get('sector').valid) {
    //   return this.toasterService.error('error', 'Sectors is required')
    // }

    // if (! this.tagForm.get('adviceAreas').valid) {
    //   return this.toasterService.error('error', 'Advice Areas is required')
    // }

    if(this.paramsId && this.isOutBox == false){

      let payload={
        title:this.title.title,
        type:this.title.type,
        tags: this.toArray,
        sector: this.tagForm.value.sector,
  
        adviceAreas: this.tagForm.value.adviceAreas,
        typeJob: this.tagForm.value.typeJob ,
        fieldStudy:this.tagForm.value.fieldStudy ,
        employers:this.tagForm.value.employers ,
        college:this.tagForm.value.college,
        location:this.tagForm.value.location ,
        introduce: null,
        questions: null,
        details: null,
        message:null
      }

  
      this.studentService.updateMessage(payload,this.paramsId).subscribe(data => {
        if(data['status']== 200){
  
          this.toasterService.success('Success', data['message'])
  
  
          this.router.navigateByUrl('student-module/dashboard/student-message')
        }
        
  
  
      }, err => {
        this.toasterService.error('error', err.error.message)
      }
      )
    }else if(!this.paramsId){

      let payload={
        title:this.title.title,
        type:this.title.type,
        tags: this.toArray,
        sector: this.tagForm.value.sector,
        
        adviceAreas: this.tagForm.value.adviceAreas,
        typeJob: this.tagForm.value.typeJob ,
        fieldStudy:this.tagForm.value.fieldStudy ,
        employers:this.tagForm.value.employers ,
        college:this.tagForm.value.college,
        location:this.tagForm.value.location ,
        introduce: null,
        questions: null,
        details: null,
        message:null
      }
  
      this.studentService.saveAsDraft(payload).subscribe(data => {
        if(data['status']== 200){
  
          this.toasterService.success('Success', data['message'])
          this.router.navigateByUrl('/student-module/dashboard/student-my-message/draft/new')
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

  temp(){
    this.title = this.studentService.getTitle()

    
  }
  tags() {
		this.studentService.sector().subscribe(data => {

      this.sectorTags = data['data']
      

      this.sectorTags.forEach(element => {

        this.tempSectorArray .push(element._id)
        this.tempSectorNameArray.push(element.name)
        
      });
      


		})
  }
  
  adviceList() {
		this.studentService.adviceList().subscribe(data => {
      this.advice = data['data']

		})
  }
  
  jobList(){
		this.studentService.jobList().subscribe(data=>{
			this.jobData = data['data']
		
			
		})
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
  


}
