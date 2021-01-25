import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { AuthService } from '../../../../lib/services/auth.service'
import { StudentService } from '../../../../lib/services/student.service'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-change-plan',
  templateUrl: './change-plan.component.html',
  styleUrls: ['./change-plan.component.scss']
})
export class ChangePlanComponent implements OnInit {

  public userData :any;
  public membershipValue:any;
  public membershipDataList : any;
  public membershipFirstElement : any;
  // public studentValue ='100'
  // public creditValue='3'
  public noOfStudent :any;
  public noOfCredit:any;
  public membershipPrize:any;
  public numOfStudents :any;
  public creditAmount :any;
  public totalAmount : any;
  public discount : any;
  public statusForProceed : any;
  public totalData : any;
  public cardToken :any;
  public cardArray :any = []
  quickShowAnalytics:boolean;
  public addCardForm : FormGroup;
  quickShowStudent:boolean;
  quickShowMembership:boolean;
  logoutModal: BsModalRef;
  cardModal: BsModalRef;
  public visa = false ;
  public masterCard = false ;
  public americanExpress = false ;
  public discover = false ;
  public dinerClub = false ;
  public dcb = false ;
  public dropdownData :any;
  public subTotal :any;
  public VAT :any;
  public cardId : any;
  public cardListing : any;
  public cardType : any;

  @ViewChild('logoutPopup', { static: false }) logoutPopup: ElementRef;
  @ViewChild('cardPopup', { static: false }) cardPopup: ElementRef;

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

  constructor(private authService : AuthService ,
    private  studentService :StudentService,
    private toasterService : ToastrService,
    private _fb: FormBuilder,
    private modalService: BsModalService,
    private router : Router
    ) {
      this.addCardForm = this._fb.group({
        name: [null, [Validators.required]],
        number: [null, [Validators.required]],
        cvc: [null, [Validators.required]],
        expMonth: [null, [Validators.required]],
        expYear: [null, [Validators.required]],
      })
     }

  ngOnInit() {
    this.membershipListData();
    this.educatorStudentDropdown();
    this.currentPlan();
    this.changeStudent('100')
    this.changeCredit('3')

    
  }
  currentPlan(){
    this.studentService.getCurrentmembership().subscribe(data=>{
      this.userData = data['data']
      this.authService.currentCount(this.userData)
    })
  }

  membershipListData(){
    this.authService.membershipListData().subscribe(data =>{
      this.membershipDataList = data['data']
      this.membershipFirstElement = this.membershipDataList[0]
      this.changeMembership(this.membershipFirstElement)
    })
  }

  membershipDataChange(){
    this.authService.membershipListData().subscribe(data =>{
      this.membershipDataList = data['data']
      // this.membershipFirstElement = this.membershipDataList[0]
      // this.changeMembership(this.membershipFirstElement)
    })
  }

  educatorStudentDropdown(){
    this.authService.educatorStudentDropdown().subscribe(data =>{
      this.dropdownData = data['data']
      let student = this.dropdownData.student[0]
      let credit = this.dropdownData.creditList[0]
      this.changeStudent(student)
      this.changeCredit(credit)
    })
  }

  changeMembership(data){
    this.membershipValue = data
    this.upGradeMembership(this.membershipValue)
    
  }
  
  upGradeMembership(value){

    let payload = {
      membershipType : value
    }
    this.authService.changeMembership(payload).subscribe(data=>{
      this.membershipPrize = Math.round(data['data'])
      this.updateMembership();
    })
  }

  
  changeStudent(data){
    this.noOfStudent = data
    this.numOfStudents = (data - 50)*2
    this.updateMembership();

  }
  changeCredit(data){
    this.noOfCredit = data
    let payload = {
      credit: data,
      student : this.noOfStudent
    }

    this.studentService.calculateCreditPrize(payload).subscribe(data =>{
      this.creditAmount = data['amount']
      this.updateMembership();
    })

  }




  // totalSum(){
  //   this.totalAmount = this.membershipPrize + this.numOfStudents + this.creditAmount

  // }

  updateMembership(){
    let payload = {
            membershipType:this.membershipValue,
            credit:this.noOfCredit,
            student:this.noOfStudent
    } 
    this.authService.upgradeMembershipPlan(payload).subscribe(data =>{
      if(data['status'] ==200){
        this.discount = Math.round(data['discount'])
        let tempVat = Math.round(data['vat'])
        this.VAT = tempVat.toFixed(2)
        this.statusForProceed = data['statusForProceed']
        this.subTotal = data['subTotal']
        let grandTotal = Math.round(data['Pay']); 
        let tempTotalData = grandTotal + tempVat
        this.totalData = tempTotalData.toFixed(2)
      }else{
        this.toasterService.error('Error' , data['message'])
      }
    }, err=>{
      this.toasterService.error('Error' , err.err.message)
    })
  }

  changePlan(){

    let newPyload = {
      annualMembershipFee : this.membershipPrize,
      membership:  this.membershipValue,
      student : this.noOfStudent,
      credit : this.noOfCredit,
      creditCost: this.creditAmount,
      discount : this.discount,
      amountPaid : this.totalData,
      vat : this.VAT
    }

    this.studentService.changeMembership(newPyload).subscribe(data=>{
      if(data['status'] == 200){
        this.currentPlan();
        // this.membershipDataChange();
         this.educatorStudentDropdown()
         this.membershipListData();
         this.router.navigateByUrl('/dashboard/educator-billing-credits/membership/current-plan')
        // this.membershipDataList = [];
        this.toasterService.success('Success' , data['message'])
      }else{
        this.toasterService.error('Error' , data['message'])

      }
    }

    )

  }

  membershipCardList(){

    this.cardArray = [] ;
    this.cardId = "" ;
    this.authService.membershipListCard().subscribe(data =>{
      this.cardArray = data['data']['data']
      if(this.cardArray.length){
        document.getElementById('declineModalLabel').click();
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

  closePopup(){
    document.getElementById('closeDeclineeModal').click();
    this.cardType = false
    this.cardId = "" ;
  }

  membershipMakePayment(x){
    if(x){
      let paymentPayload ={
        amount:this.totalData,
        type : "membership billing",
        cardId : this.cardId
      }
      this.authService.membershipMakeCharge(paymentPayload).subscribe(data =>{
        if(data['status'] == 200){
          this.toasterService.success('Success' , 'Payment done')
          document.getElementById('closeDeclineeModal').click();
          // document.getElementById('closeDeclineModalLabel').click();
          this.changePlan()
          // this.updateMembership();
          // this.logoutModal.hide();

        }else{
          this.toasterService.error('Error' , data['message'])
  
        }
  
      },err=>{
        this.toasterService.error('Error', err.error.message)
      })

    }else{
      // this.logoutModal.hide();
      document.getElementById('closeDeclineModalLabel').click();
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
      amount : this.totalData,
      type : "membership billing"
    }
    this.authService.membershipMakeChargeThroughToken(payload).subscribe(data =>{
      if(data['status'] == 200){
        this.toasterService.success('Success', data['message'])
        document.getElementById('closeDoneModal').click();
        this.changePlan()
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
