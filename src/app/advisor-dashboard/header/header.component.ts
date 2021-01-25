import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../lib/services/auth.service'
import { AdvisorService } from '../../lib/services/advisor.service'
import { StudentService } from '../../lib/services/student.service'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


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
  public openRequests:any;
  public shrink :any;
  requestCount :any;
  currentResource: string ='advisor-dashboard';
  registerRouter : Subscription ;
  selectedOption: number;
  moreTodo : boolean = false;
  public toDoListData:any;
  public notificationData = [];
  public notificationDataCount : any;
  public listedNotificationArray = [];
  public notificationCount = 0;
  public pageNumber = 1;

  constructor(private authService:AuthService,
    private studentService : StudentService,
    private router: Router,
    private toasterService : ToastrService,
    private advisorService: AdvisorService
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

    $('.toggle-btn1').on('click',function( ){
      $(this).parents(".notification-box").toggleClass('shrink');
    
      // $(this).parents('.dasboard-wrapper').addClass('shrink')
    });

    $('.mobilenavbar li a').click(function(){
      $('.navbar-collapse').collapse('hide','slow');
    });
 
 
      
    this.userDataList();
    this.openRequest();
    this.shrinkData();
    this.toDoList();
    this.notification(this.pageNumber , '1');
  }

  
  ngOnDestroy(): void {
    this.registerRouter.unsubscribe();
  }


  userDataList(){
    this.advisorService.message_userDatas.subscribe(data =>{
      if(data){
        this.userData = data
        this.userFirstName = this.userData.firstName;
        this.userLastName =  this.userData.lastName;
      }else{
        this.userData=this.authService.getUserInfo()
        this.userFirstName = this.userData.firstName;
        this.userLastName =  this.userData.lastName;
      }
    })
  }

openRequest(){
  this.studentService.open_requestCount.subscribe(data =>{
    if(data){
      this.requestCount = data
    }else{
      this.openRequestsListing();
    }
  })
}

   logOut(){
     this.authService.Logout().subscribe(data =>{
       if(data['status']== 200){
        this.authService.logout();
        this.studentService.removeSliderData()
        this.authService.removeStudentId()
       }else{
        this.toasterService.error('Error' , data['message'])
       }
      })
      
    }

  openRequestsListing(){
    this.authService.studentmessageRequests().subscribe(data=>{
      this.requestCount = data['matchCount']
      if(data['data'].length > 0){
        this.openRequests = data['data'].concat(data['referredData']);
      }

    })
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
    })
  }

  notification(pageNumber ? : any , value ?:any){
    this.studentService.notification(pageNumber).subscribe(data =>{
      this.notificationData = data['data'].data
      this.notificationDataCount = data['data'].notificationCount;

      if(this.notificationData.length  && this.pageNumber==1 && value == '1' ){
        // for( let i = 0 ; i <= 9 ; i++){
          this.notificationData.forEach(data =>{
            this.listedNotificationArray.push(data)
          })
          // this.notificationCount++;
        // }
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
   this.notification(this.pageNumber , '3' );

  }

  status(messageId , id){
    this.studentService.makeNotificationRead(id).subscribe(data => {
    if(data['status'] == 200){
      this.studentService.checkInboxMessage(messageId).subscribe(data =>{
        if(data['status'] == 200){
          this.router.navigateByUrl('/advisor-dashboard/advisor-inbox-view-message/'+ messageId)
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
      },err=>{
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



}
