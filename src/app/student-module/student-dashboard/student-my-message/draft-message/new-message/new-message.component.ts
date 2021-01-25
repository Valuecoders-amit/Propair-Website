import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare var current_fs, next_fs, previous_fs; //fieldsets
declare var left, opacity, scale; //fieldset properties which we will animate
declare var animating; //flag to prevent quick multi-click glitches
declare var $
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from "../../../../.././lib/services/student.service"
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Stepper from 'bs-stepper'
import { async } from '@angular/core/testing';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {

  public outboxes: any;
  public draftboxes: any;
  public archives: any;
  public selectedAll: any
  public studentsData: any = [];
  public newExchangeData: any = [];
  public draftNewMessageExchangeType: any
  public draftLiveMessageExchangeType: any

  public ratingValue: any = 0
  public helpFulValue: any = 0
  public relevanceValue: any = 0
  public clarityValue: any = 0
  public questionId: any = 0;
  public propairData: any;
  public propairCount:any;

  public statsData: any;
  public studentStatsData: any;
  public liveMessagevalue: any;
  public newMessagevalue: any;
  public draftTab: any ='LiveMessageExchange';

  public propairDataArray: any;
  public propairIds: any;

  public typevalue: any;
  public averagevalue:number;




  public ReviewForm: FormGroup;
  public propairForm: FormGroup

  propairListArray: any = [];


  public draftData: any = [];
  public draftCount: any;
  public outboxCount: any;
  public inboxData: any;
  public inboxCount: any;
  public draftMessageExchange: any;
  public archiveCount : any;

  public selectedIds: any = []
  public draftIds: any = []

  public selectedMessages: string[] = [];

  // image upload
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  public imageUrl :any;


  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

  constructor(

    private router: Router,
    private studentService: StudentService,
    private toasterService: ToastrService,
    private _fb: FormBuilder,
    private http: HttpClient,
    private SpinnerService: NgxSpinnerService
  ) 
  { 
    this.ReviewForm = this._fb.group({

      reviews: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(999)]],

      ratings: new FormControl('', Validators.required),
      helpful: new FormControl('', Validators.required),
      relavance: new FormControl('', Validators.required),
      clarity: new FormControl('', Validators.required),


      questionId: new FormControl('', Validators.required)

    });

    this.propairForm = this._fb.group({

      subject: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(999)]],

      message: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(999)]],

      file: new FormControl(''),



    });
  }

  ngOnInit() {
    this.studentService.draftDataLiveLists(null)
    this.studentService.message_draftDataNewList.subscribe(data => {
      if(data){
        this.draftMessageExchange = data['data'].messageData
        this.newExchangeData = []
        this.draftMessageExchange.forEach(item => {
          let temp = Object.assign({}, item, { value: false });
          this.newExchangeData.push(temp);
        });
      }else{
        this.draftNewMessageExchange();
      }
    })
    // this.outbox();
    // this.archive();
    // this.inboxList();
    // this.propairList();
    this.draftbox();
  }

   
  outbox() {
    this.studentService.outBox().subscribe(data => {
      this.outboxes = data['data'].messageData
      this.outboxCount = data['data'].messageCount
      this.studentsData = []
      this.outboxes.forEach(item => {
        let temp = Object.assign({}, item, { value: false });
        this.studentsData.push(temp);

      });
    })

  }

  checkBalance() {
    this.studentService.checkBalance().subscribe(data => {
      if (data['status'] == 200) {
        this.newMessageExchange();
      } else {
        this.toasterService.error('Error', data['message'])
      }

    }, err => {
      this.toasterService.error('Error', err.error.message)
    }
    )
  }

  draftNewMessageExchange() {
    this.studentService.draftNewMessageExchange().subscribe(data => {
      this.draftMessageExchange = data['data'].messageData
      this.newExchangeData = []
      this.draftMessageExchange.forEach(item => {
        let temp = Object.assign({}, item, { value: false });
        this.newExchangeData.push(temp);
      });
    })
  }

  draftbox() {
    this.studentService.draftBox().subscribe(data => {
      this.draftboxes = data['data'].messageData
      this.draftCount = data['data'].messageCount

      this.studentService.draftCount(this.draftCount);

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

  propairList() {
    this.studentService.propairSupportList().subscribe(data => {
      this.propairData = data['data']
      this.propairCount = data['messageCount']

      this.propairListArray = []
      this.propairData.forEach(item => {
        let temp = Object.assign({}, item, { value: false })
        this.propairListArray.push(temp)
      })
    })
  }

  draftClick(value) {
    this.liveMessagevalue = value


  }

  activeLiveMessage(value) {

    this.liveMessagevalue = value
  }

  activeNewMessage(value) {

    this.newMessagevalue = value


  }


  activeDraftTab(value) {

    this.draftTab = value


  }

  filterArchive(value) {
    if (value == "all") {
      this.archive();
    } else {
      this.studentService.archiveMessageFilter(value).subscribe(data => {
        this.archives = data['data']
      })
    }
  }

  archive() {
    this.studentService.archive().subscribe(data => {
      this.archives = data['data']
      this.archiveCount = data['messageCount']

    })

  }

  showMesage(id) {
    this.studentService.messageRead(id).subscribe(data => {
      this.router.navigateByUrl('student-module/dashboard/view-message/' + id)

    })
  }

  showOutboxMesage(id) {
    this.studentService.messageRead(id).subscribe(data => {
      this.router.navigateByUrl('student-module/dashboard/outbox-view-message/' + id)

    })
  }
  show(id) {

    this.studentService.messageRead(id).subscribe(data => {
      this.router.navigateByUrl('student-module/dashboard/inbox-view-message/' + id)

    })
  }

  showArchiveMesage(id) {
    this.router.navigateByUrl('student-module/dashboard/archive-view-message/' + id)
  }

  navigatToNewMessageExchange(id) {

    this.router.navigateByUrl('student-module/dashboard/new-exchange-view-message/' + id)
  }

  inboxList() {

    this.studentService.inbox().subscribe(data => {
      this.inboxData = data['data'].inboxData
      this.inboxCount = data['data'].inboxCount
    })
  }

  // showInboxMesage(value){
  //   this.router.navigateByUrl('student-module/dashboard/view-message/' + value)
  // }



  // delete functionality in draftbox

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

  newMessageDraftChecked() {
    this.selectedAll = this.newExchangeData.every(function (item: any) {
      return item.value == true;
    })
    this.selectedMessages = []
    this.newExchangeData.forEach(data => {
      if (data.value) {
        this.selectedMessages.push(data._id);
      }
    });
    this.studentService.deletDraft(this.selectedMessages)
    // this.studentService.deletDraft(false)

  }

  deletePopup() {

    if (this.draftTab == 'LiveMessageExchange') {
      this.selectedMessages = [];
      this.draftData.forEach(data => {
        if (data.value) {
          this.selectedMessages.push(data._id);
        }
      });

    }

    else if (this.draftTab == 'newMessageExchange') {
      this.selectedMessages = [];
      this.newExchangeData.forEach(data => {
        if (data.value) {
          this.selectedMessages.push(data._id);
        }
      });
    }

    if (!this.selectedMessages.length) {
      this.toasterService.warning("Please Select The CheckBox");
    } else {
      // this.approveModal = this.modalService.show(this.approvePopup);
      $("#delete").modal("show");
    }

  }

  delete() {

    if (this.draftTab == 'LiveMessageExchange') {
      if (this.selectedMessages) {
        this.studentService.deleteMessageLive(this.selectedMessages).subscribe(data => {
          if (data['status'] == 200) {
            this.toasterService.success('Success', data['message']);
            $("#delete").modal("hide");
            this.draftbox();
          } else {
            this.toasterService.error('Error', data['message']);
          }

        }, err => {
          this.toasterService.error('Error', err.error.message);
        }
        )

      }
    }

    else if (this.draftTab == 'newMessageExchange') {

      if (this.selectedMessages) {
        this.studentService.deleteMessage(this.selectedMessages).subscribe(data => {
          if (data['status'] == 200) {
            this.toasterService.success('Success', data['message']);
            $("#delete").modal("hide");
            this.draftNewMessageExchange();
            this.draftbox();
          } else {
            this.toasterService.error('Error', data['message']);
          }

        }, err => {
          this.toasterService.error('Error', err.error.message);
        }
        )

      }

    }
  }

  // send functionality in outbox

  studentChecked(value) {

    this.typevalue = value
    this.selectedAll = this.outboxes.every(function (item: any) {
      return item.value == true;
    })

  }

  sendNow() {
    this.SpinnerService.show();
    this.SpinnerService.show();
    this.selectedIds = []
    this.studentsData.forEach(data => {
      if (data.value) {
        this.selectedIds.push(data._id)

      }

    })
    this.studentService.sendNow(this.selectedIds).subscribe(data => {
    this.SpinnerService.hide();

      if (data['status'] == 200) {

        this.toasterService.success('Success', data['message']);
        $("#send-private").modal("hide")
        this.outbox();
        this.inboxList()
      } else {
        this.toasterService.error('Error', data['message']);
      }

    },
      err => {
        this.toasterService.error('Error', err.error.message);
      })

  }

  viewPopup() {
    this.selectedIds = []
    this.studentsData.forEach(data => {
      if (data.value) {
        this.selectedIds.push(data._id)
      }
    })
    if (!this.selectedIds.length) {
      this.toasterService.warning("Please Select The CheckBox");
    } else {
      // this.approveModal = this.modalService.show(this.approvePopup);
      $("#send-private").modal("show");
    }
  }


  reviewPopup(id) {
    this.ReviewForm.reset();
    this.questionId = id
    $("#reveiw-modal").modal("show");

  }

  // review & Rating

  rating(value) {
    this.ratingValue = value
  }

  helpFul(value) {
    this.helpFulValue = value
    this.average();
  }

  relevance(value) {
    this.relevanceValue = value
    this.average();

  }
  clarity(value) {
    this.clarityValue = value
    this.average();
  }

  average(){
    this.averagevalue = Math.round(( this.clarityValue + this.relevanceValue + this.helpFulValue)/3)
  }

  reviewSubmit(x) {

    if (x) {

      this.ReviewForm.patchValue({ questionId: this.questionId })
      this.ReviewForm.patchValue({ ratings: this.averagevalue })
      this.ReviewForm.patchValue({ helpful: this.helpFulValue })
      this.ReviewForm.patchValue({ relavance: this.relevanceValue })
      this.ReviewForm.patchValue({ clarity: this.clarityValue })

      this.studentService.ratingsAndReviews(this.ReviewForm.value).subscribe(data => {
        if (data['status'] == 200) {
          this.toasterService.success('Success', data['message'])
          this.ReviewForm.reset();
          this.averagevalue = 0
          this.helpFulValue = 0
          this.relevanceValue = 0
          this.clarityValue = 0

          this.archive();
          $("#reveiw-modal").modal("hide");
          // this.router.navigateByUrl('student-module/dashboard/student-message')
        } else {
          this.toasterService.error('Error', data['message'])
          this.archive();

        }
      },

        err => {

          this.toasterService.error('Error', err.error.error);
          this.archive();
          // $("#reveiw-modal").modal("show");

        }
      )


    } else {
      this.ReviewForm.reset();
      this.averagevalue = 0
      this.helpFulValue = 0
      this.relevanceValue = 0
      this.clarityValue = 0
      $("#reveiw-modal").modal("hide");


    }

  }


  ViewInfoPopup(id) {

    $("#info").modal("show");
    this.studentService.viewStatics(id).subscribe(data => {
      this.statsData = data['data']
      this.studentStatsData = this.statsData['student']

    })

  }

  newMessageExchange() {
    this.studentService.tagTab = false
    this.studentService.QuestionTab = false
    this.studentService.ReviewTab = false
    this.router.navigateByUrl('/student-module/dashboard/message-exchange')
  }



  selectAllPropairSupport() {

    this.propairListArray.forEach(student => {
      student.value = this.selectedAll;
    });
    this.propairIds = [];
    this.propairListArray.forEach(data => {
      if (data.value) {
        this.propairIds.push(data._id);
      }

    })
  }

  propairChecked() {
    this.selectedAll = this.propairListArray.every(function (item: any) {
      return item.value == true;
    })

  }

  deletePropairSupportPopup() {

    this.propairIds = [];
    this.propairListArray.forEach(data => {
      if (data.value) {
        this.propairIds.push(data._id);
      }
    })
    if (!this.propairIds.length) {
      this.toasterService.warning("Please Select The CheckBox");
    } else {
      // this.approveModal = this.modalService.show(this.approvePopup);
      $("#deletePropair").modal("show");
    }

  }

  deleteMessagePropairSupport() {

    if (this.propairIds) {
      this.studentService.deleteMessagePropairSupport(this.propairIds).subscribe(data => {
        if (data['status'] == 200) {
          this.toasterService.success('Sucess', data['message'])
          $("#deletePropair").modal("hide");
          this.propairList();
        }
      })

    }
  }




  navigatePropairSupport(id) {
    this.router.navigateByUrl('student-module/dashboard/propair-view-message/' + id)

  }


  // image uploader 


  uploadFile(files: any[]) {
    if (files[0] && files[0].type.includes("image")) {
      const file = files[0];

      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.studentService.fileUpload(formData).subscribe(data => {
        if (data['status'] == 200) {

          this.propairForm.patchValue({ file: data['data'] })
          this.imageUrl = data['data'];
        }
      })


    }

  }

  propairSupport() {
    $("#message-inbox").modal("show");

  }

  sendPropair() {

    this.SpinnerService.show()
    this.studentService.sendPropairSupport(this.propairForm.value).subscribe(data => {
    this.SpinnerService.hide();

      if (data['status'] == 200) {
        this.toasterService.success('Success', data['message'])
        $("#message-inbox").modal("hide");
        this.propairList();
        this.imageUrl = null ;
        this.propairForm.reset();

      }else{
        this.toasterService.error('Error' , data['message'])
      }
    }, err =>{

      this.toasterService.error('Error' , err.error.error)
    }

    )
  }

  cancel() {
    this.imageUrl = null ;
    this.propairForm.reset();
    this.router.navigateByUrl('student-module/dashboard/student-message')
  }

  imageClick(imageUrl) {
    window.open(imageUrl)
  }


  filterPropairSupport(value) {
    if (value == "all") {
      this.propairList();
    } else {
      this.studentService.propairSupportListFilter(value).subscribe(data => {
        this.propairListArray = data['data']
      })
    }
  }



}
