import { Component, OnInit , TemplateRef } from '@angular/core';
import { StudentService } from '../../../../../lib/services/student.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-extras',
  templateUrl: './student-extras.component.html',
  styleUrls: ['./student-extras.component.scss']
})
export class StudentExtrasComponent implements OnInit {


  addPosition:FormGroup;
  modalRef2: BsModalRef;
  editInfo:boolean=false;
  activityData:Array<{}>;
  vendorList:Array<any> = ['Award or Honour' , 'Sport or Atheletic', 'Music'];
  activityId:string;
  submitForm:boolean=false;
  config = {
    displayKey:"description", 
    search: true ,
    height: 'auto', 
    placeholder:'Select', 
    customComparator: ()=>{}, 
    limitTo: 30, 
    moreText: 'more', 
    noResultsFound: 'No results found!', 
    searchPlaceholder:'Search' ,
    clearOnSelection: false ,
    inputDirection: 'ltr'
  }


  constructor(private profileService:StudentService,
    private toasterService: ToastrService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.addPosition= new FormGroup({
      'type': new FormControl(null, [Validators.required]),
      'name': new FormControl("", [Validators.required]),
  
    })
    this.listingActivities();
    // this.extraCurricularListing();
  }

  listingActivities() {
    this.profileService.getActivitiesData().subscribe(data=>{
      this.activityData=data['data'];

    })
  }

  addActivity(template:TemplateRef<any>){
    this.addPosition.reset({'type':''});
    this.editInfo=false;
    this.modalRef2 = this.modalService.show(template);
  }
  onAddActivity(){

     this.submitForm = false;

     if (!this.addPosition.valid) {
         this.submitForm = true
         return;
     }

    let payload={
      'type':this.addPosition.value.type,
      'name':this.addPosition.value.name
    }

    this.profileService.addActivityData(payload).subscribe(data=>{
      this.toasterService.success("Acivity Added");
      this.listingActivities();
    })

    this.modalRef2.hide();

  }

  getSelectedValue( e ,val){
    this.addPosition.patchValue({
      'type': val
    })
  }

  editActivity(typeName, data,template: TemplateRef<any>){
    this.addPosition.setValue({
      'type':typeName,
      'name':data.name,

    })
    this.activityId = data._id;
    this.editInfo=true;
    this.modalRef2 = this.modalService.show(template);
  }

  onEditActivity(){

    this.submitForm = false;

     if (!this.addPosition.valid) {
         this.submitForm = true
         return;
     }

    let payload = { 
      'type':this.addPosition.value.type,
      'name':this.addPosition.value.name
    }
    this.profileService.editActivity(payload, this.activityId).subscribe(data=>{
      this.toasterService.success("Edit Successfully");
      this.listingActivities();
    })
    this.modalRef2.hide();
  }

  removeActivity(){
    this.profileService.removeActivity( this.activityId).subscribe(data=>{
      this.toasterService.success("Removed Successfully");
      this.listingActivities();
    })
    this.modalRef2.hide();
  }

}
