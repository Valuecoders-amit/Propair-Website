import { Component, OnInit, TemplateRef } from "@angular/core";
import { AuthService } from "../../../lib/services/auth.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { IMyDpOptions } from "mydatepicker";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl } from "@angular/forms";
import * as Highcharts from "highcharts";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-advisor-overview",
  templateUrl: "./advisor-overview.component.html",
  styleUrls: ["./advisor-overview.component.scss"],
})
export class AdvisorOverviewComponent implements OnInit {
  impactData: any = {};
  performance: any = {};
  joining: any = {
    "Since Joining": true,
    "Last 12 Months": false,
    Ytd: false,
    "Last 90 Days": false,
    "Last Month": false,
    Today: false,
    Custom: false,
  };

  joining2: any = {
    "Since Joining": true,
    "Last 12 Months": false,
      Ytd: false,
    "Last 90 Days": false,
    "Last Month": false,
    Today: false,
    Custom: false,
  };
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalTab: BsModalRef;
  addDate: FormGroup;
  userData: any = {};
  selectedVal: string = "Since Joining";
  selectedVal2: string = "Since Joining";
  selectedDat: Date = null;
  todayDate: Date = new Date();
  selectedDat2: Date = null;
  todayDate2: Date = new Date();
  no_of_days: any;
  filterVal: string = "exchange";
  dataId: any = null;
  public dateData: any;
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
  public previousYear : any = ['2018','2019','2020']
  public yearArray: any  = []
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

  constructor(
    private auth: AuthService,
    private modalService: BsModalService,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPerformanceData(this.previousYear[this.previousYear.length-1] , null , null ,null );
    let currentYr : any = new Date().getFullYear();
    // if(this.previousYear){
      let result = currentYr - this.previousYear[this.previousYear.length-1];
      if(result && result===1){
        this.previousYear.push(currentYr);
      }
      this.yearArray = this.previousYear.reverse();
    // }
    this.addDate = new FormGroup({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });
    this.getSocialImpact();
    this.getGroupAnalytics();
    this.getDates();
  }

  getDates() {
    this.userData = this.auth.getUserInfo();
    this.selectedDat = this.userData.createdAt;
    this.daysCalculation(this.selectedDat);
  }

  daysCalculation(date: Date, endDate?: Date) {
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
    this.no_of_days = Math.round(Difference_In_Days);
  }

  getSocialImpact(date?: Date, start?: Date, end?: Date) {
    if (date || (start && end)) {
      this.auth.getStudentMetrices(date, start, end).subscribe((data) => {
        this.impactData = data["data"];
      });
    } else {
      this.auth.getStudentMetrices().subscribe((data) => {
        this.impactData = data["data"];
      });
    }
  }

  getPerformanceData(val?: string , date?: Date, start?: Date, end?: Date) {
    this.auth.getPerformanceData(val ,date ,start ,end).subscribe((data) => {
      this.performance = data["data"];
    });
  }

  getGroupAnalytics(date?: Date, start?: Date, end?: Date) {
    if (date || (start && end)) {
      this.auth.getGraphAnalytics(date, start, end).subscribe(
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
    } else {
      this.auth.getGraphAnalytics().subscribe(
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
        if(this.dataId == 1){
          this.selectedDat = this.userData.createdAt;
          this.daysCalculation(this.selectedDat);
          this.getSocialImpact();
          this.getGroupAnalytics();

        }else{
          this.selectedDat2 = this.userData.createdAt;
          this.daysCalculation(this.selectedDat);
          this.getPerformanceData();
        }
        return;

      case "Last 12 Months":
        if(this.dataId == 1){
          let oneYear = dat.setFullYear(dat.getFullYear() - 1);
          date = new Date(oneYear);
          this.selectedDat = date;
          this.daysCalculation(this.selectedDat);
          this.filterData(null ,date , new Date());

        }else{
          let oneYear = dat.setFullYear(dat.getFullYear() - 1);
          date = new Date(oneYear);
          this.selectedDat = date;
          this.daysCalculation(this.selectedDat);
          this.getPerformanceData(null ,null ,date ,new Date());
        }
        break;

      case "Ytd":
        if(this.dataId == 1){
          date = new Date(dat.getFullYear(), 0, 1);
          this.selectedDat = date;
          this.daysCalculation(this.selectedDat);
          this.filterData(null ,date , new Date());
        } else{
          date = new Date(dat.getFullYear(), 0, 1);
          this.selectedDat = date;
          this.daysCalculation(this.selectedDat);
          this.getPerformanceData(null ,null ,date ,new Date());
        }
        break;

      case "Last 90 Days":
        if(this.dataId == 1){
          let threeMonth = dat.setMonth(dat.getMonth() - 3);
          date = new Date(threeMonth);
          this.selectedDat = date;
          this.daysCalculation(this.selectedDat);
          this.filterData(null ,date , new Date());
        }else{
          let threeMonth = dat.setMonth(dat.getMonth() - 3);
          date = new Date(threeMonth);
          this.selectedDat = date;
          this.daysCalculation(this.selectedDat);
          this.getPerformanceData(null ,null ,date ,new Date());
        }
        break;

      case "Last Month":
        if(this.dataId == 1){
          let oneMonth = dat.setMonth(dat.getMonth() - 1);
          date = new Date(oneMonth);
          this.selectedDat = date;
          this.daysCalculation(this.selectedDat);
          this.filterData(null ,date , new Date());

        }else{
          let oneMonth = dat.setMonth(dat.getMonth() - 1);
          date = new Date(oneMonth);
          this.selectedDat = date;
          this.daysCalculation(this.selectedDat);
          this.getPerformanceData(null ,null ,date ,new Date());
        }
        break;

      case "Today":
        if(this.dataId == 1){

          date = new Date();
          this.selectedDat = null;
          this.no_of_days = 0;
          this.filterData(date ,null , null);
        }else{
          date = new Date();
          this.selectedDat = null;
          this.no_of_days = 0;
          this.getPerformanceData(null ,date ,null ,null);
        }
        break;

      case "Custom":
        this.modalRef2 = this.modalService.show(temp);
        return;
    }

    // this.filterData(date);
  }

  graphDataFilter() {
    
    if (this.filterVal == "exchange") {
      this.getGroupAnalytics();
      this.modalTab.hide();
    } else {
      this.auth.graphDataFilter(this.filterVal).subscribe(
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
      this.modalTab.hide();
    }
  }

  filterData(date?: Date, start?: Date, end?: Date): void {
  

    this.getSocialImpact(date, start, end);
    this.getGroupAnalytics(date, start, end);
    if (this.modalRef2) {
      this.modalRef2.hide();
    }

    this.addDate.reset();
  
  }

  onApply() {

    let startDate = this.addDate.value.startDate.jsdate;
    let endDate = this.addDate.value.endDate.jsdate;

    if(this.dataId == 1){
      this.selectedDat = startDate;
      this.todayDate = endDate;
      this.daysCalculation(this.selectedDat, this.todayDate);
      this.filterData(null, startDate, endDate);

    }else{
      this.selectedDat = startDate;
      this.todayDate = endDate;
      this.daysCalculation(this.selectedDat, this.todayDate);
      this.getPerformanceData(null ,null ,this.selectedDat ,this.todayDate);
      this.modalRef2.hide();
      this.addDate.reset();

    }

  }

  performanceFilter(val) {
    this.getPerformanceData(val ,null ,null ,null);
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
            text: "Daily",
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          // tickInterval: 100,
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
            text: "Month",
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          // tickInterval: 100,
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

  onDateChanged(event) {
    
    let copy = JSON.parse(JSON.stringify(this.myDatePickerOptions2));
    copy.disableUntil = event.date;
    this.myDatePickerOptions2 = copy;
  }

  openTabbing(temp: TemplateRef<any>) {
    this.modalTab = this.modalService.show(temp);
  }
}
