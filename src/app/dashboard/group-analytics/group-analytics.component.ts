import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AuthService } from "../../lib/services/auth.service";
import {StudentService } from '../../lib/services/student.service';
import { ToastrService } from "ngx-toastr";
import * as Highcharts from "highcharts";
import { IMyDpOptions } from "mydatepicker";
import { FormGroup, FormControl } from "@angular/forms";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: "app-group-analytics",
  templateUrl: "./group-analytics.component.html",
  styleUrls: ["./group-analytics.component.scss"],
})
export class GroupAnalyticsComponent implements OnInit {
  studentTotal: any = {};
  studentAverage: any = {};
  membershipData : any;
  previousUrl: string;
  variableOptions: Array<any> = [
    { _id: 1, name: "Message Exchanges" },
    { _id: 2, name: "Views" },
    { _id: 3, name: "Upvotes" },
  ];
  yearOptions: Array<any> = [
    { _id: 1, name: "7" },
    { _id: 2, name: "8" },
    { _id: 3, name: "9" },
    { _id: 4, name: "10" },
    { _id: 5, name: "11" },
    { _id: 6, name: "12" },
    { _id: 7, name: "13" },
  ];
  formOptions: Array<any> = [ ];
  joining: any = {
    "Since Joining": true,
    "Last 12 Months": false,
    Ytd: false,
    "Last 90 Days": false,
    "Last Month": false,
    Today: false,
    custom: false,
  };
  joining2: any = {
    "Since Joining": true,
    "Last 12 Months": false,
    Ytd: false,
    "Last 90 Days": false,
    "Last Month": false,
    Today: false,
    custom: false,
  };

  studentType: any = {
    "all student": true,
    "custom": false,
  };

  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalTab: BsModalRef;
  modalTab4: BsModalRef;
  addDate: FormGroup;
  addCohort: FormGroup;
  variable: FormGroup;
  selectedVal: string = "Since Joining";
  selectedDat: Date = null;
  todayDate: Date = new Date();
  no_of_days: any;
  selectedVal2: string = "Since Joining";
  selectedDat2: Date = null;
  todayDate2: Date = new Date();
  no_of_days2: any;
  userData: any = {};
  forTotal: boolean = true;
  checkVal: string = "total";
  filterVal: string = "exchange";
  dataGraph: boolean = true;
  dataId: any = null;
  public customValue :string = ""
  public dateData : any;
  myDatePickerOptions: IMyDpOptions = {
    sunHighlight: true,
    inline: false,
    editableDateField: false,
    showTodayBtn: false,
    disableSince: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    },
  };

  myDatePickerOptions2: IMyDpOptions = {
    sunHighlight: true,
    inline: false,
    editableDateField: false,
    showTodayBtn: false,
    disableSince: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate() + 1,
    },
  };

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: "_id",
    textField: "name",
    enableCheckAll: false,
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 0,
    allowSearchFilter: true,
  };
  dropdownSettings2: IDropdownSettings = {
    singleSelection: false,
    idField: "_id",
    textField: "name",
    enableCheckAll: false,
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 0,
    allowSearchFilter: false,
  };

  constructor(
    public calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private http: AuthService,
    private toastr: ToastrService,
    private router : Router,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private studentService: StudentService,
    
  ) {
    this.variable = new FormGroup({
      type: new FormControl([
        { _id: 1, name: "Message Exchanges" },
        { _id: 2, name: "Views" },
        { _id: 3, name: "Upvotes" },
      ]),
    });
  }

  ngOnInit() {
    // this.currentPlan();
    this.addDate = new FormGroup({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });

    this.addCohort = new FormGroup({
      year: new FormControl(null),
      form: new FormControl(null),
    });

    // this.getGroupAnalytics();
    // this.getStudentMetrices();
    this.cohortSection("all student")
    this.getDates();
    this.getForm();
  }

  getForm(){
    this.studentService.getFormList().subscribe(data =>{
      this.formOptions = data['data']
    })
  }

  currentPlan(){
    this.studentService.getCurrentmembership().subscribe(data=>{
      this.membershipData = data['data']
      if(this.membershipData.dashboardAllowed == true){
        return true
      }else{
        this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.previousUrl = event.url;
        });
      }

    })
  }

  getDates() {
    this.userData = this.http.getUserInfo();
    this.selectedDat = this.userData.createdAt;
    this.selectedDat2 = this.userData.createdAt;
    this.daysCalculation(this.selectedDat, null, 1);
    this.daysCalculation(this.selectedDat2, null, 2);
  }

  daysCalculation(date: Date, endDate?: Date, val?: number) {
    // To set two dates to two variables
    let date1 = new Date(date);
    let date2;

    if (endDate) {
      date2 = new Date(endDate);
    } else {
      date2 = new Date();
    }

    // To calculate the time difference of two dates
    const Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (val == 1) {
      this.no_of_days = Math.round(Difference_In_Days);
    } else {
      this.no_of_days2 = Math.round(Difference_In_Days);
    }
  }

  getGroupAnalytics() {
    this.http.grpAnalytics().subscribe(
      (data) => {
        let dats = data["data"];
        if(data['type'] == 'monthWise'){
          this.dateData = dats.map((el) => {
            return this.datePipe.transform(el._id, "MMM yyyy");
          });

        }else{
          this.dateData = dats.map((el) => {
            return this.datePipe.transform(el._id, "d MMM yyyy");
          });
        }
        let cumulativeData = dats.map((el) => {
          return el.cumlativeCount;
        });

        let countData = dats.map((el) => {
          return el.count;
        });

        // this.chart(countData, cumulativeData, dateData);
        if(data['type'] == 'monthWise'){
          this.chart2(cumulativeData, countData, this.dateData);

        }else{
          this.chart(cumulativeData, countData, this.dateData);
        }

      },
      (err) => {
      }
    );
  }

  getStudentMetrices(payload ?: any) {
    this.http.stdntMetrices(payload).subscribe(
      (data) => {
        this.studentTotal = data["data"];
        this.studentAverage = data["average"];
        // this.cohortSection('all student');
      },
      (err) => {
      }
    );
  }

  chart(yp, ys, data) {
    Highcharts.chart("container", {
      chart: {
        zoomType: "xy",
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      xAxis: [
        {
          categories: data,
          crosshair: true,
        },
      ],
      yAxis: [
        {
          // Primary yAxis
          // categories: ["1", "2", "3", "4", "5", "6", "7"],
          labels: {
            format: "{value}",
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
          title: {
            text: "Cumulative",
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
        },
        {
          // Secondary yAxis
          // categories: ["5", "10", "15", "20", "25", "30", "35"],
          title: {
            // text: "Cumulative",
            text: "Daily",
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          labels: {
            format: "{value} ",
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
      },

      legend: {
        layout: "vertical",
        align: "left",
        x: 120,
        verticalAlign: "top",
        y: 100,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || // theme
          "rgba(255,255,255,0.25)",
      },
      series: [
        {
          name: "Daily",
          showInLegend: false,
          type: "column",
          yAxis: 1,
          data: ys,
          tooltip: {
            // valueSuffix: ' mm'
          },
          color: "#33e2d1",
        },
        {
          name: "Cumulative",
          showInLegend: false,
          type: "spline",
          data: yp,
          tooltip: {
            // valueSuffix: '°C'
          },
          color: "#000000",
        },
      ],
    });
  }

  chart2(yp, ys, data) {
    Highcharts.chart("container", {
      chart: {
        zoomType: "xy",
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      xAxis: [
        {
          categories: data,
          crosshair: true,
        },
      ],
      yAxis: [
        {
          // Primary yAxis
          // categories: ["1", "2", "3", "4", "5", "6", "7"],
          labels: {
            format: "{value}",
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
          title: {
            text: "Cumulative",
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
        },
        {
          // Secondary yAxis
          // categories: ["5", "10", "15", "20", "25", "30", "35"],
          title: {
            // text: "Cumulative",
            text: "Month",
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          labels: {
            format: "{value} ",
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
      },

      legend: {
        layout: "vertical",
        align: "left",
        x: 120,
        verticalAlign: "top",
        y: 100,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || // theme
          "rgba(255,255,255,0.25)",
      },
      series: [
        {
          name: "Month",
          showInLegend: false,
          type: "column",
          yAxis: 1,
          data: ys,
          tooltip: {
            // valueSuffix: ' mm'
          },
          color: "#33e2d1",
        },
        {
          name: "Cumulative",
          showInLegend: false,
          type: "spline",
          data: yp,
          tooltip: {
            // valueSuffix: '°C'
          },
          color: "#000000",
        },
      ],
    });
  }

  joiningTabs(id: string, checkId, temp?: TemplateRef<any>) {
    this.dataId = checkId;
    if (this.dataId == 1) {
      for (let i in this.joining) {
        if (i == id) {
          this.joining[i] = true;
          this.selectedVal = i;
        } else this.joining[i] = false;
      }
    } else {
      for (let i in this.joining2) {
        if (i == id) {
          this.joining2[i] = true;
          this.selectedVal2 = i;
        } else this.joining2[i] = false;
      }
    }

    let date: Date;
    var dat = new Date();

    switch (id) {
      case "Since Joining":
        if (this.dataId == 1) {
          this.selectedDat = this.userData.createdAt;
          this.daysCalculation(this.selectedDat, null, this.dataId);
          this.getStudentMetrices();
          // this.filterData(null , this.selectedDat , dat);
        } else {
          this.selectedDat2 = this.userData.createdAt;
          this.daysCalculation(this.selectedDat2, null, this.dataId);
          this.getGroupAnalytics();
          // this.filterData(null , this.selectedDat2 , dat);

        }
        return;

      case "Last 12 Months":
        let oneYear = dat.setFullYear(dat.getFullYear() - 1);
        date = new Date(oneYear);
        if (this.dataId == 1) {
          this.selectedDat = date;
          this.daysCalculation(this.selectedDat, null, this.dataId);
        } else {
          this.selectedDat2 = date;
          this.daysCalculation(this.selectedDat2, null, this.dataId);
        }
        this.filterData(null , date , new Date());

        break;

      case "Ytd":
        date = new Date(dat.getFullYear(), 0, 1);
        if (this.dataId == 1) {
          this.selectedDat = date;
          this.daysCalculation(this.selectedDat, null, this.dataId);
        } else {
          this.selectedDat2 = date;
          this.daysCalculation(this.selectedDat2, null, this.dataId);
        }
        this.filterData(null , date , new Date());
        break;

      case "Last 90 Days":
        let threeMonth = dat.setMonth(dat.getMonth() - 3);
        date = new Date(threeMonth);
        if (this.dataId == 1) {
          this.selectedDat = date;
          this.daysCalculation(this.selectedDat, null, this.dataId);
        } else {
          this.selectedDat2 = date;
          this.daysCalculation(this.selectedDat2, null, this.dataId);
        }
        this.filterData(null , date , new Date());
        break;

      case "Last Month":
        let oneMonth = dat.setMonth(dat.getMonth() - 1);
        date = new Date(oneMonth);
        if (this.dataId == 1) {
          this.selectedDat = date;
          this.daysCalculation(this.selectedDat, null, this.dataId);
        } else {
          this.selectedDat2 = date;
          this.daysCalculation(this.selectedDat2, null, this.dataId);
        }
        this.filterData(null , date , new Date());
        break;

      case "Today":
        date = new Date();
        if (this.dataId == 1) {
          this.selectedDat = null;
          this.no_of_days = 0;
          
        } else {
          this.selectedDat2 = null;
          this.no_of_days2 = 0;
        }
        this.filterData(date , null , null);
        break;

      case "Custom":
        this.modalRef2 = this.modalService.show(temp);
        return;
    }

    // this.filterData(date);
  }

  filterData(date: Date, start?: Date, end?: Date): void {
    if (this.dataId == 1) {
      this.http.filterstdntMetrices(date, start, end).subscribe((data) => {

        this.studentTotal = data["data"];
        this.studentAverage = data["average"];
        if (this.modalRef2) {
          this.modalRef2.hide();
        }
        this.addDate.reset();
      });
    } else {
      this.http.filtergrpAnalytics(date, start, end).subscribe((data) => {
        let dats = data["data"];
        
        if(data['type'] == 'monthWise'){
          this.dateData = dats.map((el) => {
            return this.datePipe.transform(el._id, "MMM yyyy");
          });
        }else{
          this.dateData = dats.map((el) => {
            return this.datePipe.transform(el._id, "d MMM yyyy");
          });
        }

        let cumulativeData = dats.map((el) => {
          return el.cumlativeCount;
        });

        let countData = dats.map((el) => {
          return el.count;
        });

        if(data['type'] == 'monthWise'){
          this.chart2(cumulativeData, countData, this.dateData);
        }else{
          this.chart(cumulativeData, countData, this.dateData);
        }

        if (this.modalRef2) {
          this.modalRef2.hide();
        }
        this.addDate.reset();
      });
    }
  }

  onDateChanged(event) {
    let copy = JSON.parse(JSON.stringify(this.myDatePickerOptions2));
    copy.disableUntil = event.date;
    this.myDatePickerOptions2 = copy;
  }

  onApply() {

    let startDate = this.addDate.value.startDate.jsdate;
    let endDate = this.addDate.value.endDate.jsdate;

    if (this.dataId == 1) {
      this.selectedDat = startDate;
      this.todayDate = endDate;
      this.daysCalculation(this.selectedDat, this.todayDate, this.dataId);
    } else {
      this.selectedDat2 = startDate;
      this.todayDate2 = endDate;
      this.daysCalculation(this.selectedDat2, this.todayDate2, this.dataId);
    }

    this.filterData(null, startDate, endDate);
  }

  graphDataFilter(filter) {
    if (filter == "exchange") {
      this.getGroupAnalytics();
    } else {
      this.http.graphDataFilter(filter).subscribe((data) => {
        let dats = data["data"];

        if(data['type'] == 'monthWise'){
          this.dateData = dats.map((el) => {
            return this.datePipe.transform(el._id, "MMM yyyy");
          });
        }else{
          this.dateData = dats.map((el) => {
            return this.datePipe.transform(el._id, "d MMM yyyy");
          });
        }

        let cumulativeData = dats.map((el) => {
          return el.cumlativeCount;
        });
        let countData = dats.map((el) => {
          return el.count;
        });

        if(data['type'] == 'monthWise'){
          this.chart2(cumulativeData, countData, this.dateData);
        }else{
          this.chart(cumulativeData, countData, this.dateData);
        }

      });
    }
  }

  cohortSection( value:string , template?: TemplateRef<any>) {
    if(value == "all student"){
      this.customValue = "custom"
      this.studentType['all student'] = true
      this.studentType['custom'] = false
      this.getStudentMetrices();
      this.getGroupAnalytics();
    }else if(value == "custom"){
      // this.studentType['all student'] = false
      // this.studentType['custom'] = true
      this.customValue = "custom"
    }

    if(template){
      this.modalRef3 = this.modalService.show(template);
    }
  }

  applyCohort() {
    let y = this.addCohort.value.year.map((el) => el.name);
    let f = this.addCohort.value.form.map((el) => el);
    let payload = {
      year: y,
      form: f,
    };
    this.getStudentMetrices(payload);
    this.http.coherentData(payload).subscribe(
      (data) => {
        let dats = data["data"];

        if(this.customValue == "custom"){
           this.studentType['all student'] = false
            this.studentType['custom'] = true
        }
        
        if(data['type'] == 'monthWise'){
          this.dateData = dats.map((el) => {
            return this.datePipe.transform(el._id, "MMM yyyy");
          });
        }else{
          this.dateData = dats.map((el) => {
            return this.datePipe.transform(el._id, "d MMM yyyy");
          });
        }

        let cumulativeData = dats.map((el) => {
          return el.cumlativeCount;
        });

        let countData = dats.map((el) => {
          return el.count;
        });

        if(data['type'] == 'monthWise'){
          this.chart2(cumulativeData, countData, this.dateData);
        }else{
          this.chart(cumulativeData, countData, this.dateData);
        }

        this.modalRef3.hide();
        this.addCohort.reset();
        for (let i in this.joining) {
          this.joining[i] = false;
        }
      },
      (err) => {
        this.toastr.error("An error occurred");
        this.modalRef3.hide();
        this.addCohort.reset();
      }
    );
  }

  //Tabbig_functionality
  openTabbing(temp: TemplateRef<any>) {
    this.modalTab = this.modalService.show(temp);
  }

  threeDots(temp: TemplateRef<any>){
    this.modalTab4 = this.modalService.show(temp);
  }

  applyGraphFilter(){
    if (this.filterVal == "exchange") {
      this.getGroupAnalytics();
      this.modalTab4.hide();
    } else {
      this.http.graphDataFilter(this.filterVal).subscribe(
        (data) => {
          let dats = data["data"];
          if(data['type'] == 'monthWise'){
            this.dateData = dats.map((el) => {
              return this.datePipe.transform(el._id, "MMM yyyy");
            });
  
          }else{
            this.dateData = dats.map((el) => {
              return this.datePipe.transform(el._id, "d MMM yyyy");
            });
          }
          let cumulativeData = dats.map((el) => {
            return el.cumlativeCount;
          });

          let countData = dats.map((el) => {
            return el.count;
          });

          // this.chart(cumulativeData, countData, dateData);
          if(data['type'] == 'monthWise'){
            this.chart2(cumulativeData, countData, this.dateData);
          }else{
            this.chart(cumulativeData, countData, this.dateData);
          }

        },
        (err) => {
          this.toastr.error("An error occurred");
        }
      );
      this.modalTab4.hide();
    }

  }

  applyTabbing() {
    if (this.checkVal == "total") {
      this.forTotal = true;
    } else {
      this.forTotal = false;
    }
    this.modalTab.hide();
  }
}
