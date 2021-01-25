import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrls } from '../../config/apiUrl';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IUserInfo } from '../interfaces/IUserInfo'
import { INewMessage } from '../interfaces/InewMessage'
import { Observable,BehaviorSubject, Subject} from 'rxjs';
import * as jwt_decode from "jwt-decode";
import { ILibraryTags } from '../interfaces/IlibraryTags';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  id:string
  token: string;
  libraryTags : object
  user: IUserInfo
  userBrowse: boolean
  role:string
  message:INewMessage
  showMembership = new Subject();
  educatorTootTip = new Subject();


  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location) { }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  setToken(token: string) {

    localStorage.setItem('token', token);
    this.token = token;
    // this.checkRoles()
  }

  
  setUserInfo(info: IUserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(info));
    this.user = info;
  }

  getUserInfo() {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    return this.user;
  }
  // behavior subject 
  private balanceCounts = new BehaviorSubject(false);
  message_balanceCounts = this.balanceCounts.asObservable();

  balanceCount(data) {
    this.balanceCounts.next(data);
  }


  private currentCounts = new BehaviorSubject(false);
  message_currentCounts = this.currentCounts.asObservable();

  currentCount(data) {
    this.currentCounts.next(data);
  }

  private userDatas = new BehaviorSubject(false);
  message_userDatas = this.userDatas.asObservable();

  userData(data) {
    this.userDatas.next(data);
  }


  setNewExchange(info: INewMessage) {
    
    localStorage.setItem('newExchange', JSON.stringify(info));
    this.message = info;
  }

  getNewExchange() {
    this.message = JSON.parse(localStorage.getItem('newExchange'));
    return this.message;
  }

  removeNewExchange(){  
    localStorage.removeItem('newExchange');
  }

  setStudentId(id: string) {

    localStorage.setItem('id', id);
    this.id = id;
    // this.checkRoles()
  }

  getStudentId(): string {
    if (!this.id) {
      this.id = localStorage.getItem('id');
    }
    return this.id;
  }

  removeStudentId(){
    localStorage.removeItem('id');
  }


  

      /* Get Token Info */
      getDecodedAccessToken(token: string): any {
        try {
          return jwt_decode(token);
        } catch (Error) {
          return null;
        }
      }

  checkRoles(){  
    const decodeToken = this.getDecodedAccessToken(this.token);
  }


  logout() {
    localStorage.clear();
    this.user = null;
    this.token = null;
    this.message = null;
    this.userBrowse = false;
    this.router.navigateByUrl('');
  }
  
  Logout() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.logout}`)
  }

  genrateInvoice() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.genrateInvoice}`)
  }

  signup(formData: object) {

    return this.http.post(`${apiUrls.baseUrl}${apiUrls.singup}/`, formData)
  }

  login(formData: object) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.login}/`, formData)
  }

  createCustomer() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.createCustomer}`)
  }
  educatorStudentDropdown() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.educatorStudentDropdown}`)
  }

  educatorNotification(number ?: number) {
    if(number == 1 || number > 1){
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.educatorNotification}?pageNumber=${number}`)
    }else{
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.educatorNotification}`)

    }
  }

  educatorBalanceDue() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.educatorBalanceDue}`)
  }

  library() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.library}`)
  }

  libraryList(Id: string) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.libraryList}/${Id}`)
  }
  tags() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.tags}`)
  }

  educatorDashboardData() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.educatotDashboard}`)
  }
    messageList(query: object) {
    let params = new HttpParams()
      .set('searchText', query['searchText'])
      .set('status', query['status'])
      .set('tags', query['tags'])
      .set('pageNumber', query['pageNumber'])
      .set('sort', query['sort'])
    // Object.keys(query).forEach(key => {
    //   params.set(key, query[key])
    // })
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.messageList}`, { params });
  }

  membershipInvoice(formData: object) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.membershipInvoice}/`, formData)
  }

  crediitInvoice(formData: object) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.creditInvoice}/`, formData)
  }

  UpdateEducatorPassword(formData:any,id: string){
    return this.http.put(`${apiUrls.baseUrl}${apiUrls.updateEducatorPasswword}/${id}`,formData,)
  }

  checkToken(formData:any){
    return this.http.put(`${apiUrls.baseUrl}${apiUrls.checkToken}`,formData)
  }

  // getLibraryList(status:any, sort:any, school:any, searchText:any ,pageNumber?:number, location?:string, studentLocation?:string,formData?:any ){
  //   return this.http.post(`${apiUrls.baseUrl}${apiUrls.listLibrary}?status=${status}&school=${school}&searchText=${searchText}&rightSideFilter=${sort}&pageNumber=${pageNumber}&location=${location}&studentLocation=${studentLocation}`,formData);
  // }


  getLibraryList(query: object ,formData:any ){

    let params = new HttpParams()
    .set('status', query['status'])
    .set('school', query['school'])
    .set('searchText', query['searchText'])
    .set('rightSideFilter', query['sort'])
    .set('pageNumber', query['pageNumber'])
    .set('location', query['location'])
    .set('studentLocation', query['studentLocation'])
    
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.listLibrary}`,formData,{ params });
  }

  getStudentClassDetail(Id: string) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentClassDetail}/${Id}`)
  }
  upVotes(Id: string) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.upvotes}/${Id}`)
  }

  views(Id: string) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.views}/${Id}`)
  }

  favorites(Id: string) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.markfavorites}/${Id}`)
  }

  getSctorDummyList(value?:any) {
    if(value){

      return this.http.get(`${apiUrls.baseUrl}${apiUrls.sectorDummyList}?searchPattern=${value}`)
    }else{
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.sectorDummyList}`)
    }
  }

  getCollegeDummyList(value?:any) {
    if(value){
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.collegeDataDummyList}?searchPattern=${value}`)

    }else{
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.collegeDataDummyList}`)

    }
  }

  makeEducatorNotificationRead(id) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.makeEducatorNotificationRead}/${id}`);
  }

  getEmployersDummyList(value?:any) {
    if(value){
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.employersDataDummyList}?searchPattern=${value}`)

    }
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.employersDataDummyList}`)
  }

  getTypeOdJObDummyList(value?:any) {
    if(value){

      return this.http.get(`${apiUrls.baseUrl}${apiUrls.typeOfJobDummyList}?searchPattern=${value}`)
    }else{
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.typeOfJobDummyList}`)

    }
  }
  getFieldOfStudyDummyList(value?:any) {
    if(value){

      return this.http.get(`${apiUrls.baseUrl}${apiUrls.feildOfStudyDummyList}?searchPattern=${value}`)
    }else{
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.feildOfStudyDummyList}`)

    }
  }

  //Educator Group Analytics
  grpAnalytics(){
    let payload={};
    return this.http.post(`${apiUrls.baseUrl}/groupAnlytics`, payload);
  }

  stdntMetrices(payload?: any){
    // let payload={};
    // return this.http.post(`${apiUrls.baseUrl}/studentMetrices`, payload);
    // let payload={};
    if(payload){
      return this.http.post(`${apiUrls.baseUrl}/studentMetrices`, payload);

    }else{
        let payload={};
        return this.http.post(`${apiUrls.baseUrl}/studentMetrices`, payload);
    }
  }

 

  graphDataFilter(filter : string){
    let payload = {};
   if(filter == 'view'){
    return this.http.post(`${apiUrls.baseUrl}/groupAnlytics?view=true`, payload);
   }

   else {
    return this.http.post(`${apiUrls.baseUrl}/groupAnlytics?upvote=true`, payload);
   }
  }

  filtergrpAnalytics(data : Date , start?:Date , end?:Date){
    let payload={};
    if(data){

      return this.http.post(`${apiUrls.baseUrl}/groupAnlytics?date=${data}`, payload);
    }
   else{
    return this.http.post(`${apiUrls.baseUrl}/groupAnlytics?startDate=${start}&endDate=${end}`,payload);
   }
  
  }

  filterstdntMetrices(data : Date , start?:Date , end?:Date){
    let payload = {};
    if(data){
      return this.http.post(`${apiUrls.baseUrl}/studentMetrices?date=${data}`, payload);
    }
   else{
    return this.http.post(`${apiUrls.baseUrl}/studentMetrices?startDate=${start}&endDate=${end}`, payload);
   }
  }


  coherentData(payload){
    return this.http.post(`${apiUrls.baseUrl}/groupAnlytics`, payload);
  }

//end



//Student_Library

getLibrary(query: object ,formData:any){

  let params = new HttpParams()
  .set('searchText', query['searchText'])
  // .set('status', query['status'])
  // .set('tags', query['tags'])
  .set('pageNumber', query['pageNumber'])
  .set('rightSideFilter', query['sort'])
  .set('location', query['location'])
  .set('studentLocation', query['studentLocation'])
  // http://propair.n1.iworklab.com:3002/Library
  return this.http.post(`${apiUrls.baseUrl}/Library`,formData,{ params });
}
//end


//Student Requests
  studentmessageRequests(){
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.messageRequest}`);
  }

  openRequestFilter(filter){
    return this.http.get(`${apiUrls.baseUrl}/advisor/messageRequest?filter=${filter}`);

  }

  studentAcceptRequest(id:string){
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.acceptRequest}/${id}`);
  }

  referMail(payload){

  return this.http.post<any>(`${apiUrls.baseUrl}/sendRefernce`, payload);
  }

  liveRequestsData(){
    return this.http.get(`${apiUrls.baseUrl}/referedRequest`);
  }
  liveFilterData(filter){
    return this.http.get(`${apiUrls.baseUrl}/referedRequestFilter?status=${filter}`);
  }

  expiredRequestsData(){
    
    return this.http.get(`${apiUrls.baseUrl}/referedRequestFilter?filter=expired`);
  }
  expiredFilterData(filter){
    return this.http.get(`${apiUrls.baseUrl}/referedRequestFilter?filter=expired&status=${filter}`);
  }
  getReferral(id){
    return this.http.get(`${apiUrls.baseUrl}/referList/${id}`);
  }
//end 


//Advisor_Stats_________

getGraphAnalytics(data?: Date , start?:Date , end?:Date){
  const payload={};
  if(data){
    return this.http.post(`${apiUrls.baseUrl}/groupAnlytics?date=${data}`, payload);
  }
  else if (start && end) {
    return this.http.post(`${apiUrls.baseUrl}/groupAnlytics?startDate=${start}&endDate=${end}`,payload);
  }
  else {
    return this.http.post(`${apiUrls.baseUrl}/groupAnlytics`, payload);

  }

}

getStudentMetrices(data?: Date , start?:Date , end?:Date){
const payload={};

if(data){
  return this.http.post(`${apiUrls.baseUrl}/studentMetrices?date=${data}`, payload);
}
else if(start && end){
  return this.http.post(`${apiUrls.baseUrl}/studentMetrices?startDate=${start}&endDate=${end}`, payload);
}
else{
  return this.http.post(`${apiUrls.baseUrl}/studentMetrices`, payload);
}
}


getPerformanceData(val?:string ,date?: Date , start?:Date , end?:Date ){
  if(val){
    return this.http.get(`${apiUrls.baseUrl}/performance?year=${val}`);
  }
  else if(start && end){
    return this.http.get(`${apiUrls.baseUrl}/performance?startDate=${start}&endDate=${end}`);
  }
  else if(date){
    return this.http.get(`${apiUrls.baseUrl}/performance?date=${date}`);
  }
  else {
    return this.http.get(`${apiUrls.baseUrl}/performance`);
  }
  
}
getMilestone(date?: Date , start?:Date , end?:Date){
  if(date){
    return this.http.get(`${apiUrls.baseUrl}/advisorDashboard?date=${date}`);
  }
  else if ( start && end){
    return this.http.get(`${apiUrls.baseUrl}/advisorDashboard?startDate=${start}&endDate=${end}`);
  }
  else {
    return this.http.get(`${apiUrls.baseUrl}/advisorDashboard`);
  }
  
}

getKarmaPointsDetail(){
  return this.http.get(`${apiUrls.baseUrl}/admin/advisor/points`);
}
//end


//Advisor_Dashboard
getTodos(){
 return this.http.get(`${apiUrls.baseUrl}/todoList`);
}

sendForgetPasswordLink(payload){

  return this.http.post<any>(`${apiUrls.baseUrl}${apiUrls.sendForgetPasswordLink}`, payload);
  }

  ForgetPassword(payload){

    return this.http.put<any>(`${apiUrls.baseUrl}${apiUrls.forgetPassword}`, payload);
    }


    // membership


    membershipListData() {
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.membershipListData}`)
    }

    amountToPay() {
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.educatorAmountToPay}`)
    }

    amountIsPaid() {
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.amountIsPaid}`)
    }

    
    changeMembership(formData: object) {
      return this.http.post(`${apiUrls.baseUrl}${apiUrls.educatorMembershipPrice}`, formData)
    }

    upgradeMembershipPlan(formData: object) {
      return this.http.post(`${apiUrls.baseUrl}${apiUrls.educatorUpdateMembership}`, formData)
    }
    

    membershipToken(formData: object) {
      return this.http.post(`${apiUrls.baseUrl}${apiUrls.membershipToken}`, formData)
    }

    membershipCreateCard(formData: object) {
      return this.http.post(`${apiUrls.baseUrl}${apiUrls.membershipCreateCard}`, formData)
    }


    membershipListCard() {
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.membershipListCard}`)
    }

    membershipDeleteCard(formData: object) {
      return this.http.post(`${apiUrls.baseUrl}${apiUrls.membershipDeleteCard}`, formData)
    }

    updateCard(formData: object) {
      return this.http.post(`${apiUrls.baseUrl}${apiUrls.updateCard}`, formData)
    }

    purchaseMembership(formData: object) {
      return this.http.post(`${apiUrls.baseUrl}${apiUrls.purchaseMembership}`, formData)
    }

    membershipMakeCharge(formData: object) {
      return this.http.post(`${apiUrls.baseUrl}${apiUrls.membershipMakeCharge}`, formData)
    }

    monthlyExpanse(id: string) {
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.educatorMonthyExpanse}/${id}`)
    }
    educatorMembershipInfo(id: string) {
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.educatorMembershipInfo}/${id}`)
    }



    membershipMakeChargeThroughToken(formData: object) {
      return this.http.post(`${apiUrls.baseUrl}${apiUrls.membershipMakeChargeThroughToken}`, formData)
    }


    membershipCardDetail(formData: object) {
      return this.http.post(`${apiUrls.baseUrl}${apiUrls.membershipCardDetails}`, formData)
    }

    educatorBillingList(date?: Date, start?: Date, end?: Date ,status?:string, type?:string) {

      if (start && end) {
        return this.http.get(
          `${apiUrls.baseUrl}${apiUrls.educatorBillingList}?startDate=${start}&endDate=${end}`
        );
      } 

      else if (date) {
        return this.http.get(
          `${apiUrls.baseUrl}${apiUrls.educatorBillingList}?date=${date}` );
      }
      else if(status){
        return this.http.get(
          `${apiUrls.baseUrl}${apiUrls.educatorBillingList}?status=${status}`);
      }
      else if(type){
        return this.http.get(
          `${apiUrls.baseUrl}${apiUrls.educatorBillingList}?type=${type}`);
      }
      else{
        
        return this.http.get(`${apiUrls.baseUrl}${apiUrls.educatorBillingList}`)
      }
    }

    
  
  

}


