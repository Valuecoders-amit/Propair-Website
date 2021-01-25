import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { StudentService } from '../../../../lib/services/student.service';
import { AuthService } from '../../../../lib/services/auth.service';
import { NavigationExtras, Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-student-advisor-carrier',
  templateUrl: './student-advisor-carrier.component.html',
  styleUrls: ['./student-advisor-carrier.component.scss']
})
export class StudentAdvisorCarrierComponent implements OnInit {

 
  public studentId:any;
  carrerData : Array < any >= [];
  careeListing : Array < any >= [];
  moreData : number;
  checkData : boolean = false;
  modalRef2 : BsModalRef;
  submitForm : boolean = false;
  addPosition : FormGroup;
  editInfo : boolean = false;
  careerId : string;
  constructor(
    private profileService : StudentService,
     private toasterService : ToastrService,
      private modalService : BsModalService,
      private authService:AuthService
  ) { }

  ngOnInit() {

    this.studentId =this.authService.getStudentId();
    this.careerListing(this.studentId) 

  }

  careerListing(id) {
    this.profileService.careerListingData(id).subscribe(data => {
        this.moreData = data['data'].length - 3;
        this.carrerData = data['data'];
        this.careeListing = [...this.carrerData]
        this.careeListing.splice(3);
    })
}

moreCareer() {
    this.careeListing = this.carrerData;
    this.checkData = true;
}

}
