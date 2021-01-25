import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { StudentService } from '../../../../lib/services/student.service';
import { AuthService } from '../../../../lib/services/auth.service';
import { NavigationExtras, Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-student-advisor-advice',
  templateUrl: './student-advisor-advice.component.html',
  styleUrls: ['./student-advisor-advice.component.scss']
})
export class StudentAdvisorAdviceComponent implements OnInit {

  public studentId:any;
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

  constructor(private profileService : StudentService,
     private toastr : ToastrService,
     private activatedRoute: ActivatedRoute,
     private authService:AuthService,
     private router : Router) { }

  ngOnInit() {
    this.studentId =this.authService.getStudentId();
    this.adviceAreasList(this.studentId);
  }


  
  adviceAreasList(id) {

      
    this.profileService.getAdviceAreasList(id).subscribe(data => {
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
