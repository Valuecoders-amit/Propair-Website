import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../../lib/services/auth.service'
import { AdvisorService } from '../../../../lib/services/advisor.service'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { StudentService } from '../../../../lib/services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions
} from "@ng-bootstrap/ng-bootstrap";

import { ImageCroppedEvent } from "ngx-image-cropper";
declare var Stripe: any;

@Component({
  selector: 'app-student-credits',
  templateUrl: './student-credits.component.html',
  styleUrls: ['./student-credits.component.scss']
})
export class StudentCreditsComponent implements OnInit {

  public creditValue:any;
  public buyCreditValue : any;
  public creditListData: any;
  public calculateCredit: any = 0;
  public calculateBuyCredit:any = 0;
  public userData:any;
  public memberShip:any;
  stripe: any;
  public userInfo:any;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalRef4: BsModalRef;
  public school:any;

  requestCreditForm:FormGroup;
  buyCreditForm: FormGroup

  constructor(
    private authService :AuthService,
    private toaster: ToastrService,
    private advisorService : AdvisorService,
    private _fb: FormBuilder,
    private modalService: NgbModal,
    private studentService :StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService1: BsModalService
  ) { 

    this.requestCreditForm = this._fb.group({

      credit: [null, [Validators.required]],
    });

    this.buyCreditForm = this._fb.group({

      credit: [null, [Validators.required]],
    });

  }

  ngOnInit() {

    this.userInfo = this.authService.getUserInfo();
    let query = this.activatedRoute.snapshot.queryParams;

    if (query.transaction) {
      this.checkTransationStatus(query.transaction);
    }
    this.creditRequestList();
    this.memeberShipData();
    this.educatorSchoolName();
    this.userData=this.authService.getUserInfo()
  }

  memeberShipData(){
    this.studentService.creditGenral().subscribe(data=>{
      this.memberShip = data['data']
      this.studentService.membershipPriseCount(this.memberShip)
    })
  }





  creditRequestList(value ?:any){

    this.studentService.studentCreditRequestListing(value).subscribe(data=>{
      if(data['status'] == 200){
        this.creditListData = data['data'];
      }

    })
  }


  changeFilter(value){
    if(value == 'all'){
      this.creditRequestList();
    }else{
      this.creditRequestList(value);
    }
  }

  educatorSchoolName(){
    this.studentService.educatorSchoolName().subscribe(data=>{
      this.school = data['data']['schoolName']
    })
  }


  creditDropdown(value){
    this.creditValue = value

    this.calculateCreditCost();

  }

  buyCreditDropdown(value){
    this.buyCreditValue = value
    let payload ={
      credit:this.buyCreditValue
    }
    this.studentService.calculateCredit(payload).subscribe(data =>{
      this.calculateBuyCredit = data['data']
      

    })

  }

  openBuyCreditPopup(template: TemplateRef<any>){
    this.modalRef4 = this.modalService1.show(template)
  }

  closeBuyCreditPopup(){
    this.modalRef4.hide()
    this.buyCreditForm.reset();
  }

  buyCredits(){
    this.modalRef4.hide()
    let data = {
      amount: this.calculateBuyCredit,
      creditCount:this.buyCreditValue
    }


    this.studentService.getKeys().subscribe(response =>{
        this.stripe = Stripe(response['key']); 
        this.studentService.createSession(data).subscribe(response=>{

          this.stripe.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: response['session']
          }).then((result: any) => {
            this.toaster.success('Success Payment Done')
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
          }).err((err:any)=>{
            this.toaster.error('Error Payment Not Done')

          });


        })
    })

  }

  checkTransationStatus(id){
    this.studentService.checkTransationStatus(id).subscribe(data =>{
      if(data['status'] == 200){
        this.toaster.success('Success',data['message'])
      }else{
        this.toaster.error('Error',data['message'])

      }
    })
  }

  calculateCreditCost(){
        let payload = {
      credit:this.creditValue
    }
    this.studentService.calculateCredit(payload).subscribe(data =>{
      this.calculateCredit = data['data']

    })
  }

  emptyValue(template: TemplateRef<any>){
    this.calculateCredit = 0
    this.modalRef3 = this.modalService1.show(template)
  }

  closeSendRequest(){
    this.modalRef3.hide();
    this.requestCreditForm.reset();
  }

  sendCreditRequest(template: TemplateRef<any>){
    // let payload = {
    //   credit:this.creditValue
    // }
    if(this.requestCreditForm.value.credit == null){
      return this.toaster.error('Error', 'Please select the credits')
    }    
    this.modalRef3.hide();
    this.modalRef2 = this.modalService1.show(template)


  }

  senCredit(){


    this.studentService.sendCreditRequest(this.requestCreditForm.value).subscribe(data=>{
      if(data['status'] == 200){
        this.toaster.success('Success',data['message'])
        this.creditRequestList();
        this.memeberShipData();
        this.modalRef2.hide();
        this.requestCreditForm.reset();
        this. memeberShipData();
      }
      else{
        this.toaster.error('Error',data['message'])
      }
    },
    err=>{
      this.toaster.error('Error',err.error.message)
    }
    )

  }

  cancel(){
    this.requestCreditForm.reset();
    this.modalRef2.hide();

  }
}
