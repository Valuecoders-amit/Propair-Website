import { Component, OnInit, TemplateRef ,ElementRef,ViewChild } from "@angular/core";
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormControl ,FormBuilder, Validators} from '@angular/forms';
import { StudentService } from '../../../lib/services/student.service'
import { AuthService } from '../../../lib/services/auth.service'
import { ToastrService } from "ngx-toastr";
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-educator-billing',
  templateUrl: './educator-billing.component.html',
  styleUrls: ['./educator-billing.component.scss']
})
export class EducatorBillingComponent implements OnInit {

  joining : any = {'Since Joining' : true, 'last 12 Months' : false , 'Ytd' : false , 'last 90 Days' : false , 'last Month' : false , 'Today' : false , 'custom':false};
  modalRef2 : BsModalRef;
  addDate : FormGroup;
  dateData:any;
  basicMembership : any;
  studentCredits : any;
  totalSpend : any;
  listingData : any;
  userInfo :any;
  selectedVal : string = 'Since Joining';
  typeValue :string ='';
  statusValue:string ='';
  class = false
  invoiceData :any;
  public vat : any;
  public totalData : any;
  public cardArray :any = []
  logoutModal: BsModalRef;
  amountPay : any;
  membershipInfoData : any;
  public addCardForm : FormGroup;
  public visa = false ;
  public masterCard = false ;
  public americanExpress = false ;
  public discover = false ;
  public dinerClub = false ;
  public dcb = false ;
  public showCard = true ;
  public cardToken :any;
  public membershipVat :any;
  public totalMembershipPrice :any;
  public payStatus : any;
  public balance : any;
  public userData : any;
  selectedDat : Date = null;
  todayDate : Date = new Date();
  public cardId : string
  public cardListing : any;
  public cardType = false
  public checked :boolean= false
  public month : any;

  @ViewChild('logoutPopup', { static: false }) logoutPopup: ElementRef;

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
  myDatePickerOptions : IMyDpOptions = {
    sunHighlight: true,
    inline: false,
    editableDateField: false,
    showTodayBtn: false,
    
    disableSince: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
    }

};

myDatePickerOptions2 : IMyDpOptions = {
  sunHighlight: true,
  inline: false,
  editableDateField: false,
  showTodayBtn: false,
  
  disableSince: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate() + 1
  }

};

  constructor(private modalService : BsModalService,
    private studentService:StudentService,
    private authService : AuthService,
    private toasterService: ToastrService,
    private _fb: FormBuilder,)
     {

      this.addCardForm = this._fb.group({
        name: [null, [Validators.required]],
        number: [null, [Validators.required]],
        cvc: [null, [Validators.required]],
        expMonth: [null, [Validators.required]],
        expYear: [null, [Validators.required]],
      })

    this.addDate = new FormGroup({
      
      'startDate': new FormControl(null),
      'endDate': new FormControl(null),
    
  })

   }

  ngOnInit() {

    this.userInfo =this.authService.getUserInfo();
    this.userData = this.authService.getUserInfo()
    this.historyData();
    this.historyDetailsData();
    this.billingList()
    this.amountToPay();
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


  billingList(data?:Date ,startDate?:Date ,endDate?:Date , status?:string, type?:string){
    this.authService.educatorBillingList(data,startDate,endDate,status,type).subscribe(data =>{
      if(data['data']){    
        this.listingData=data['data'],'billing data';
      }else{
        this.toasterService.error('Error' , data['message'])
      }
    },err =>{
      this.toasterService.error('Error' , err.error.message)
    })
  }

  historyData(data?:Date ,startDate?:Date ,endDate?:Date){
    this.studentService.historicalSpend(data,startDate,endDate).subscribe(data=>{
      if(data['status']==200){
        this.basicMembership = data['data'].totalMembershipFee;
        this.studentCredits = data['data'].totalCredit;
        this.totalSpend = data['data'].total

      }
    })
  }

  historyDetailsData(data?:Date ,startDate?:Date ,endDate?:Date){
    this.studentService.historicalSpendDetails(data,startDate,endDate).subscribe(data=>{
    })
  }

  joiningTabs(id:string , temp?:TemplateRef < any >){
    this.selectedVal = id
    for(let i in this.joining){
      if(i == id) this.joining[i] = true;
      else this.joining[i] = false;
      
    }

    let date : Date ;
    var dat = new Date();

    switch(id){

      case 'membership YTD':
      date = this.userInfo.membership.membershipStartingTime;
      break;

      case 'Since Joining':
        this.selectedDat = this.userData.createdAt;
        this.historyData();
        this.billingList()
      return;

      case 'last 12 Months': 
      let oneYear = dat.setFullYear( dat.getFullYear() - 1 );
      date = new Date(oneYear);
      this.selectedDat = date;
      this.historyData(null,date,new Date());
      this.billingList(null,date,new Date(),null,null)
      break;

      case 'ytd':
      date = new Date(dat.getFullYear(), 0, 1);
      this.selectedDat = date;
      this.historyData(null,date,new Date());
      this.billingList(null,date,new Date(),null,null)
      break;

      case 'last 90 Days' :
      let threeMonth =dat.setMonth(dat.getMonth() - 3);
      date = new Date(threeMonth);
      this.selectedDat = date;
      this.historyData(null,date,new Date());
      this.billingList(null,date,new Date(),null,null)
      break;

      case 'last Month':
      let oneMonth =dat.setMonth(dat.getMonth() - 1);
      date = new Date(oneMonth);
      this.selectedDat = date;
      this.historyData(null,date,new Date());
      this.billingList(null,date,new Date(),null,null)
      break;

      case 'Today':
      date = new Date();
      this.historyData(date,null,null);
      this.billingList(date,null,null,null,null)
      break;

      case 'custom':
        this.modalRef2 = this.modalService.show(temp);
      return;
    }
      this.dateData = date
    // this.historyData(null,dat,this.dateData);
    // this.billingList(this.dateData,null,null,null,null)
  
  }
  onDateChanged(event) {

    let copy = JSON.parse(JSON.stringify(this.myDatePickerOptions2));
    copy.disableUntil = event.date;
    this.myDatePickerOptions2 = copy;

}

status(value){
  if(value == 'all'){
    this.billingList()
  }
  else if(value == 'membership' || value == 'Credit Billing'){
    this.typeValue = value
    this.billingList(null,null,null,null,this.typeValue)

  }else{
    this.statusValue = value
    this.billingList(null,null,null,this.statusValue,null)
  }
}

onApply(){

    let startDate=this.addDate.value.startDate.jsdate;
    let endDate = this.addDate.value.endDate.jsdate
    this.modalRef2.hide();
    this.addDate.reset();
    this.historyData( null, startDate , endDate );
    this.billingList( null, startDate , endDate )
}

addPaymentNewCard(){
  this.showCard = false
  this.cardType = false
  // if(this.cardId){
  // }
}
backButton(){
  this.showCard = true
}

joiningDropdown(value){

  if(value == 'Since'){
    this.historyDetailsData();
  }
  else if(value == '1y'){
    
  }
}


memebrshipPdf(id){

  let payload ={
    id : id
  }
  this.authService.membershipInvoice(payload).subscribe(data =>{
    if(data['status'] == 200){
      this.downloadPdf(data['data'] , 'membership_Invoice')
    }
  })

}


creditPdf(id){

  let payload ={
    id : id
  }
  this.authService.crediitInvoice(payload).subscribe(data =>{
    if(data['status'] == 200){
      this.downloadPdf(data['data'] , 'credit_Invoice')
    }
  })
}

downloadPdf(pdfUrl: string, pdfName: string) {
  // const pdfUrl = './assets/sample.pdf';
  // const pdfName = 'your_pdf_file';
  FileSaver.saveAs(pdfUrl, pdfName);
}

monthlyExpanse(id ,data){


  if(data.type == 'Credit Billing'){
    this.authService.monthlyExpanse(id).subscribe(data =>{
      if(data['status']==200){
        this.invoiceData = data['data']
          this.vat =  Math.round(20 / 100 * this.invoiceData.totalExpanse)
          this.totalData = this.invoiceData.totalExpanse + this.vat
        let self = this
        setTimeout(function () {
          self.exportAsPDF();      
       }, 2000);
      }else{
        this.toasterService.error('Error' , data['message'])
      }
    },err =>{
      this.toasterService.error('Error', err.error.message)
    })

  }else if(data.type == 'membership'){
    this.authService.educatorMembershipInfo(data.walletId).subscribe(data =>{
      if(data['status'] == 200){
        this.membershipInfoData = data['data']
        this.membershipVat = Math.round(20 / 100 * this.membershipInfoData.totalFee)
        this.totalMembershipPrice = this.membershipInfoData.totalFee + this.membershipVat
        let self = this
        setTimeout(function () {
          self.ExportAsPDF();      
       }, 2000);    
      }else{  
        this.toasterService.error('Error' , data['message'])
      }
    },err=>{
      this.toasterService.error('Error', err.error.message)
    })
  }
  else if(data.type == 'membership Purchase'){
      // this.toasterService.warning('Invoice can not be genrate for membership purchase')
      this.authService.educatorMembershipInfo(data.walletId).subscribe(data =>{
        if(data['status'] == 200){
          this.membershipInfoData = data['data']
          this.membershipVat = Math.round(20 / 100 * this.membershipInfoData.totalAmount)
          this.totalMembershipPrice = this.membershipInfoData.totalAmount + this.membershipVat
          let self = this
          setTimeout(function () {
            self.ExportAsPDFS();      
         }, 2000);    
        }else{  
          this.toasterService.error('Error' , data['message'])
        }
      },err=>{
        this.toasterService.error('Error', err.error.message)
      })
  }

}

exportAsPDF(){

  this.class = true
  var data = document.getElementById('MyDIv'); 
  data.style.display = 'block'
  html2canvas(data).then(canvas => { 
    // Few necessary setting options  
    var imgWidth = 208;   
    var pageHeight = 295;    
    var imgHeight = canvas.height * imgWidth / canvas.width;  
    var heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    var position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight) 
    pdf.save('MYPdf.pdf'); // Generated PDF   
    this.class = false
  });  
  data.style.display= 'none'

}

ExportAsPDF(){

  this.class = true
  var data = document.getElementById('MyNewDIv'); 
  data.style.display = 'block'
  html2canvas(data).then(canvas => { 
    // Few necessary setting options  
    var imgWidth = 208;   
    var pageHeight = 295;    
    var imgHeight = canvas.height * imgWidth / canvas.width;  
    var heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    var position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight) 
    pdf.save('MYPdf.pdf'); // Generated PDF   
    this.class = false
  });  
  data.style.display= 'none'

}

ExportAsPDFS(){

  this.class = true
  var data = document.getElementById('MyMembershipDIv'); 
  data.style.display = 'block'
  html2canvas(data).then(canvas => { 
    // Few necessary setting options  
    var imgWidth = 208;   
    var pageHeight = 295;    
    var imgHeight = canvas.height * imgWidth / canvas.width;  
    var heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    var position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight) 
    pdf.save('MYPdf.pdf'); // Generated PDF   
    this.class = false
  });  
  data.style.display= 'none'

}
amountToPay(){
  this.authService.amountToPay().subscribe(data =>{
    this.amountPay = data['data']['totalExpanse']
    this.payStatus = data['data']['payStatus']
  })
}



membershipCardList(){

  this.cardArray = [] ;
  this.cardId = "" ;
  this.authService.membershipListCard().subscribe(data =>{
    this.cardArray = data['data']['data']
    if(this.cardArray.length){
      document.getElementById('openDeclineeModal').click();
      // this.membershipMakePayment();
      // this.logoutModal = this.modalService.show(this.logoutPopup);
      
    }else{
      document.getElementById('openDoneModal').click();
      // this.toasterService.error('Error' , 'Please add your card')
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

radioButton(value){
}

closePopup(){
  document.getElementById('closeDeclineeModal').click();
  this.cardType = false
  this.cardId = "" ;
}

  membershipMakePayment(x){
  if(x){
    let paymentPayload ={
      amount:this.amountPay,
      type:"credit Billing",
      cardId: this.cardId
    }
    this.authService.membershipMakeCharge(paymentPayload).subscribe(data =>{
      if(data['status'] == 200){
        this.toasterService.success('Success' , 'Payment done')
        document.getElementById('closeDeclineeModal').click();
        this.amountIsPaid();
        this.billingList();
        this.balanceDue();
        this.amountToPay();
        // this.changePlan()

      }else{
        this.toasterService.error('Error' , data['message'])

      }

    },err=>{
      this.toasterService.error('Error', err.error.message)
    })
  }else{
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
  
  
  let payload ={
    token: token,
    amount : this.amountPay,
    type:"credit Billing"
  }
  this.authService.membershipMakeChargeThroughToken(payload).subscribe(data =>{
    if(data['status'] == 200){
      this.toasterService.success('Success', data['message'])
      document.getElementById('closeDoneModal').click();
      // this.changePlan()
      this.amountIsPaid();
      this.billingList();
      this.balanceDue();
      this.amountToPay();
      this.addCardForm.reset();
    }else{
      this.toasterService.error('Error', data['message'])
    }
  },err=>{
    this.toasterService.error('Error',err.error.message);
  })
}

crossButton(){
  this.addCardForm.reset();
}

// paymnet done API

amountIsPaid(){
  this.authService.amountIsPaid().subscribe(data =>{
  })
}

addNewCard(){
  document.getElementById('openDoneModal').click();
}



  balanceDue(){
  this.authService.educatorBalanceDue().subscribe(data =>{
    this.balance = data['data']
    this.authService.balanceCount( this.balance)
  })
}


}
