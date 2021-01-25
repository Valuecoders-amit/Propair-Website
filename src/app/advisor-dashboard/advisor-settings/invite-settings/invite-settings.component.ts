import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../../lib/services/auth.service";
import { AdvisorService } from "../../../lib/services/advisor.service";

@Component({
  selector: 'app-invite-settings',
  templateUrl: './invite-settings.component.html',
  styleUrls: ['./invite-settings.component.scss']
})
export class InviteSettingsComponent implements OnInit {
  userData : any;
  referralCode : any;
  referralData :any;
  link : string;
  url :string;
  text = `Propair`;
  imageUrl = 'http://propair.n1.iworklab.com:3002/propairLogo.jpg';
  facbookUrl = '//www.facebook.com/sharer/sharer.php?u=' ;
  twitterUrl = '//twitter.com/intent/tweet?text=A+New+Page&url=';
  linkedUrl = '//www.linkedin.com/cws/share?url='


  constructor(private toaster: ToastrService , private authService: AuthService ,private advisorService: AdvisorService,) { }

  ngOnInit() {
    this.inviteLink();
    this.userDataList();
  }

  inviteLink(){
    this.advisorService.inviteLink().subscribe(data =>{
      this.link = data['data']
      this.facbookUrl = this.facbookUrl + this.link
      this.twitterUrl = this.twitterUrl + this.link
      this.linkedUrl = this.linkedUrl + this.link
      this.url = this.link
    })
  }
  
  userDataList() {
    this.userData = this.authService.getUserInfo();
    this.referralCode = this.userData.referralCode
    this.advisorViewList(this.referralCode);
  }

  copyInputMessage(inputElement){
    this.toaster.success('Link Copied')
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  

  goToLink(stat:number){
    // window.open(url, "_blank");
    let postUrl = encodeURIComponent(this.url);
    if(stat == 1){
    const facebookbtn = document.querySelector(".facebook-btn");
    facebookbtn.setAttribute("href",`https://www.facebook.com/sharer.php?u=${postUrl}`);
    }
    else if(stat == 2){
     const twitterbtn = document.querySelector(".twitter-btn");
     twitterbtn.setAttribute("href",`https://twitter.com/share?url=${postUrl}`);
    }
    else if(stat == 3){
      const linkedInbtn = document.querySelector(".linkedin-btn");
      linkedInbtn.setAttribute("href",`https://www.linkedin.com/shareArticle?url=${postUrl}`);
    }
    else {
      const googlePlusbtn = document.querySelector(".google-btn");
      googlePlusbtn.setAttribute("href",`https://plus.google.com/share?url=${postUrl}`);
    }
}

advisorViewList(referralCode){
  let refCode ={
    code : referralCode
  }
  
  this.advisorService.advisorViewsList(refCode).subscribe(data =>{
    if(data['status'] == 200){
      this.referralData = data['data'][0];
    }
  })
}



}
