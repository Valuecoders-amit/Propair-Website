import { Component, OnInit } from "@angular/core";
import { educatorSettingsService } from "src/app/lib/services/edu.settings.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-educator-notifications',
  templateUrl: './educator-notifications.component.html',
  styleUrls: ['./educator-notifications.component.scss']
})
export class EducatorNotificationsComponent implements OnInit {

  currentNotificationSetting: any;
  currentUser: any;
  // checked: any;
  constructor(
    private http: educatorSettingsService,
    private toaster: ToastrService
  ) {
    this.getCurrentUser();
  }

  ngOnInit() {}
  /*CurrentUSer  */
  getCurrentUser() {
  this.currentUser = JSON.parse(localStorage.getItem('userInfo'))
        this.currentNotificationSetting = this.currentUser.notificationsType
         
  }


  checkNotification(e) {
    this.currentNotificationSetting = e.target.value;
  }
  updateNotifications() {
    let payload = { notificationsType: this.currentNotificationSetting };
    this.http.updateUser(payload).subscribe(
      data => {
        if ((data.isSuccess = true)) {
          this.currentUser.notificationsType = this.currentNotificationSetting
          localStorage.removeItem("userInfo")
          localStorage.setItem('userInfo',JSON.stringify(this.currentUser))
          this.toaster.success(this.currentNotificationSetting,"Notification settings:",);
        }
      },
      err => {
        this.toaster.error("Error" , "Updating Notifications settings");
      }
    ); 
  }

}
