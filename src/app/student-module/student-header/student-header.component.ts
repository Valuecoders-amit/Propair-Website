import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../lib/services/auth.service'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { StudentService } from '../../lib/services/student.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

declare var $;

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.scss']
})
export class StudentHeaderComponent implements OnInit {

  public userData:any;
  public userFirstName:any
  public userLastName:any
  public shrink :any;
  moreTodo : boolean = false;
  public toDoListData:any;
  public notificationData : any;
  public notificationDataCount :any;
  public notifications : boolean = false;
  public memberShip :any;
  currentResource: string ;
  registerRouter : Subscription ;
  selectedOption: number;
  public listedNotificationArray = [];
  public notificationCount = 0;
  public pageNumber = 1;

  constructor(private authService:AuthService,
    private router:Router,
    private studentService : StudentService,
    private toasterService : ToastrService)
     {
      this.selectedOption = 0;
      this.registerRouter = this.router.events.subscribe(event => {
        if( event instanceof NavigationEnd ) {
          this.currentResource = event.urlAfterRedirects.split('/')[3];      
        }
      }) 

     }

  ngOnInit() {
   
    $('.mobilenavbar li a').click(function(){
      $('.navbar-collapse').collapse('hide','slow');
    });


    this.userDataList();
    this.shrinkData();
    this.toDoList();
    this.notification(this.pageNumber , '1');
    this.checkMembership();
    // this.memeberShipData();
  }

  ngOnDestroy(): void {
    this.registerRouter.unsubscribe();
  }

  

  userDataList(){
    this.studentService.message_userDatas.subscribe(data =>{
      if(data){
        this.userData = data;
        this.userFirstName = this.userData.firstName
        this.userLastName = this.userData.lastName
      }else{
        this.userData=this.authService.getUserInfo()
        this.userFirstName = this.userData.firstName
        this.userLastName = this.userData.lastName
      }
    })
  }

  memeberShipData(){
    this.studentService.creditGenral().subscribe(data=>{
      this.memberShip = data['data']
    })
  }

  checkMembership(){

    this.studentService.membership_prizeCount.subscribe(data =>{

        if(data){
          this.memberShip = data
        }else{
          this.memeberShipData();
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

  click(){
    
    this.router.navigateByUrl('/student-module/dashboard/message-exchange/message-exchange1')

  }

  navigateSettings(){
    this.router.navigateByUrl('/student-module/dashboard/student-settings/credits')
  }

  shrinkData(){

    this.studentService.sidebarData.subscribe(data=>{
      this.shrink = data
      
    })
  
  }

  toDoList(){
    this.studentService.toDoList().subscribe(data =>{
      if(this.moreTodo) this.toDoListData = data['data'];
      else this.toDoListData = data['data'].slice(0,2);;
      // this.toDoListData = data['data']
      // this.toDoListing=[...this.toDoListData]
      // this.toDoListing.splice(3);
    })
  }


  notification(pageNumber : number , value ?: any){
    this.studentService.notification(pageNumber).subscribe(data =>{
      this.notificationData = data['data'].data
      this.notificationDataCount = data['data'].notificationCount;

      if(this.notificationData.length && this.pageNumber==1 && value == '1'){
        // for( let i = 0 ; i <= 9 ; i++){
          this.notificationData.forEach(data =>{
            this.listedNotificationArray.push(data)
          })
          // this.notificationCount++;
        // }
      }
      else if(value == '2'){
        // return this.listedNotificationArray
      }
      else if(value == '2'){
        return this.listedNotificationArray
      }
      else if(value == '3'){
        this.notificationData.forEach(element => {
          if(element && element.message){
            this.listedNotificationArray.push(element);
          }
        });
      }
    })
  }

  notification2(pageNumber : number){
    this.studentService.notification(pageNumber).subscribe(data =>{
      this.notificationDataCount = data['data'].notificationCount;
    })
  }

  showMore(){
    this.pageNumber++;
    // this.notificationCount++
   this.notification(this.pageNumber , '3');

  }

  status(messageId , id){

    this.studentService.makeNotificationRead(id).subscribe(data => {
      if(data['status'] == 200){
        this.studentService.checkInboxMessage(messageId).subscribe(data =>{
          if(data['status'] == 200){
          this.router.navigateByUrl('student-module/dashboard/inbox-view-message/' + messageId)
            this.notification2(this.pageNumber);
            this.listedNotificationArray.forEach(element =>{
              if(element._id == id){
                element.isRead = true;
              }
            })
          }else{
            this.toasterService.error('Error' , 'Message Exchange has completed')
            this.notification2(this.pageNumber);
            this.listedNotificationArray.forEach(element =>{
              if(element._id == id){
                element.isRead = true;
              }
            })
          }
        },err =>{
          this.toasterService.error('Error' , 'Message Exchange has completed')
          this.notification2(this.pageNumber);
          this.listedNotificationArray.forEach(element =>{
            if(element._id == id){
              element.isRead = true;
            }
          })
        })
      }
      
    })
  }
  

  notify(){
    this.notifications = true
  }

}
