import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-become-partner-school',
  templateUrl: './become-partner-school.component.html',
  styleUrls: ['./become-partner-school.component.scss']
})
export class BecomePartnerSchoolComponent implements OnInit {

  constructor() { }

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
  }

}
