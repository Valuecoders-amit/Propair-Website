import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
declare var $;
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import * as Highcharts from "highcharts";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { ToastrService } from "ngx-toastr";
import { StudentService } from "../../../lib/services/student.service";
import { IStudent, IStudentData } from "src/app/lib/interfaces/Istudent";
import { Router } from "@angular/router";
import { getyear } from "../../../lib/utility/utility";
import { AuthService } from "../../../lib/services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";
import { ExportToCsv } from "export-to-csv";
import { LoginComponent } from "src/app/main/login/login.component";
import * as sortBy from "sort-by";
import { Options } from "ng5-slider";
import { stripGeneratedFileSuffix } from "@angular/compiler/src/aot/util";
import {HttpErrorResponse} from '@angular/common/http'
import stripeCardValidator from 'stripe-card-validator'

@Component({
  selector: 'app-educator-payment-method',
  templateUrl: './educator-payment-method.component.html',
  styleUrls: ['./educator-payment-method.component.scss']
})
export class EducatorPaymentMethodComponent implements OnInit {

  student: number = 100;
  credit: number = 0;
  options: Options = {
    floor: 0,
    ceil: 1000,
    step: 100,
    // showTicks: true,
    // showTicksValues: true,
    showSelectionBar: true
  };

  options2: Options = {
    floor: 0,
    ceil: 10,
    step: 1,
    // showTicks: true,
    // showTicksValues: true,
    showSelectionBar: true
  };
  public duration: any;
  public credits: any = [];
  public date: any;
  selectedAll: any;
  public checked :boolean= false
  public numberOfStudents: any;
  public numberOfCredits: any;
  public billingData: any;
  public Basic: any = [];
  public premium: any;
  public plus: any;
  public dataMembership: any;
  public totalAmmount: any;
  public count: any;
  public creditListCount: any;
  public checkoutForm: FormGroup;
  public addCardForm : FormGroup;
  public newCardtoken : any;
  public cardListing:any;
  public changeLable:boolean = false
  public checkCustomer:any
  public creditCard = '4000056655665556';
  public cardType = stripeCardValidator(this.creditCard); // 'visa'
  public isValid = stripeCardValidator.isVisa(this.creditCard);
  public visa = false ;
  public masterCard = false ;
  public americanExpress = false ;
  public discover = false ;
  public dinerClub = false ;
  public dcb = false ;


  /* Static data to add month name in paynow modal implemented for stripe payment */
  public monthArray:any =  [
    {
      month: "January",
      value: "01"
    },
    {
      month: "February",
      value: "02"
    },
    {
      month: "March",
      value: "03"
    },
    {
      month: "April",
      value: "04"
    },
    {
      month: "May",
      value: "05"
    },
    {
      month: "June",
      value: "06"
    },
    {
      month: "July",
      value: "07"
    },
    {
      month: "August",
      value: "08"
    },
    {
      month: "Septmember",
      value: "09"
    },
    {
      month: "October",
      value: "10"
    },
    {
      month: "November",
      value: "11"
    },
    {
      month: "December",
      value: "12"
    }
  ];
/* Static data to add year  in paynow modal implemented for stripe payment */
  public yearArray = [
    "2020",
    "2021 ",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030"
  ];
  public stripe: any;
  public stripeKey: any;
  public payload: any;

  public isFreez: any;
  public studentValue: any;
  public hideCheckbox: any = false;
  public openTable: any = false;
  public seePlans: any = true;
  public customerSavedCards : any
  public payThroughCard:boolean = false
  public customerDetails : any

  studentsData: IStudentData[] = [];
  approveModal: BsModalRef;
  declineModal: BsModalRef;
  ExampleModal: BsModalRef;

  @ViewChild("approvePopup", { static: false }) approvePopup: ElementRef;
  @ViewChild("declinePopup", { static: false }) declinePopup: ElementRef;
  @ViewChild("exampleModal", { static: false }) exampleModal: ElementRef;
  @ViewChild("paynow", { static: false }) paynow; /* reference element to close paynow modal */
  @ViewChild('paymentId',{static: false}) paymentButton;
  

  constructor(
    private _fb: FormBuilder,
    private modalService: BsModalService,
    private studentService: StudentService,
    private toasterService: ToastrService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
  ) {
    this.checkoutForm = this._fb.group({
      name: [""],
      number: [""],
      cvc: [""],
      exp_month: [""],
      exp_year: [""]
    });

    this.addCardForm = this._fb.group({
      name:new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      number: new FormControl('', [Validators.required]),
      cvc: new FormControl('', [Validators.required]),
      expMonth: new FormControl('', [Validators.required]),
      expYear: new FormControl('', [Validators.required]),
    })
   }

   get f() {
    return this.checkoutForm.controls;
  }

  /* Function to make a Stripe Payment */
  async onSubmit() {
    if(this.changeLable === false){
  
    await this.studentService
      .createToken(this.checkoutForm.value)
      .subscribe(data => {
        this.payload = {
          token: data.id,
          amount: this.totalAmmount,
          name: this.checkoutForm.value.name
        };
        this.studentService.createCharge(this.payload).subscribe(response => {
          if (response.status === "succeeded") {
            this.paynow.nativeElement.click();
             this.checkoutForm.reset()
            this.toasterService.success("payment successful");

          }
        });
      });
    
    }
    
      else{
        await this.studentService
        .createToken(this.checkoutForm.value)
        .subscribe(data => {
       this.createCard(data.id)
  })
}
  }

  /* Method to create  customer*/
 
  createCustomerStripe(){
    var query = JSON.parse(localStorage.getItem("userInfo"))
    var userId = query._id
    
    
    var payload={
      user_Id : userId
    }
    this.studentService.createCustomer(payload).subscribe(data=>{
    
   this.listCards()
      
    },(err:HttpErrorResponse)=>{
    
     this.checkCustomer = err.error.text
     
    
      
      
    })
  }

  /* METHOD TO CREATE CARD */
 createCard(token) {
    var query = JSON.parse(localStorage.getItem("userInfo"))
    var userId = query._id
    
    var payload={
      user_Id : userId,
      token:token
    }
    this.studentService.createCard(payload).subscribe(data=>{
    this.paynow.nativeElement.click();
    this.toasterService.success("Card added successfully");
    this.listCards()
    })
  }
  listCards(){
    var query = JSON.parse(localStorage.getItem("userInfo"))
    var userId = query._id   
    var payload={
      user_Id : userId
    }
    this.studentService.listCards(payload).subscribe(data=>{
      this.customerSavedCards = data.data
    },(err:HttpErrorResponse)=>{
      
    })
  }
  payExisitingCard(data,customer){
    if(data === "paynow"){
      this.changeLable = false
      this.payThroughCard = true
       this.customerDetails = customer
      let month = this.monthArray.find(v=>parseInt(v.value) === customer.exp_month)    
      this.changeLable = false
      this.checkoutForm.controls["name"].setValue(customer.name)
      this.checkoutForm.controls["number"].setValue('************'+customer.last4) 
      this.checkoutForm.controls["exp_month"].setValue(month.value)
      this.checkoutForm.controls["exp_year"].setValue(customer.exp_year)  
      this.checkoutForm.controls["cvc"].setValue('')   
      
    
    }
    else{
      this.changeLable = true
    }
    

  }
  addNewCard(data){
     
    this.paymentButton.nativeElement.click()    
      if(data === "paynow"){
        this.changeLable = false
      }
      else{
        this.changeLable = true
  }


  }

 async cardDetails(data){

    var query = JSON.parse(localStorage.getItem("userInfo"))
    var user_Id = query._id
    var confirm = window.confirm("Are you sure to pay with this card")
    if(confirm === true){
      var payload ={
        token : data.id,
        amount:this.totalAmmount,
        name:"test Recipient",
        customer:data.customer
      }
     await this.studentService.chargeCard(payload).subscribe(data=>{  
       if(data.status === "succeeded"){   
       var transactionDetailsPayload = {
          cardId : data.payment_method,
         chargeId : data.id,
         amountCharged : data.amount/100,
         billingDetails:{
           name:data.billing_details.name
         } ,
         time:data.created,
         customerId:data.customer,
         description:data.description,
         status:data.status,
         userId:user_Id
       }
        this.studentService.transactionDetails(transactionDetailsPayload).subscribe(data=>{
          
  
          
        }) 

       
        
      }
       
       this.paynow.nativeElement.click();
       this.toasterService.success("Payment Successful")
       this.payThroughCard = false
     })
    }
    
  }
  deleteCard(data){

  var result = confirm("Are you sure")
  if(result === true){
    let payload ={
      cardId : data.id,
      customerId : data.customer
  }
    this.studentService.deleteCard(payload).subscribe(data=>{
      this.listCards()
    }) 
  }
  

    
    
  }
  public temp = {
    annual: "Annual Membership",
    totalStudents: "Total no.of Students",
    MessageExchange: "Incl. Message Exchange per Student",
    Prize: "Prize of addtional Message Exchange",
    TeacherDashboard: "Teacher Dashboard:No.of classes",
    teacherAnalytics: "Teacher Dashboard:analytics",
    privateMessage: "Private Message"
  };

  ngOnInit() {

    if (this.isValid) {
    } else {
    }

     this. membershipListCard();
  }


  enter(){

    if(this.addCardForm.value.number == '4'){

      this.visa = true;
      this.masterCard = false;
      this.americanExpress = false;
      this.discover = false;
      this.dinerClub = false ;
      this.dcb = false
    }
    else if(this.addCardForm.value.number == '5'){

      this.masterCard = true;
      this.visa = false;
      this.americanExpress = false;
      this.discover = false;
      this.dinerClub = false ;
      this.dcb = false
    }
    else if(this.addCardForm.value.number == '37'){
      this.americanExpress = true;
      this.masterCard = false;
      this.visa = false;
      this.discover = false;
      this.dinerClub = false ;
      this.dcb = false
    }
    else if(this.addCardForm.value.number == '6'){

      this.discover = true;
      this.americanExpress = false;
      this.masterCard = false;
      this.visa = false;
      this.dinerClub = false ;
      this.dcb = false
    }
    else if(this.addCardForm.value.number == '30'){

      this.dinerClub = true ;
      this.dcb = false
      this.discover = false;
      this.americanExpress = false;
      this.masterCard = false;
      this.visa = false;

    }
    else if(this.addCardForm.value.number == '35'){
      this.dcb = true
      this.discover = false;
      this.dinerClub = false ;
      this.americanExpress = false;
      this.masterCard = false;
      this.visa = false;
    }
    else if(this.addCardForm.value.number == ''){
      this.dcb = false
      this.discover = false;
      this.dinerClub = false ;
      this.americanExpress = false;
      this.masterCard = false;
      this.visa = false;
    }
  }

  addCardSubmit(){

    this.authService.membershipToken(this.addCardForm.value).subscribe(data =>{
      if(data['status']== 200){
        this.newCardtoken = data['token']['id']
        this.membership(this.newCardtoken)
        
      }else{
        this.toasterService.error('Error',data['message'])
      }
    },err=>{
        this.toasterService.error('Error','Card information is incorrect');
    })
  }

  membership(token){
    let payload = {
      token : token
    }
    this.authService.membershipCreateCard(payload).subscribe(data =>{
      if(data['status'] == 200){
        this.addCardForm.reset();
        document.getElementById('openDoneModal').click();
        this.membershipListCard();
        this.toasterService.success('Sucess', data['message'])
      }else{
        this.toasterService.error('Error', data['message'])
      }
    })
  }

  membershipListCard(){

    this.authService.membershipListCard().subscribe(data =>{
      this.cardListing = data['data']['data']
      this.checked = true
    })
  }

  membershipDeleteCard(data){
    
    let payload = {
      cardId : data.id
    }
    this.authService.membershipDeleteCard(payload).subscribe(data =>{
      if(data['status']==200){
        this.membershipListCard();
        this.toasterService.success('Success' , data['message'])

      }else{
        this.toasterService.error('Error' , data['message'])
      }
    })

    }


    crossButton(){
      this.addCardForm.reset();
    }

    radioButton(data){

      let payload = {
        source : data.id
      }
      this.authService.updateCard(payload).subscribe(data =>{
      })
      
    }



}
