import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StudentService } from '../../../../lib/services/student.service';
import { AuthService } from '../../../../lib/services/auth.service';
import { NavigationExtras, Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-student-advisor-biography',
  templateUrl: './student-advisor-biography.component.html',
  styleUrls: ['./student-advisor-biography.component.scss']
})
export class StudentAdvisorBiographyComponent implements OnInit {

  public studentId:any;
  biography: string;
  more:boolean=false;
  modalRef2: BsModalRef;
  inboxData:Array<any>=[];
  public noData: boolean = false;

  constructor( private profileService:StudentService,
    private toasterService: ToastrService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private authService:AuthService,
    private router : Router) { }

    ngOnInit() {
      this.studentId =this.authService.getStudentId();
      this.archiveContentData('public',this.studentId);
      this.getBioData(this.studentId);
    }

    getBioData(id){
      this.profileService.bioData(id).subscribe(data=>{
        this.biography = data['data'].biography;
        this.noData = true;
      })
    }


    filterInbox(val){
      this.archiveContentData(val,this.studentId);

    }


       archiveContentData(val,id){
        this.profileService.archiveMessageFilter(val,id).subscribe(data => {
          this.inboxData =  data['data']
          this.noData = true;
        })
         
        // this.profileService.inbox().subscribe(data => {
        //   this.inboxData = data['data'].inboxData   
        // })
       }

}
