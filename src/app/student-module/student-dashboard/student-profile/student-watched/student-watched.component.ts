import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../../lib/services/student.service';
import {ToastrService} from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-student-watched',
  templateUrl: './student-watched.component.html',
  styleUrls: ['./student-watched.component.scss']
})
export class StudentWatchedComponent implements OnInit {
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
   

    dropdownSettings :IDropdownSettings= {
        singleSelection: false,
        idField: '_id',
        textField: 'name',
        enableCheckAll : false,
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 0,
        allowSearchFilter: false
      };



    constructor(private profileService : StudentService, private toastr : ToastrService) {}

    ngOnInit() {
        this.adviceAreasList();
        this.dropdownListingData();
    }

    dropdownListingData(){
        this.profileService.careerListing().subscribe(data => {
            this.careerOptions = data['data'];
        })

        this.profileService.apprenticeListing().subscribe(data => {
            this.apprenticeOptions = data['data'];
        })
        this.profileService.workExperienceListing().subscribe(data => {
            this.workOptions = data['data'];
        })
        this.profileService.startupListing().subscribe(data => {
            this.startupOptions = data['data'];
        })
        this.profileService.othersListing().subscribe(data => {
            this.otherOptions = data['data'];
        })

    }

    adviceAreasList() {

      
        this.profileService.getAdviceAreasList().subscribe(data => {
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

 

    onSingleSelect(e , id){
        let payload = {};

        if(id == 1){
            let carrerPay = [];
            carrerPay.push(e);
            let newArray = carrerPay.map(el=>{
                let obj ={
                    'id':el._id,
                    'description':el.name
                }
                return obj;
            })

            payload['carrer']= newArray
            
        }
        else if(id == 2){
            let apprenticePay = [];
           apprenticePay.push(e);
            let newArray = apprenticePay.map(el=>{
                let obj ={
                    'id':el._id,
                    'description':el.name
                }
                return obj;
            })
            payload['apprenticeships']= newArray
        }
        else if(id == 3 ){
            let workPay = [];
            workPay.push(e);
            let newArray = workPay.map(el=>{
                let obj ={
                    'id':el._id,
                    'description':el.name
                }
                return obj;
            })
            payload['workexperience']= newArray
        }
        else if(id == 4){
            let startupPay = [];
            startupPay.push(e);
            let newArray = startupPay.map(el=>{
                let obj ={
                    'id':el._id,
                    'description':el.name
                }
                return obj;
            })
            payload['startups']= newArray
        }
        else{
            let otherPay =[];
            otherPay.push(e);
            let newArray = otherPay.map(el=>{
                let obj ={
                    'id':el._id,
                    'description':el.name
                }
                return obj;
            })
            payload['others']= newArray
        }
        
        this.updateAdviceData(payload)
     
    }

    onRemoveItem(item:any , id){
        let payload = {};

         if (id == 1){
       payload['carrer']= {'description':item.name}
      

      }
      else if(id == 2){
       
        payload['apprenticeships']= {'description':item.name}
      }
      else if(id == 3){
     
        payload['workexperience']= {'description':item.name}


      }  
      else if (id == 4){
    
        payload['startups']= {'description':item.name}
      }
      else {
       
        payload['others']= {'description':item.name}

      }

      this.removeAdviceData(payload);
   

       }


      

    onSelectAll(e){
    }

    removeAdviceData(payload){
        this.profileService.removeAdviceArea(payload).subscribe(data=>{
            this.adviceAreasList();
        })
    }

    updateAdviceData(payload){

        this.profileService.getUpdateAdvice(payload).subscribe(data => {
            this.adviceAreasList();
          }, err=>{
            this.toastr.error(`${err.error.message}`)
          })
    }

}
