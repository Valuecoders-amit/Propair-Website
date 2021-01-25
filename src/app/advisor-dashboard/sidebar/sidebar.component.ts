import { Component, OnInit, OnDestroy } from '@angular/core';
declare var $;
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from '../../lib/services/student.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit , OnDestroy{

  currentResource: string;
  registerRouter : Subscription ;
  selectedOption: number;
  public shrink = false;
  

  constructor(
    private router: Router,
    private studentService : StudentService
  ) {
    this.selectedOption = 0;
    this.registerRouter = this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.urlAfterRedirects.split('/')[2];      
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

      submit(){
        if(this.shrink == false){
          this.shrink = true
        }else if(this.shrink == true){
          this.shrink = false
        }
        this.studentService.sidebarData.next(this.shrink)

      }


  

}
