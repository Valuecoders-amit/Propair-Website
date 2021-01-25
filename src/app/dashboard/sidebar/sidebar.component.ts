import { Component, OnInit ,TemplateRef, ViewChild, ElementRef} from '@angular/core';
declare var $;
import { AuthService } from '../../lib/services/auth.service'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { StudentService }  from '../../lib/services/student.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentResource: string ;
  registerRouter : Subscription ;
  
  selectedOption: number;
  public userData:any;

  constructor( 
    private authService:AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentService : StudentService
  ) 
  {
    
    this.selectedOption = 0;
    this.registerRouter = this.router.events.subscribe(event => {
    if( event instanceof NavigationEnd ) {
      this.currentResource = event.urlAfterRedirects.split('/')[2];      
    }
  })    
    
   }

ngOnInit() {

  // this.userData =this.authService.getUserInfo()
  this.currentMembershipData();

$('.toggle-btn1').on('click',function( ){
  $(this).parents(".dasboard-wrapper").toggleClass('shrink');

  // $(this).parents('.dasboard-wrapper').addClass('shrink')
});

  }


  currentMembershipData(){

    this.authService.message_currentCounts.subscribe(data => {
      if(data){
        this.userData = data
      }else{
        this.currentPlan();
      }
    })
  }

  currentPlan(){
    this.studentService.getCurrentmembership().subscribe(data=>{
      this.userData = data['data']

    })
  }

  
  ngOnDestroy(): void {
    this.registerRouter.unsubscribe();
  }

  logOut(){
    this.authService.logout();
  }

  remove(){
    this.authService.removeStudentId()
    // this.studentService.removeSliderData()
  }

  

}
