import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare var current_fs, next_fs, previous_fs; //fieldsets
declare var left, opacity, scale; //fieldset properties which we will animate
declare var animating; //flag to prevent quick multi-click glitches
declare var $

import { ToastrService } from 'ngx-toastr';
import { StudentService } from "../../../lib/services/student.service"
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Stepper from 'bs-stepper'
import { async } from '@angular/core/testing';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner"; 
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-student-my-message',
  templateUrl: './student-my-message.component.html',
  styleUrls: ['./student-my-message.component.scss']
})
export class StudentMyMessageComponent implements OnInit {

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
  public draftTab: any;
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

  currentResource: string ;
  
  selectedOption: number;

  public inboxCounts: any;

  constructor(
    private router: Router,
    private studentService: StudentService,
    private toasterService: ToastrService,
    private _fb: FormBuilder,
    private http: HttpClient,
    private SpinnerService: NgxSpinnerService
  ) { 


    this.selectedOption = 0;
    this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.url.split('/')[4];      
      }
    })  

    
  }
  
  ngOnInit() {
    
    
        this.inbox();
        this.draft();
       this.outbox();
       this.archiveList();
       this.propair();


  }

inbox(){
  this.studentService.message_inboxCounts.subscribe(data =>{
    if(data){
      this.inboxCount = data
      

    }else{
      this.inboxList();
    }

  })
}

  inboxList() {

    this.studentService.inbox().subscribe(data => {
      this.inboxData = data['data'].inboxData
      this.inboxCount = data['data'].inboxCount


    })
  }

  draftbox() {
    this.studentService.draftBox().subscribe(data => {
      this.draftboxes = data['data'].messageData
      this.draftCount = data['data'].messageCount

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

  draft(){
    this.studentService.message_draftCounts.subscribe(data =>{
      if(data){
        this.draftCount = data

      }else{
        this.draftbox();
      }
    })
  }

     
  outboxList() {
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

  outbox(){
    this.studentService.message_outBoxCounts.subscribe(data =>{
      if(data){
        this.outboxCount = data
      }else{
        this.outboxList()
      }
    })
  }

  archiveList() {
    this.studentService.archive().subscribe(data => {
      this.archives = data['data']
      this.archiveCount = data['messageCount']

    })

  }

  archive(){
    this.studentService.message_archiveCounts.subscribe(data =>{
      this.archiveCount = data
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

  propair(){
    this.studentService.message_propairCounts.subscribe(data =>{
      if(data){
        this.propairCount = data
      }else{
        this.propairList();
      }
    })
  }

}



