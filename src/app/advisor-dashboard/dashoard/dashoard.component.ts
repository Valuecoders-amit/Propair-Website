import { Component, OnInit, TemplateRef } from '@angular/core';
import {AuthService} from '../../lib/services/auth.service';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashoard',
  templateUrl: './dashoard.component.html',
  styleUrls: ['./dashoard.component.scss']
})
export class DashoardComponent implements OnInit {

  socialImpact : any ={};
  milestoneData : any = {};
  mileprogress : number;
  joining : any = {'Since Joining' : true, 'Last 12 Months' : false , 'Ytd' : false , 'Last 90 Days' : false , 'Last Month' : false , 'Today' : false , 'Custom':false};
  socialprogress : Number ;
  todos : Array<any> =[];
  finalTodos : Array<any> =[];
  openRequests : Array<any> = [];
  modalRef2 : BsModalRef;
  modalRef3 : BsModalRef;
  addDate : FormGroup;
  moreTodo : boolean = false;
  userData : any = {};
  selectedVal : string = 'Since Joining';
  selectedDat : Date = null;
  todayDate : Date = new Date();
  no_of_days : any ;
  public userInfo : any;

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

  constructor(private auth : AuthService , private modalService : BsModalService) { }

  ngOnInit() {

    this.userInfo = this.auth.getUserInfo()

    this.addDate = new FormGroup({
      
      'startDate': new FormControl(null),
      'endDate': new FormControl(null),
    
  })

    this.advisorDashboard();
    this.todoList();
    this.openRequestsListing();
  }

  advisorDashboard(date?:Date , start?:Date , end?:Date){

    let overData : Observable<any> ;

    if(date ||  (start && end)){
      overData =this.auth.getMilestone(date , start ,end);
    }
    else {
      overData =this.auth.getMilestone();
    }

    overData.subscribe(data=>{
      this.milestoneData = data['data'];
      const leftVlaue = this.milestoneData.kp;
      const max = this.milestoneData.maxPoint
      const rightValue = Math.floor((leftVlaue/max)*100);
      this.mileprogress = rightValue;
    })
    
  }

  todoList(){
    this.userData=this.auth.getUserInfo();
    this.selectedDat = this.userData.createdAt;
     this.daysCalculation(this.selectedDat);
    this.auth.getTodos().subscribe(data=>{
      this.finalTodos = data['data'];
     this.todos = data['data'].slice(0,2);
     
    },err=>{
    })
  }

  daysCalculation(date : Date , endDate?:Date){
 // To set two dates to two variables 
 let date1 = new Date (date);
 
 let  date2 ;
 if(endDate){
   date2 = new Date (endDate);
 }
 else {
   date2 = new Date();
 }
   
 // To calculate the time difference of two dates 
 const Difference_In_Time = date2.getTime() - date1.getTime(); 
   
 // To calculate the no. of days between two dates 
 const  Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
 this.no_of_days = Math.round(Difference_In_Days);
  }

  openRequestsListing(){
    this.auth.studentmessageRequests().subscribe(data=>{
      this.openRequests = data['data'];

    })
  }


  joiningTabs(id:string , temp?:TemplateRef < any >){
    for(let i in this.joining){
      if(i == id) {this.joining[i] = true;
      this.selectedVal = i;}
      else this.joining[i] = false;
      
    }

    let date : any ;
    var dat = new Date();

    switch(id){
      case 'Since Joining':
        this.selectedDat = this.userData.createdAt;
        this.daysCalculation(this.selectedDat)
        this.advisorDashboard();
      return;

      case 'Last 12 Months': 
      let oneYear = dat.setFullYear( dat.getFullYear() - 1 );
      date = new Date(oneYear);
      this.selectedDat = date;
      this.daysCalculation(this.selectedDat)
      this.filterData(null , date , new Date());
      break;

      case 'Ytd':
      date = new Date(dat.getFullYear(), 0, 1);
      this.selectedDat = date;
      this.daysCalculation(this.selectedDat)
      this.filterData(null , date , new Date());
      break;

      case 'Last 90 Days' :
      let threeMonth =dat.setMonth(dat.getMonth() - 3);
      date = new Date(threeMonth);
      this.selectedDat = date;
      this.daysCalculation(this.selectedDat)
      this.filterData(null , date , new Date());
      break;

      case 'Last Month':
      let oneMonth =dat.setMonth(dat.getMonth() - 1);
      date = new Date(oneMonth);
      this.selectedDat = date;
      this.daysCalculation(this.selectedDat)
      this.filterData(null , date , new Date());
      break;

      case 'Today':
      date = new Date().toISOString();
      this.selectedDat = null;
      this.no_of_days = 0;
      this.filterData(date, null , null);
      break;

      case 'Custom':
        this.modalRef2 = this.modalService.show(temp);
      return;
    }

    // this.filterData(date);
  
  }

  onApply(){
  
      let startDate=this.addDate.value.startDate.jsdate;
      let endDate = this.addDate.value.endDate.jsdate
     
      this.selectedDat = startDate;
      this.todayDate = endDate;

      this.daysCalculation(this.selectedDat , this.todayDate);
  
      this.filterData( null, startDate , endDate );
  }

  filterData(date?: Date , start?:Date , end?:Date) : void {

      this.advisorDashboard(date , start , end);
      if(this.modalRef2){
        this.modalRef2.hide();

      }
      this.addDate.reset();
  
  }


  onDateChanged(event) { 
  let copy = JSON.parse(JSON.stringify(this.myDatePickerOptions2));
  copy.disableUntil = event.date;
  this.myDatePickerOptions2 = copy;

}


// moreTodos(){
//  this.moreTodo = !this.moreTodo;
// //  this.todoList();
//  if(this.moreTodo) this.todos = data['data'];
//  else this.todos = data['data'].slice(0,2);;
// }

}
