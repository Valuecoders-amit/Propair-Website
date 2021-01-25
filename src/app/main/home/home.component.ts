
declare var $;
import {OwlCarousel} from 'ngx-owl-carousel';
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {AuthService} from '../../lib/services/auth.service'
import {AdvisorService} from '../../lib/services/advisor.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentResource: string ='advisor-dashboard';

  selectedOption: number;

  constructor(private toasterService:ToastrService,
    private router: Router,
    private authService:AuthService,
    private advisorService:AdvisorService,
    private activatedRoute: ActivatedRoute,
    ) { 

      this.selectedOption = 0;
      this.router.events.subscribe(event => {
        if( event instanceof NavigationEnd ) {      
        }
      })
    }

  ngOnInit() {
  
    $(document).ready(function(){
      $('#owl-one').owlCarousel({
          loop:true,
          margin:30,
          nav:true,
          responsive:{
              0:{
                  items:1
              },
              767:{
                  items:1
              },
              768:{
                  items:2
              },
              1000:{
                  items:2
              }
          }
      });
  
    
  });

  $('#owl-two').owlCarousel({
    loop:false,
    margin:30,
    nav:true,
    center:false,
    responsive:{
        0:{
            items:1
        },
        767:{
            items:1
        },
        768:{
            items:2
        },
        1000:{
            items:3
        }
    }
});

  if(this.authService.getToken()){

    if (this.authService.getToken() && this.authService.getUserInfo().role == 'educator') {
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/student-module']);
        
    }
  }


  }

}
