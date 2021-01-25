import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../lib/services/student.service'
declare var $
import * as moment from 'moment';


@Component({
  selector: 'app-advisor-archive-view-message',
  templateUrl: './advisor-archive-view-message.component.html',
  styleUrls: ['./advisor-archive-view-message.component.scss']
})
export class AdvisorArchiveViewMessageComponent implements OnInit {

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
  public advisorProfile : boolean = false;

  constructor(
    private _fb: FormBuilder,
    private toasterService: ToastrService,
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((param) => {
      this.messageExchangeId = param.id;
      this.messageDetails(this.messageExchangeId);

    })

    this.checkRoute();
  }


  checkRoute(){
    if(this.activatedRoute.snapshot.queryParams.advisor){
      this.advisorProfile = true;
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

  studentProfileNavigate(id){
    // this.router.navigateByUrl(`/advisor-dashboard/advisor-student-profile/${id}`)
    window.open(`/advisor-dashboard/advisor-student-profile/${id}`, "_blank");
  }
  
  navigate(data , id){
  
    if(data.ownerId.role == "Student"){
      // this.router.navigateByUrl(`/advisor-dashboard/advisor-student-profile/${id}`)s
      window.open(`/advisor-dashboard/advisor-student-profile/${id}`, "_blank");
    }else{
      window.open('/advisor-dashboard/advisor-profile/advisor-biography')
    }
  }

}
