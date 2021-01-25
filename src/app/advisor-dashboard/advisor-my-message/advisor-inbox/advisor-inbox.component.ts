import { Component, OnInit} from '@angular/core';
import { StudentService } from '../../../lib/services/student.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advisor-inbox',
  templateUrl: './advisor-inbox.component.html',
  styleUrls: ['./advisor-inbox.component.scss']
})
export class AdvisorInboxComponent implements OnInit {

  public inboxData :any;
  public inboxCount :any;


  constructor(
    private studentService: StudentService,
    private toasterService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.inboxList();
  }

  inboxList() {

    this.studentService.inbox().subscribe(data => {
      this.inboxData = data['data'].inboxData
      this.inboxCount = data['data'].inboxCount
      this.studentService.advisorinboxCount.next(this.inboxCount)

    })
  }


  filterInbox(value) {
    
    if (value == "all") {
      this.inboxList()
    } else {
      this.studentService.inboxListingFilter(value).subscribe(data => {
        this.inboxData =  data['data'].inboxData
      })
    }
  }

  
  navigate(id){
    this.router.navigateByUrl('advisor-dashboard/advisor-inbox-view-message/'+id)
  }

}
