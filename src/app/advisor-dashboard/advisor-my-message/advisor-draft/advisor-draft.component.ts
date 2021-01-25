import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../lib/services/student.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
declare var $

@Component({
  selector: 'app-advisor-draft',
  templateUrl: './advisor-draft.component.html',
  styleUrls: ['./advisor-draft.component.scss']
})
export class AdvisorDraftComponent implements OnInit {

  public draftboxes:any;
  public draftCount:any;
  public draftData: any = [];
  public draftLiveMessageExchangeType: any
  public selectedAll: any
  
  public selectedMessages: string[] = [];
  


  constructor(
    private studentService: StudentService,
    private toasterService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.draftbox()
  }


  draftbox() {
    this.studentService.draftBox().subscribe(data => {
      this.draftboxes = data['data'].messageData
      this.draftCount = data['data'].messageCount

      this.studentService.advisordraftCount.next(this.draftCount)

      // this.studentService.draftCount(this.draftCount);

      this.draftboxes.forEach(element => {
        this.draftLiveMessageExchangeType = element.type
      });

      this.draftData = []

      this.draftboxes.forEach(item => {
        let temp = Object.assign({}, item, { value: false });
        this.draftData.push(temp);




      });


    })

  }

  
  selectAll() {

    this.draftData.forEach(student => {

      student.value = this.selectedAll;
    });
    this.selectedMessages = [];
    this.draftData.forEach(data => {
      if (data.value) {
        this.selectedMessages.push(data._id);
      }

    })
  }

  studentsChecked() {
    this.selectedAll = this.draftData.every(function (item: any) {
      return item.value == true;
    })

  }

  navigate(id){

    this.router.navigateByUrl('advisor-dashboard/advisor-draft-view-message/' + id)
  }

  deletePopup() {

      this.selectedMessages = [];
      this.draftData.forEach(data => {
        if (data.value) {
          this.selectedMessages.push(data._id);
        }
      });

  


    if (!this.selectedMessages.length) {
      this.toasterService.warning("Please Select The CheckBox");
    } else {
      // this.approveModal = this.modalService.show(this.approvePopup);
      $("#delete").modal("show");
    }

  }

  delete(){

    this.studentService.deleteMessageLive(this.selectedMessages).subscribe(data => {
      if (data['status'] == 200) {

        this.toasterService.success('success', data['message']);
        $("#delete").modal("hide");
        this.draftbox();
      } else {
        this.toasterService.error('error', data['message']);
      }

    }, err => {
      this.toasterService.error('error', err.error.message);
    }
    )

  }

}
