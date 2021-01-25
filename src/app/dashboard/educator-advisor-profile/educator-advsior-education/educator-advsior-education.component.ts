import { Component, OnInit, TemplateRef } from '@angular/core';
import { StudentService } from '../../../lib/services/student.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../lib/services/auth.service'
import { NavigationExtras, Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-educator-advsior-education',
  templateUrl: './educator-advsior-education.component.html',
  styleUrls: ['./educator-advsior-education.component.scss']
})
export class EducatorAdvsiorEducationComponent implements OnInit {
  public studentId:any;
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

  constructor(private profileService:StudentService,
    private toasterService: ToastrService,
    private modalService: BsModalService,
    private authService : AuthService ) { }

  ngOnInit() {
    this.studentId =this.authService.getStudentId();
   this.educationListing(this.studentId)
  }

  educationListing(id) {
    this.profileService.getEducationList(id).subscribe((data) => {
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

}
