import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../lib/services/auth.service";
import { AdvisorService } from '../../../lib/services/advisor.service';

import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss']
})
export class NotificationSettingsComponent implements OnInit {

  userData : any;
  notificationData:any;
  public onGoingnotificationData:any;
  public hideNotification : boolean = false

  constructor( private authService: AuthService, private toaster: ToastrService,
    private advisorService : AdvisorService,) { }

  ngOnInit() {
    this.userDataList();
  }

  userDataList() {
    this.userData = this.authService.getUserInfo();
  }

  checkNotification(data){
    this.notificationData = data
  }

  checkOnGoingNotification(data){
    this.onGoingnotificationData = data
  }

  updateNotification(){
    let payload = {
      newMessageRequest : this.notificationData
    }

    if(this.notificationData == "TurnOffNotification"){
      this.hideNotification = true
    }else{
      this.hideNotification = false
    }

    this.advisorService.updateAdvisorProfile(payload).subscribe(data=>{
      if(data['status'] == 200){
        this.toaster.success('Success' , 'Notifications updated')
        this.authService.setUserInfo(data['data'])

      }else{
        this.toaster.error('Error',data['message'])
      }
    },err=>{
      this.toaster.error('Error',err.error.message)
    })
  }

  updateOnGoingNotification(){
    let payload = {
      onGoingMessage : this.onGoingnotificationData
    }

    this.advisorService.updateAdvisorProfile(payload).subscribe(data=>{
      if(data['status'] == 200){
        this.toaster.success('Success' , 'Notifications updated')
        this.authService.setUserInfo(data['data'])

      }else{
        this.toaster.error('Error',data['message'])
      }
    })
  }
}
