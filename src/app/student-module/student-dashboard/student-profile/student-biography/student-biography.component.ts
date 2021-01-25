import {Component, OnInit, TemplateRef} from '@angular/core';
import {StudentService} from '../../../../lib/services/student.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { Router, NavigationExtras } from '@angular/router';
@Component({selector: 'app-student-biography', templateUrl: './student-biography.component.html', styleUrls: ['./student-biography.component.scss']})
export class StudentBiographyComponent implements OnInit {

    biography : string ;

    more : boolean = false;
    modalRef2 : BsModalRef;
    public noData: boolean = false;
    inboxData : Array < any >= [];    
  
    constructor(private profileService : StudentService, private toasterService : ToastrService, private modalService : BsModalService , private router : Router) {}

    ngOnInit() {
        this.archiveContentData('public');
        this.getBioData();
    }
    editBio(template : TemplateRef < any >) {
        this.modalRef2 = this.modalService.show(template);

    }

    biographyData() {
        this.profileService.editStudentBiography({'biography': this.biography}).subscribe(data => {
            this.toasterService.success("Bio Updated Successfully")
        })
        this.modalRef2.hide();
    }

    archiveContentData(val) {
      this.profileService.archiveMessageFilter(val).subscribe(data => {
            this.inboxData =  data['data']
            this.noData = true;
          })

    }

    getBioData(){
      this.profileService.bioData().subscribe(data=>{
        if(data['data'].biography){
          this.biography = data['data'].biography;
          this.noData = true;
        }
      })
    }

    filterInbox(val){  
        this.archiveContentData(val);
      }

      showDetail(id){
        let navigationExtras: NavigationExtras = {
          queryParams: {
              "student": true,  
          }
      };
        this.router.navigate(['/student-module','dashboard','archive-view-message',id] , navigationExtras)
      }
}
