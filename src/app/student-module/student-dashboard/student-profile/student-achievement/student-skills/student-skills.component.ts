import { Component, OnInit , TemplateRef } from '@angular/core';
import { StudentService } from '../../../../../lib/services/student.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
@Component({
  selector: 'app-student-skills',
  templateUrl: './student-skills.component.html',
  styleUrls: ['./student-skills.component.scss']
})
export class StudentSkillsComponent implements OnInit {
 
  skillsData:Array<{}>;
  addPosition:FormGroup;
  modalRef2: BsModalRef;
  editInfo:boolean=false;
  vendorList:Array<any> = ['Soft Skills' , 'Hard Skills' , 'Language'];
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
      'type': new FormControl(null,[Validators.required]),
      'area' : new FormControl("improve"),
      'name': new FormControl("",[Validators.required]),
  
    })
    this.skillListing();
    // this.skillsDropListing();
    this.softSkillListing();
  }


  softSkillListing() {
    let pattern = 'r';
    this.profileService.getSoftSkills(pattern).subscribe(data=>{
    },err =>{
    })
  }




    skillListing() {
      this.profileService.getSkillListing().subscribe(data =>{
        this.skillsData=data['data'];
      },err =>{
      })
    }


    addSkill(template:TemplateRef<any>){
      this.addPosition.reset({'area':'strength'});
      this.editInfo=false;
      this.modalRef2 = this.modalService.show(template);
    }

    onAddSkill(){
      this.submitForm = false;

      if (!this.addPosition.valid) {
          this.submitForm = true
          return;
      }

      let payload={
        "type":this.addPosition.value.type,

	       "name":this.addPosition.value.name,
      }
      if(this.addPosition.value.area == 'improvement')
      {
        payload['improvement'] = true;
      }
      else{
        payload['strength'] = true;
      }

      this.profileService.addSkillData(payload).subscribe(data => {
       this.toasterService.success("Added Successfully");
       this.skillListing();
      })

      this.modalRef2.hide();
    }

    getSelectedValue(e,val){
     this.addPosition.patchValue({
       'type':val
     })
    }


 

    removeSkill(data){
      this.profileService.onRemoveSkill(data._id).subscribe(data =>{
        this.skillListing();
      }, err=>{
      })
    }


}
