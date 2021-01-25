import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../lib/services/auth.service'
import { StudentService } from '../../lib/services/student.service'
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
declare var $;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userData:any;
  public userFirstName:any
  public userLastName:any
  public notificationData : any;
  public balance : any;
  currentResource: string ;
  registerRouter : Subscription ;
  public listedNotificationArray = [];
  public notificationCount = 0;
  public pageNumber = 0;
  selectedOption: number;
  public notificationDataCount : any;

  constructor( private authService:AuthService , private studentService : StudentService,
    private toasterService : ToastrService,private router:Router)
     { 
      this.selectedOption = 0;
      this.registerRouter = this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.urlAfterRedirects.split('/')[2];      
      }
    }) 
     }

  ngOnInit() {
    
    $('.mobilenavbar li a').click(function(){
      $('.navbar-collapse').collapse('hide','slow');
    });

    this.userDataList();
    this.notification(this.pageNumber);
    this.balanceData();
  }

  userDataList(){
    this.authService.message_userDatas.subscribe(data =>{
      if(data){
        this.userData = data
        this.userFirstName = this.userData.firstName
        this.userLastName = this.userData.lastName
      }else{
        this.userData=this.authService.getUserInfo()
        this.userFirstName = this.userData.firstName
        this.userLastName = this.userData.lastName
      }
    })
  }

  logOut(){
    
    this.authService.Logout().subscribe(data =>{
      if(data['status'] == 200){
        this.authService.removeStudentId()
        this.authService.logout();
        this.studentService.removeSliderData()

      }else{
        this.toasterService.error('Error' , data['message'])
      }
    })

  }

  notification(pageNumber ? : any , value ?:any){
    this.authService.educatorNotification(pageNumber).subscribe(data =>{
      this.notificationData = data['data']
      this.notificationDataCount = data['unreadCount']

      if(this.notificationData.length  && this.pageNumber==0 ){
        // for( let i = 0 ; i <= 9 ; i++){
          this.notificationData.forEach(data =>{
            this.listedNotificationArray.push(data)
          })
          // this.notificationCount++;
        // }
      }

      else {

        this.notificationData.forEach(element => {
          if(element){
            this.listedNotificationArray.push(element);
          }
        });
      }
    })
  }

  notification2(pageNumber ? : any){
    this.authService.educatorNotification(pageNumber).subscribe(data =>{
      this.notificationDataCount = data['unreadCount']
    })

  }

  showMore(){
    this.pageNumber++;
   this.notification(this.pageNumber );

  }

  balanceData(){
    this.authService.message_balanceCounts.subscribe(data =>{
      if(data){
        this.balance = data
      }else{
        this.balanceDue();
      }
    })
  }

  balanceDue(){
    this.authService.educatorBalanceDue().subscribe(data =>{
      this.balance = data['data']
    })
  }

  status(messageId , id){
    this.authService.makeEducatorNotificationRead(id).subscribe(data =>{
      if(data['status'] == 200){
        this.router.navigateByUrl('/dashboard/educator-billing-credits/student-credits')
        this.notification2(this.pageNumber)
        this.listedNotificationArray.forEach(element =>{
          if(element._id == id){
            element.isRead = true;
          }
        })
      }
    })
  }

   numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

}
