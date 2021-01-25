import { Component, OnInit ,TemplateRef} from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentService } from '../../../lib/services/student.service'
import * as moment from 'moment';
import { AuthService } from '../../../lib/services/auth.service'


@Component({
  selector: 'app-student-stats',
  templateUrl: './student-stats.component.html',
  styleUrls: ['./student-stats.component.scss']
})
export class StudentStatsComponent implements OnInit {

  modalRef2 : BsModalRef;
  addDate : FormGroup;
  dashboardData :any;
  userData :any;
  moreData:number;
  todos:Array<any>=[];
  finalTodos : Array<any> = [];
  checkData:boolean=false;
  moreTodo : boolean = false;
  toDoListData =[];
  joining : any = {'Since Joining' : true, 'Last 12 Months' : false , 'Ytd' : false , 'Last 90 Days' : false , 'Last Month' : false , 'Today' : false , 'Custom':false};
  temp =[]
  firstValueOfTime:any;
  secondValueOfTime:any;
  selectedVal : string = 'Since Joining';
  selectedDat : Date = null;
  no_of_days : any ;
  todayDate : Date = new Date();
    
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
  
  constructor(private modalService : BsModalService , private studentService : StudentService,private authService:AuthService) 
  {
    this.addDate = new FormGroup({
      
      'startDate': new FormControl(null),
      'endDate': new FormControl(null),
    
  })
   }

  ngOnInit() {

    this.userData = this.authService.getUserInfo()
    this.studentDasboard();
    this.toDoList();
  }

  toDoList(){
    this.userData=this.authService.getUserInfo();
    this.selectedDat = this.userData.createdAt;
     this.daysCalculation(this.selectedDat);

    this.studentService.toDoList().subscribe(data =>{
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




  studentDasboard(data?:Date ,startDate?:Date ,endDate?:Date){
  this.studentService.studentDashboard(data,startDate,endDate).subscribe(data=>{
    this.dashboardData = data['data']
    let average = this.dashboardData.responceTime 
    let averageResponceTime = average
    this.temp = averageResponceTime.toString().split('.')
    this.firstValueOfTime = this.temp[0]
    this.secondValueOfTime = this.temp[1]
  })
  }

  joiningTabs(id:string , temp?:TemplateRef < any >){
    this.selectedVal = id
    for(let i in this.joining){
      if(i == id) this.joining[i] = true;
      else this.joining[i] = false;
      
    }

    let date : any ;
    var dat = new Date();

    switch(id){
      case 'Since Joining':
        this.selectedDat = this.userData.createdAt;
        this.daysCalculation(this.selectedDat)
        this.studentDasboard();
      return;

      case 'Last 12 Months': 
      let oneYear = dat.setFullYear( dat.getFullYear() - 1 );
      date = new Date(oneYear);
      this.selectedDat = date;
      this.daysCalculation(this.selectedDat)
      this.studentDasboard(null,date,new Date());
      break;

      case 'Ytd':
        date = new Date(dat.getFullYear(), 0, 1);
        this.selectedDat = date;
        this.daysCalculation(this.selectedDat)
        this.studentDasboard(null,date,new Date());
      break;

      case 'Last 90 Days' :
        let threeMonth =dat.setMonth(dat.getMonth() - 3);
        date = new Date(threeMonth);
        this.selectedDat = date;
        this.daysCalculation(this.selectedDat)
        this.studentDasboard(null,date,new Date());
      break;

      case 'Last Month':
        let oneMonth =dat.setMonth(dat.getMonth() - 1);
        date = new Date(oneMonth);
        this.selectedDat = date;
        this.daysCalculation(this.selectedDat)
        this.studentDasboard(null,date,new Date());
      break;

      case 'Today':
        date = new Date().toISOString();
        this.selectedDat = null;
        this.no_of_days = 0;
        this.studentDasboard(date,null,null);
      break;

      case 'Custom':
        this.modalRef2 = this.modalService.show(temp);
      return;
    }

    // this.studentDasboard(date,null,null);
  
  }
  

  onDateChanged(event) { 
    
    let copy = JSON.parse(JSON.stringify(this.myDatePickerOptions2));
    copy.disableUntil = event.date;
    this.myDatePickerOptions2 = copy;

}

onApply(){


    let startDate=this.addDate.value.startDate.jsdate;
    let endDate = this.addDate.value.endDate.jsdate
    this.selectedDat = startDate;
    this.todayDate = endDate;

    this.daysCalculation(this.selectedDat , this.todayDate);
    this.modalRef2.hide();
    this.addDate.reset();
    this.studentDasboard( null, startDate , endDate );
}


}
