import { Component, OnInit, TemplateRef } from '@angular/core';
import {StudentService } from '../../../../lib/services/student.service'
import { Router, ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-advisor-new-signup5',
  templateUrl: './advisor-new-signup5.component.html',
  styleUrls: ['./advisor-new-signup5.component.scss']
})
export class AdvisorNewSignup5Component implements OnInit {



  educationData:Array<any>=[];
  eduListing:Array<any>=[];
  moreData:number;
  checkData:boolean=false;
  editInfo:boolean=false;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  addPosition:FormGroup;
  careerId:string;
  submitForm : boolean=false;
  schoolList:Array<any>=[];
  public universityImage : any;
  public start = 1970;
  public end = new Date().getFullYear();
  public options = [];
  public hideFieldOfStudyDiv : boolean=false;


  constructor(
    private profileService : StudentService,
    private router: Router,
    private toasterService : ToastrService,
    private modalService: BsModalService,
    private SpinnerService: NgxSpinnerService,
    private toastr:ToastrService,
  ) {
    this.profileService.AdvisorNewMessageTab1=true;
    this.profileService.AdvisorNewMessageTab2=true;
    this.profileService.AdvisorNewMessageTab3=true;
    this.profileService.AdvisorNewMessageTab4=true;
    this.profileService.AdvisorNewMessageTab5=true;
    this.profileService.AdvisorNewMessageTab6=false;
   }

  ngOnInit() {
    this.years();
    this.addPosition= new FormGroup({
      'school': new FormControl(null, [Validators.required]),
      'qualification': new FormControl("", [Validators.required]),
      'year': new FormControl("" , [Validators.required]),
      'subject' : new FormControl(null, [Validators.required]),
      'grade' : new FormControl(null, [Validators.required]),
      // 'file' : new FormControl('', [Validators.required])
    })

    this.educationListing();
    this.universityList();
    this.SpinnerService.hide();
  }

  years(){
    for(let year = this.start ; year <=this.end; year++){
      this.options.push(year)
    }

    
  }

  next(){

    this.SpinnerService.show();
    this.router.navigate(['/advisor-newsignup',this.profileService.signupFlowtoken,'advisor-new-message6'])

  }

  skip(){
    this.router.navigate(['/advisor-newsignup',this.profileService.signupFlowtoken,'advisor-new-message6'])

  }

  privious(){

    this.router.navigate(['/advisor-newsignup',this.profileService.signupFlowtoken,'advisor-new-message4'])

   
  }

  addEducation(template: TemplateRef<any>){
    this.addPosition.reset({'qualification':'' , year : ''});
    this.editInfo=false;
    this.schoolList=[];
    this.modalRef2 = this.modalService.show(template);
  }

  educationListing() {
    this.profileService.getEducationList().subscribe((data) => {
    this.moreData=data['data'].length - 3;
    this.educationData=data['data'];
    this.eduListing=[...this.educationData]
    this.eduListing.splice(3);
    })
  }

  moreCareer(){
    this.eduListing = this.educationData;
    this.checkData=true;
  }

  onAddEducation(){
    this.submitForm = false;
    if (!this.addPosition.valid){
      this.submitForm = true;
      return;
     }


    let payload = {
    
        "university":this.addPosition.value.school,
        "qualification":this.addPosition.value.qualification,
        "year":this.addPosition.value.year,
        "subject":this.addPosition.value.subject,
        "grade":this.addPosition.value.grade ,
        'image':(this.universityImage ? this.universityImage : "assets/images/university.png")
      }

      this.profileService.addNewEducation(payload).subscribe(data=>{

        this.educationListing();
        this.toasterService.success("Added Successfully");
      }, err=>{
        this.toasterService.error(`${err.error.message}`)
      })
  
     this.modalRef2.hide();
     this.addPosition.reset();
  }
  onEditEducation(){

    this.submitForm = false;
    if (!this.addPosition.valid){
      this.submitForm = true;
      return;
     }


    let payload = {
    
      "university":this.addPosition.value.school,
      "qualification":this.addPosition.value.qualification,
      "year":this.addPosition.value.year,
      "subject":this.addPosition.value.subject,
      "grade":this.addPosition.value.grade,
      'image':(this.universityImage ? this.universityImage : "assets/images/university.png")
     
     }

     this.profileService.editNewEducation(this.careerId,payload).subscribe(data=>{
      this.checkData=false;
      this.educationListing();
      this.toasterService.success("Edit Successfully");
    }, err=>{
      this.toasterService.error(`${err.error.message}`)
    })

   
   this.modalRef2.hide();
   this.addPosition.reset();
   this.editInfo=false;
  }

  editEducation(career,template: TemplateRef<any> ){
    this.addPosition.setValue({
    
      'school': career.university,
      'qualification': career.qualification,
      'year':career.year,
      'subject' : career.subject,
      'grade' : career.grade,
      'image':(this.universityImage ? this.universityImage : "assets/images/university.png")
    })
    this.modalRef2= this.modalService.show(template);
    this.editInfo=true;
    this.careerId=career['_id'];
  }

  removeEducation(){
    this.profileService.removeEducationData(this.careerId).subscribe(data =>{
      this.checkData=false;
      this.educationListing();
      this.toasterService.success("Removed Successfully");
    })
    
      this.modalRef2.hide();
      this.addPosition.reset();
      this.editInfo=false;
  }


  universityList(){

    let patt = this.addPosition.value.school;
    
    this.profileService.getSchools(patt).subscribe(data => {
    // this.addPosition.controls['school'].patchValue(data['data']);
    this.schoolList=[];
    this.schoolList = data["data"]['data']
    if(this.schoolList){
      this.hideFieldOfStudyDiv = true;
    }else{
      this.hideFieldOfStudyDiv = false;

    }
    // this.segmentLogo(data["data"]['domain']);
    })
  }

  segmentLogo(domain , value){
    let payload = {
      "universityDomain":domain
    }

    this.hideFieldOfStudyDiv = false;
    this.addPosition.patchValue({
      'school' : value
    })
    this.profileService.segmentLogo(payload).subscribe(data =>{
      this.universityImage = data['data']['logo']
    })
  }




}
