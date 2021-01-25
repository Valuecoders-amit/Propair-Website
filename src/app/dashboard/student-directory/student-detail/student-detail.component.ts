import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as Highcharts from "highcharts";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from "../../../lib/services/student.service"
import { IStudent, IStudentData } from 'src/app/lib/interfaces/Istudent';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  public studentId: any;
  public studentDetail: any;
  public goals: any;
  public achivements: any;
  public filterValue: any;
  public sub:Subscription
  model = "";
  model1 = "";
  faCalendarAlt = faCalendarAlt;


  public messageExchanges: any=[]

  yAxisSecondaryData = [7, 17, 32, 52, 70, 91, 116, 132, 155, 168, 172, 181];
  yAxisPrimaryData = [7.0, 10, 15, 20, 18, 21, 25, 26, 23, 18, 13, 9];

  constructor(private _fb: FormBuilder,
    private modalService: BsModalService,
    private studentService: StudentService,
    private toasterService: ToastrService,
    private router: Router,
    
    private activatedRoute: ActivatedRoute, ) {


  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((param) => {
      this.studentId = param.id;
      this.getStudentDetailById(this.studentId);
      this.messageExchange(this.studentId,this.filterValue);
      this.carrer(this.studentId);
      this.achivement(this.studentId);
      this.temp();
    })
    this.chart(this.yAxisPrimaryData,this.yAxisSecondaryData);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getStudentDetailById(id: string) {
    this.studentService.getStudentDetail(id).subscribe(data => {
      this.studentDetail = data['data']
    })
  }

  temp(){
    this.studentService.edit_User.subscribe(data=>{
      this.studentDetail = data
      
    })
  }


  class(e) {

    switch (e.target.value) {
      case "1": {
        let cys = [10, 20, 35, 52, 73, 87, 116, 132, 145, 192, 176, 151];
        let cyp = [9, 14, 18, 20, 18, 34, 22, 36, 33, 38, 23, 19];
        this.chart(cyp, cys);
        break;
      }
      case "2": {
        let cys2 = [7, 17, 32, 52, 70, 91, 116, 132, 155, 168, 172, 181];
        let cyp2 = [7.0, 10, 15, 20, 18, 21, 25, 26, 23, 18, 13, 9];
        this.chart(cyp2, cys2);
        break;
      }
    }
  }

  filterMessage(value){
    
    this.messageExchange(this.studentId, value)
  }

  messageExchange(id: string,value?){
    this.studentService.getMessageExchange(id, value).subscribe(data=>{  
      if(data['data']){
        this.messageExchanges = data['data']
      }
      
    })


  }

  carrer(id: string){
    this.studentService.getcareerGoal(id).subscribe(data=>{
      if(data['data']){
        this.goals = data['data'].careerGoal

      }
      
    })
  }

  achivement(id: string){
    this.studentService.getAchivements(id).subscribe(data=>{
      if(data['data']){
        this.achivements  = data['data']
      }

      
    })
  }

  chart(yp, ys) {
    Highcharts.chart("container", {
      chart: {
        zoomType: "xy"
      },
      title: {
        text: ""
      },
      credits: {
        enabled: false
      },
      xAxis: [
        {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          crosshair: true
        }
      ],
      yAxis: [
        {
          // Primary yAxis
          categories: ["1", "2", "3", "4", "5", "6", "7"],
          labels: {
            format: "{value}",
            style: {
              color: Highcharts.getOptions().colors[1]
            }
          },
          title: {
            text: "Daily",
            style: {
              color: Highcharts.getOptions().colors[1]
            }
          }
        },
        {
          // Secondary yAxis
          categories: ["5", "10", "15", "20", "25", "30", "35"],
          title: {
            text: "Cumulative",
            style: {
              color: Highcharts.getOptions().colors[0]
            }
          },
          labels: {
            format: "{value} ",
            style: {
              color: Highcharts.getOptions().colors[0]
            }
          },
          opposite: true
        }
      ],
      tooltip: {
        shared: true
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
          "rgba(255,255,255,0.25)"
      },
      series: [
        {
          // name: "Cumulative",
          showInLegend: false,
          type: "column",
          yAxis: 1,
          data: ys,
          tooltip: {
            // valueSuffix: ' mm'
          },
          color: "#33e2d1"
        },
        {
          // name: "Daily",
          showInLegend: false,
          type: "spline",
          data: yp,
          tooltip: {
            // valueSuffix: '°C'
          },
          color: "#000000"
        }
      ]
    });
  }

}
