import { Component, OnInit, TemplateRef } from '@angular/core';
import { StudentService } from '../../../lib/services/student.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NavigationExtras, Router } from '@angular/router';

// declare var $;
@Component({
  selector: 'app-advisor-biography',
  templateUrl: './advisor-biography.component.html',
  styleUrls: ['./advisor-biography.component.scss']
})
export class AdvisorBiographyComponent implements OnInit {

  biography: string;
  more:boolean=false;
  modalRef2: BsModalRef;
  inboxData:Array<any>=[];
  public noData: boolean = false;
 
  constructor( private profileService:StudentService,
    private toasterService: ToastrService,
    private modalService: BsModalService,
    private router : Router) { }

  ngOnInit() {
    this.archiveContentData('public');
    this.getBioData();
  }
  editBio( template: TemplateRef<any>){
    
      this.modalRef2 = this.modalService.show(template);
    

  }
  biographyData() {
    this.profileService.editBiography({'biography':this.biography}).subscribe(data=>{
      this.toasterService.success("Bio Updated Successfully")
    })

    this.modalRef2.hide();
  }


     archiveContentData(val){

      this.profileService.archiveProfileFilter(val).subscribe(data => {
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
            "advisor": true,  
        }
    };
      this.router.navigate(['/advisor-dashboard','advisor-archive-view-message',id] , navigationExtras)
      // /advisor-dashboard/advisor-inbox-view-message/5eabc6ccd1f81d77367a285d
    }

}
