import { Component, OnInit } from "@angular/core";
import { MainService } from "../main.service";
import { ToastrService } from "ngx-toastr";
declare var $;

@Component({
  selector: "app-become-advisor",
  templateUrl: "./become-advisor.component.html",
  styleUrls: ["./become-advisor.component.scss"],
})
export class BecomeAdvisorComponent implements OnInit {
  email: string = "";

  constructor(
    private homeService: MainService,
    private toastr: ToastrService
  ) {}

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
  scroll(){
    document.getElementById('require').scrollIntoView(true);
  }
  sendAdvisorEmail() {
    let payload = {
      email: this.email,
    };
    this.homeService.sendEmail(payload).subscribe(
      (data) => {
        this.toastr.success("Join Waitlist");
        this.email = "";
      },
      (err) => {
        let errMsg = err.error.error || "An unknown error occured";
        const check = err.error.message;
        switch (check) {
          case "Email Exist":
            errMsg = "Email already exists";
            break;
        }
        this.toastr.error(errMsg);
      }
    );
  }
}
