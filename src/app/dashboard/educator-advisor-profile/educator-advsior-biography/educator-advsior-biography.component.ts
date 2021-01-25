import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../lib/services/student.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../lib/services/auth.service'
import { NavigationExtras, Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-educator-advsior-biography',
  templateUrl: './educator-advsior-biography.component.html',
  styleUrls: ['./educator-advsior-biography.component.scss']
})
export class EducatorAdvsiorBiographyComponent implements OnInit {

  public studentId:any;
  biography: string;
  more:boolean=false;
  modalRef2: BsModalRef;
  inboxData:Array<any>=[];

  constructor( private profileService:StudentService,
    private toasterService: ToastrService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private authService:AuthService,
    private router : Router) { }

    ngOnInit() {
      this.studentId =this.authService.getStudentId();
      this.inboxContentData('public',this.studentId);
      this.getBioData(this.studentId);
    }

    getBioData(id){
      this.profileService.bioData(id).subscribe(data=>{
        this.biography = data['data'].biography;
      })
    }


    filterInbox(val){
      this.inboxContentData(val,this.studentId);

    }


    inboxContentData(val,id){
  
      this.profileService.archiveProfileFilter(val,id).subscribe(data => {
      this.inboxData =  data['data']
      
    })
         
       }

}
