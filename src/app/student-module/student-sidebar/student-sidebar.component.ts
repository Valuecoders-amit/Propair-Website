import { Component, OnInit ,TemplateRef, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../lib/services/auth.service'
import { StudentService } from '../../lib/services/student.service';
import { Subscription } from 'rxjs';


declare var $;

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.scss']
})
export class StudentSidebarComponent implements OnInit {

  currentResource: string ;
  registerRouter : Subscription ;
  selectedOption: number;
  public shrink = false;

  constructor(
    private authService:AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentService : StudentService
  ) {

    this.selectedOption = 0;
    this.registerRouter = this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.urlAfterRedirects.split('/')[3];      
      }
    })  

    
   }

  ngOnInit() {

 
    $('.toggle-btn1').on('click',function( ){
      $(this).parents(".dasboard-wrapper").toggleClass('shrink');
    
      // $(this).parents('.dasboard-wrapper').addClass('shrink')
    });

    
    
  }

  ngOnDestroy(): void {
    this.registerRouter.unsubscribe();
  }


  dataClean(){
    this.studentService.AdvisorNewMessageTab2 = false
    this.studentService.AdvisorNewMessageTab3 = false
    this.studentService.AdvisorNewMessageTab4 = false
    this.studentService.AdvisorNewMessageTab5 = false
    this.studentService.AdvisorNewMessageTab6 = false
  }

  submit(){
    if(this.shrink == false){
      this.shrink = true
    }else if(this.shrink == true){
      this.shrink = false
    }
    this.studentService.sidebarData.next(this.shrink)

  }

}
