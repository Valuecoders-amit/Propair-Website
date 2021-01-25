import { Component, OnInit , TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StudentService } from '../../../../lib/services/student.service';
@Component({
  selector: 'app-student-carrier',
  templateUrl: './student-carrier.component.html',
  styleUrls: ['./student-carrier.component.scss']
})
export class StudentCarrierComponent implements OnInit {


  biography: string;
  public noData: boolean = false;

  more:boolean=false;
  modalRef2: BsModalRef;
  constructor(
    private profileService:StudentService,
    private toasterService: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getCareerData();
  }
  editCareer( template: TemplateRef<any>){
    
      this.modalRef2 = this.modalService.show(template);
  }
  
  careerData() {
    this.profileService.editStudentCareer({'carrerGoal':this.biography}).subscribe(data=>{
      this.toasterService.success("Bio Updated Successfully")
    },
    error=>{
      this.toasterService.error(`${error.error.message}`)
    })

    this.modalRef2.hide();
  }

  getCareerData(){
    this.profileService.bioData().subscribe(data=>{
      if(data['data'].carrerGoal){
        this.biography = data['data'].carrerGoal;
        this.noData = true;
      }
    })
  }

}
