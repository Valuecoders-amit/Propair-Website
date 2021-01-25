import { Component, OnInit } from "@angular/core";
import { StudentService } from "../../lib/services/student.service";
import { ToastrService } from "ngx-toastr";

import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-advisor-my-message",
  templateUrl: "./advisor-my-message.component.html",
  styleUrls: ["./advisor-my-message.component.scss"],
})
export class AdvisorMyMessageComponent implements OnInit {
  public archiveData: any;
  public archiveCount: any;
  public draftboxes: any;
  public draftCount: any;
  propairCount : any;

  public inboxData: any;
  public inboxCount: any;

  currentResource: string = "advisor-dashboard";

  selectedOption: number;

  constructor(
    private studentService: StudentService,
    private toasterService: ToastrService,
    private router: Router
  ) {
    this.selectedOption = 0;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentResource = event.url.split("/")[3];
      }
    });
  }

  ngOnInit() {
    this.inbox();
    this.draft();
    this.archive();
    this.propairBox();
  }

  inbox() {
    this.inboxList();
    this.studentService.advisorinboxCount.subscribe((data) => {
      if (data) {
        this.inboxCount = data;
      }
    });
  }

  inboxList() {
    this.studentService.inbox().subscribe((data) => {
      this.inboxData = data["data"].inboxData;
      this.inboxCount = data["data"].inboxCount;
    });
  }

  archive() {
    this.archiveList();

    this.studentService.advisorarchiveCount.subscribe((data) => {
      if (data) {
        this.archiveCount = data;
      }
    });
  }

  archiveList() {
    this.studentService.archive().subscribe((data) => {
      this.archiveData = data["data"];
      this.archiveCount = data["messageCount"];
    });
  }

  draft() {
    this.draftbox();

    this.studentService.advisordraftCount.subscribe((data) => {
      if (data) {
        this.draftCount = data;
      }
    });
  }

  draftbox() {
    this.studentService.draftBox().subscribe((data) => {
      this.draftboxes = data["data"].messageData;
      this.draftCount = data["data"].messageCount;
    });
  }

  propairBox(){
    this.studentService.propairSupportList().subscribe((data) => {
      this.propairCount = data["messageCount"];
      
    });
  }

  }
 
