import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../lib/services/student.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $

@Component({
  selector: 'app-advisor-archive',
  templateUrl: './advisor-archive.component.html',
  styleUrls: ['./advisor-archive.component.scss']
})
export class AdvisorArchiveComponent implements OnInit {

  public archiveData:any;
  public archiveCount:any;

  public statsData: any;
  public messageCount : any;
  public studentStatsData: any;
  public kpEarned : any;
  public firstResponse : any;
  public firstValueOfTime :any;
  public secondValueOfTime :any;
  public timeUnit : any

  constructor(
    private studentService: StudentService,
    private toasterService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.archive()
  }

  archive() {
    this.studentService.archive().subscribe(data => {
      this.archiveData = data['data']
      this.archiveCount = data['messageCount']
      this.studentService.advisorarchiveCount.next(this.archiveCount)

    })

  }

  navigate(id){

    this.router.navigateByUrl('advisor-dashboard/advisor-archive-view-message/' + id)
  }

  filterArchive(value) {
    if (value == "all") {
      this.archive();
    } else {
      this.studentService.archiveMessageFilter(value).subscribe(data => {
        this.archiveData = data['data']
      })
    }
  }


  ViewInfoPopup(id) {

    
    this.studentService.viewStatics(id).subscribe(data => {
      this.statsData = data['data']
      this.messageCount = data['messageLength']
      this.kpEarned = data['kpEarned']
      this.firstResponse =data['firstResponse']
      this.timeUnit = data['timeUnit']
      let averageResponceTime = this.firstResponse
      let temp = averageResponceTime.toString().split('.')
      this.firstValueOfTime = temp[0]
      this.secondValueOfTime = temp[1]
      $("#info").modal("show");
      this.studentStatsData = this.statsData['student']

    })

  }


  ViewPrivateInfoPopup(id) {
    this.studentService.viewStatics(id).subscribe(data => {
      this.statsData = data['data']
      $("#privateInfo").modal("show");
      this.studentStatsData = this.statsData['student']

    })

  }



}
