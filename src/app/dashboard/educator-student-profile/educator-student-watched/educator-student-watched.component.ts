import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { StudentService } from '../../../lib/services/student.service'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthService } from '../../../lib/services/auth.service'

@Component({
  selector: 'app-educator-student-watched',
  templateUrl: './educator-student-watched.component.html',
  styleUrls: ['./educator-student-watched.component.scss']
})
export class EducatorStudentWatchedComponent implements OnInit {

  career : Array<any>=[];
  apprentice :Array<any>= [];
  work :Array<any>= [];
  startup : Array<any>=[];
  other :Array<any>= [];
  quickShow:boolean;
  careerOptions:Array < {} >;
  apprenticeOptions :Array < {} >;
  workOptions : Array < {} >;
  startupOptions : Array < {} >;
  otherOptions : Array < {} >;
  public studentId:string
 

  dropdownSettings :IDropdownSettings= {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      enableCheckAll : false,
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: true
    };


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService:StudentService,
    private authService : AuthService
  ) { }

  ngOnInit() {

    this.studentId =this.authService.getStudentId();

    // console.log('subscribe  watched')
    // console.log( this.studentService.currentStudentId,' this.studentService.currentStudentId inside watched')
    this.studentService.educatorStudentId.subscribe(data=>{
      this.studentService.currentStudentId = data as string
      // console.log( this.studentService.currentStudentId,'--------> inside watched')
    })
    this.adviceAreasList(this.studentId);

  }

  


adviceAreasList(id) {

  
    this.studentService.getAdviceAreasList(id).subscribe(data => {
        let advice=data['data'][0];
        let newCarrier = advice.carrer.map(el => {
            let obj ={
                _id:el.id,
                name:el.description
            }
            return obj;
        } )
        let newApprentice = advice.apprenticeships.map(el => {
            let obj ={
                _id:el.id,
                name:el.description
            }
            return obj;
        })

        let newWork = advice.workexperience.map(el => {
            let obj ={
                _id:el.id,
                name:el.description
            }
            return obj;
        })

        let newStartup = advice.startups.map(el => {
            let obj ={
                _id:el.id,
                name:el.description
            }
            return obj;
        })

        let newOthers = advice.others.map(el => {
            let obj ={
                _id:el.id,
                name:el.description
            }
            return obj; 
        })
        this.career=newCarrier;
        this.apprentice = newApprentice ;
        this.work = newWork;
        this.startup = newStartup;
        this.other = newOthers;
    
       
    })
}









}
