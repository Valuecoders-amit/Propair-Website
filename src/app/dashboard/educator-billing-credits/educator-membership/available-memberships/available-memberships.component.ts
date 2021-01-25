import { Component, OnInit, TemplateRef ,ElementRef,ViewChild } from '@angular/core';
import { Options } from "ng5-slider";
import { StudentService } from '../../../../lib/services/student.service'
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl ,FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../../../lib/services/auth.service'
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-available-memberships',
  templateUrl: './available-memberships.component.html',
  styleUrls: ['./available-memberships.component.scss']
})
export class AvailableMembershipsComponent implements OnInit {

  student: number = 100;
  vatBasic : any;
  vatPlus : any;
  VatPremium :any;
  basePrizeBasic:any;
  basePrizePlus:any;
  basePrizePremium:any;
  creditPerStudentBasic:any;
  creditPerStudentPlus:any;
  creditPerStudentPremium:any;
  totalBasicPrize:any;
  totalPremiumPrize:any;
  totalPlusPrize:any;
  classesAllowedBasic:any;
  classesAllowedPlus:any;
  classesAllowedPremium:any;
  dashboardAllowedBasic:any;
  dashboardAllowedPlus:any;
  dashboardAllowedPremium:any;
  privateMessageBasic:any;
  privateMessagePlus:any;
  privateMessagePremium:any;
  selectedStudent:any;
  studentCost:any;
  selectedCredit:any;
  sliderCreditData:any;
  sliderStudentData:any;
  quickShow:boolean;
  quickShowAnalytics:boolean;
  quickStudentShow:boolean;
  quickShowPrivate:boolean;
  data:any;
  credit: number = 0;
  public addCardForm : FormGroup;
  public cardArray :any = []
  logoutModal: BsModalRef;
  public payload : any;
  public cardToken :any;
  public userInfo : any;
  public showMembership = false
  public visa = false ;
  public masterCard = false ;
  public americanExpress = false ;
  public discover = false ;
  public dinerClub = false ;
  public dcb = false ;
  public cardId : any;
  public cardListing : any;
  public cardType : any;
  public userData:any;
  public finalBaseValue:any;
  public finalPlusValue:any;
  public finalPremiumValue:any;

  @ViewChild('logoutPopup', { static: false }) logoutPopup: ElementRef;
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

  public dataMembership:any;
  public billingData :any;
  
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

  constructor( private studentService : StudentService,
    private toasterService: ToastrService,
    private _fb: FormBuilder,
    private authService : AuthService,
    private modalService : BsModalService,) 
    {
      this.addCardForm = this._fb.group({
        name: [null, [Validators.required]],
        number: [null, [Validators.required]],
        cvc: [null, [Validators.required]],
        expMonth: [null, [Validators.required]],
        expYear: [null, [Validators.required]],
      })
     }

  ngOnInit() {
    this.currentPlan();
    // this.userInfo =this.authService.getUserInfo()
    // let membershipEndTime = new Date(this.userInfo.membership.membershipEndingTime).getTime()
    // let newDate =  new Date().getTime()
    // if(newDate > membershipEndTime ){
    //   this.showMembership = true
    // }else if(newDate < membershipEndTime){
    //   this.showMembership = false
    // }

    this.sliderData()
    if(this.studentService.getSliderData()){
      this.data = this.studentService.getSliderData()
      this.basePrizeBasic = this.data["basePrizeBasic"];
      this.basePrizePlus = this.data["basePrizePlus"];
      this.basePrizePremium = this.data["basePrizePremium"];
      this.creditPerStudentBasic = this.data["creditPerStudentBasic"];
      this.creditPerStudentPlus = this.data["creditPerStudentPlus"];
      this.creditPerStudentPremium = this.data["creditPerStudentPremium"];
      this.totalBasicPrize =  this.data["basic"];
      this.totalPlusPrize =  this.data["plus"];
      this.totalPremiumPrize = this.data["premium"];
      this.classesAllowedBasic = this.data["classesAllowedBasic"]
      this.classesAllowedPlus = this.data["classesAllowedPlus"]
      this.classesAllowedPremium = this.data["classesAllowedPremium"]
      this.dashboardAllowedBasic = this.data["dashboardAllowedBasic"]
      this.dashboardAllowedPlus = this.data["dashboardAllowedPlus"]
      this.dashboardAllowedPremium = this.data["dashboardAllowedPremium"]
      this.privateMessageBasic = this.data["privateMessageBasic"]
      this.privateMessagePlus = this.data["privateMessagePlus"]
      this.privateMessagePremium = this.data["privateMessagePremium"]
      this.selectedStudent = this.data["selectedStudent"]
      this.selectedCredit = this.data["selectedCredit"]
      this.studentCost = this.data["studentCost"]
      this.vatBasic = this.data["vatBasic"]
      this.VatPremium = this.data["VatPremium"]
      this.vatPlus = this.data["vatPlus"]
      this.finalBaseValue = this.totalBasicPrize + this.vatBasic
      this.finalPlusValue = this.totalPlusPrize + this.vatPlus
      this.finalPremiumValue = this.totalBasicPrize + this.VatPremium
    }else{      
    }
    
    
  }


  currentPlan(){
    this.studentService.getCurrentmembership().subscribe(data=>{
      this.userData = data['data']
         let membershipEndTime = new Date(this.userData.membershipEndingTime).getTime()
         let newDate =  new Date().getTime()
        if(newDate > membershipEndTime ){
          this.showMembership = true
        }else if(newDate < membershipEndTime){
          this.showMembership = false
    }
    })
  }
  // membershipList() {
  //   this.studentService.membershipList().subscribe(data => {
  //     this.dataMembership = data["dataMembership"];
  //   });
  // }

  sliderData(){

    this.studentService.sliderData.subscribe(data =>{
      
      this.basePrizeBasic = data["basePrizeBasic"];
      this.basePrizePlus = data["basePrizePlus"];
      this.basePrizePremium = data["basePrizePremium"];
      this.creditPerStudentBasic = data["creditPerStudentBasic"];
      this.creditPerStudentPlus = data["creditPerStudentPlus"];
      this.creditPerStudentPremium = data["creditPerStudentPremium"];
      this.totalBasicPrize =  data["basic"];
      this.totalPlusPrize =  data["plus"];
      this.totalPremiumPrize = data["premium"];
      this.classesAllowedBasic =data["classesAllowedBasic"]
      this.classesAllowedPlus = data["classesAllowedPlus"]
      this.classesAllowedPremium = data["classesAllowedPremium"]
      this.dashboardAllowedBasic =data["dashboardAllowedBasic"]
      this.dashboardAllowedPlus = data["dashboardAllowedPlus"]
      this.dashboardAllowedPremium = data["dashboardAllowedPremium"]
      this.privateMessageBasic = data["privateMessageBasic"]
      this.privateMessagePlus = data["privateMessagePlus"]
      this.privateMessagePremium = data["privateMessagePremium"]
      this.selectedStudent = data["selectedStudent"]
      this.selectedCredit = data["selectedCredit"]
      this.studentCost = data["studentCost"]
      this.vatBasic = data["vatBasic"]
      this.vatPlus = data["vatPlus"]
      this.VatPremium = data["VatPremium"]
      this.finalBaseValue = this.totalBasicPrize + this.vatBasic
      this.finalPlusValue = this.totalPlusPrize + this.vatPlus
      this.finalPremiumValue = this.totalBasicPrize + this.VatPremium
    },
    error => {
      this.toasterService.error("error", "Students can not be Zero ");
    }
    )
  }

  studentSliderData(){
    this.studentService.studentSliderData.subscribe(data =>{
      this.sliderCreditData = data['credit']
      this.sliderStudentData = data['students']
    })
  }

  
  studentCountChange(event) {
    let data = {
      students: this.student,
      credit: this.credit
    };
    this.studentService.membershipPrize(data).subscribe(
      data => {
        this.billingData = data["data"];
        this.dataMembership.annualMembership.basic = data["data"].basic;
        this.dataMembership.annualMembership.plus = data["data"].plus;
        this.dataMembership.annualMembership.premium = data["data"].premium;
        this.dataMembership.totalStudent.basic = data["data"].studentBasic;
        this.dataMembership.totalStudent.plus = data["data"].studentPlus;
        this.dataMembership.totalStudent.premium = data["data"].studentPremium;
        this.dataMembership.annualMembership.basicPerMonth =
          data["data"].basicPerMonth;
        this.dataMembership.annualMembership.plusPerMonth =
          data["data"].plusPerMonth;
        this.dataMembership.annualMembership.permiumPerMonth =
          data["data"].premiumPerMonth;
      },
      error => {
        this.toasterService.error("error", "Students can not be Zero ");
      }
    );
  }

  membershipCardList(value){

    this.cardArray = [] ;
    this.cardId = "" ;

    if(value == '1'){
      this.payload = {
      annualMembershipFee:this.basePrizeBasic,
      membership:'basic',
      student : this.selectedStudent,
      credit : this.selectedCredit,
      totalAmount : this.totalBasicPrize,
      creditCost: this.creditPerStudentBasic
    }
    }else if(value == '2'){
      this.payload = {
      annualMembershipFee:this.basePrizePlus,
      membership:'plus',
      student : this.selectedStudent,
      credit : this.selectedCredit,
      totalAmount : this.totalPlusPrize,
      creditCost:this.creditPerStudentPlus
    }

    }else if(value == '3'){
      this.payload = {
      annualMembershipFee:this.basePrizePremium,
      membership:'premium',
      student : this.selectedStudent,
      credit : this.selectedCredit,
      totalAmount : this.totalPremiumPrize,
      creditCost:this.creditPerStudentPremium
    }

   }

    this.authService.membershipListCard().subscribe(data =>{
      this.cardArray = data['data']['data']
      if(this.cardArray.length){
        document.getElementById('openDeclineeModal').click();
        // this.membershipMakePayment();
        // this.logoutModal = this.modalService.show(this.logoutPopup);
        
      }else{
        document.getElementById('openDoneModal').click();
        // this.toasterService.error('Error' , 'Please add card')
      }
      
    })

  
  }

  filterYear(data){

    this.cardId = data
    if(this.cardId){
      this.cardType = true
    }
    let payload = {
      cardId : this.cardId
    }
    this.authService.membershipCardDetail(payload).subscribe(data =>{
      if(data['status']==200){
        let monthType
        this.cardListing = data['data']
        if(this.cardListing.exp_month == 1){
             monthType = "January"
        }
        if(this.cardListing.exp_month == 2){
          monthType = "February"
     }
        if(this.cardListing.exp_month == 3){
          monthType = "March"
        }
      if(this.cardListing.exp_month == 4){
           monthType = "April"
        }
      if(this.cardListing.exp_month == 5){
           monthType = "May"
        }
      if(this.cardListing.exp_month == 6){
          monthType = "June"
        }
      if(this.cardListing.exp_month == 7){
          monthType = "July"
        }
      if(this.cardListing.exp_month == 8){
          monthType = "August"
        }
      if(this.cardListing.exp_month == 9){
         monthType = "September"
        }
      if(this.cardListing.exp_month == 10){
         monthType = "October"
        }
        if(this.cardListing.exp_month == 11){
          monthType = "November"
         }
         if(this.cardListing.exp_month == 11){
          monthType = "December"
         }
        this.addCardForm.patchValue({
          name: this.cardListing.name,
          number: "***********" + this.cardListing.last4,
          expMonth: monthType,
          expYear: this.cardListing.exp_year,
          cvc: "***"
        })
        // this.checked = true
        // this.radioButton(this.cardListing)
      }
    })
  
  }

  closePopup(){
    document.getElementById('closeDeclineeModal').click();
    this.cardType = false
    this.cardId = "" ;
  }


  
membershipMakePayment(x){
  if(x){
    
    let paymentPayload ={
      amount:this.payload.totalAmount,
      type:"purchase membership",
      cardId : this.cardId
    }

    this.authService.membershipMakeCharge(paymentPayload).subscribe(data =>{
      if(data['status'] == 200){
        this.toasterService.success('Success' , 'Payment done')
        this.purchaseMembership();
        document.getElementById('closeDeclineeModal').click();
        // this.logoutModal.hide();

      }else{
        this.toasterService.error('Error' , data['message'])

      }

    },err=>{
      this.toasterService.error('Error', err.error.message)
    })

  }else{
    // this.logoutModal.hide();
    document.getElementById('closeDeclineeModal').click();

  }
}

addCardSubmit(){

  this.authService.membershipToken(this.addCardForm.value).subscribe(data =>{
    if(data['status']== 200){
      this.cardToken = data['token']['id']
      this.membershipMakeCharge(this.cardToken)
      
    }else{
      this.toasterService.error('Error',data['message'])
    }
  },err=>{
    this.toasterService.error('Error','Card information is incorrect');
})

}

membershipMakeCharge(token){
  let payloadData ={
    token: token,
    amount : this.payload.totalAmount,
    type : "purchase membership"
  }

  this.authService.membershipMakeChargeThroughToken(payloadData).subscribe(data =>{
    if(data['status'] == 200){
      this.toasterService.success('Success', data['message'])
      document.getElementById('closeDoneModal').click();
      this.purchaseMembership();
      this.addCardForm.reset();
    }else{
      this.toasterService.error('Error', data['message'])
    }
  },err=>{
    this.toasterService.error('Error',err.error.message);
  })
}


  purchaseMembership(){
    this.authService.purchaseMembership(this.payload).subscribe(data=>{
      if(data['status'] == 200){
        this.toasterService.success('Success' , data['message'])
        this.showMembership = false
        this.authService.showMembership.next(this.showMembership)
      }else{
        this.toasterService.error('Error' , data['message'])

      }
    },err =>{
      this.toasterService.error('Error' , err.error.message)
    })
  }

  submit(){
    this.showMembership = false
    this.authService.showMembership.next(this.showMembership)

  }

  crossButton(){
    this.addCardForm.reset();
  }

  enter(){

    if(this.addCardForm.value.number == '42'){

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

}
