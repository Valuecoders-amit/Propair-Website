import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../../lib/services/student.service'
declare var $
import * as moment from 'moment';




@Component({
  selector: 'app-archive-view-message',
  templateUrl: './archive-view-message.component.html',
  styleUrls: ['./archive-view-message.component.scss']
})
export class ArchiveViewMessageComponent implements OnInit {

  public inboxForm: FormGroup;
  public ReviewForm: FormGroup;

  public sub: any;
  public messageExchangeId: string;
  public messageExchangeArchiveThread: any = [];
  public tags: any;
  public currentRate = 0;

  public reviewArray = ['1','2','3','4','5']

  public ratingValue: any;
  public helpFulValue: any;
  public relevanceValue: any;
  public clarityValue: any;
  public studentProfile : boolean = false;

  constructor(
    private _fb: FormBuilder,
    private toasterService: ToastrService,
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {

    
   }

  ngOnInit() {

    this.activatedRoute.params.subscribe((param) => {
      this.messageExchangeId = param.id;
      this.messageDetails(this.messageExchangeId);

    })

    this.checkRoute();
  }

  checkRoute(){
    if(this.activatedRoute.snapshot.queryParams.student){
      this.studentProfile = true;
    }
  }



  messageDetails(id) {

    this.studentService.messageThreadDetail(id).subscribe(data => {
      this.messageExchangeArchiveThread = data['data']

      this.messageExchangeArchiveThread.replyThread.forEach(item => {
        let duration = moment.duration(moment(new Date()).diff(moment(item.createdAt)));
        if (duration['_data'].seconds > 0) {
          item['duration'] = `Submitted ${duration['_data'].seconds} ${(duration['_data'].seconds) > 1 ? 'seconds' : 'second'} ago by`;
        }
        if (duration['_data'].minutes > 0) {
          item['duration'] = `Submitted ${duration['_data'].minutes} ${(duration['_data'].minutes) > 1 ? 'minutes' : 'minute'} ago by`;
        }
        if (duration['_data'].hours > 0) {
          item['duration'] = `Submitted ${duration['_data'].hours} ${(duration['_data'].hours) > 1 ? 'hours' : 'hour'} 
          ${(duration['_data'].minutes > 0) ? (duration['_data'].minutes == 1) ? `${duration['_data'].minutes} minute` : `${duration['_data'].minutes} minutes` : ''} ago by`;
        }
        if (duration['_data'].days > 0) {
          item['duration'] = `Submitted ${duration['_data'].days} ${(duration['_data'].days) > 1 ? 'days' : 'days'} ago by`;
        }
      })



    })
  }

  navigate(data , id){

    if(data.ownerId.role == 'advisor'){
      window.open(`/student-module/dashboard/student-advisor-profile/${id}/student-advisor-biography`, "_blank");
      // this.router.navigateByUrl(`/student-module/dashboard/student-advisor-profile/${id}/student-advisor-biography`)
    }else{
      window.open(`/student-module/dashboard/student-profile/student-biography` , "_blank")
    }
  
  
  }
}
