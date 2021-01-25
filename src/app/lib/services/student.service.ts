import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { apiUrls } from "../../config/apiUrl";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { IUserInfo } from "../interfaces/IUserInfo";
import { Observable, BehaviorSubject, Subject } from "rxjs";
// import 'rxjs/Rx' ;
import { DomSanitizer } from "@angular/platform-browser";
import { ITitle } from "../../lib/interfaces/Ititle";
import { ITag } from "../../lib/interfaces/Itag";
import { IQuestion } from "../../lib/interfaces/Iquestion";
import { IMessage } from "../../lib/interfaces/Imessage";
import { ITemp } from "../../lib/interfaces/ITemp";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  public tag: any;
  public title: any;
  public question: any;
  public allData: any;

  //local storage variables

  localTitle: ITitle;
  localTag: ITag;
  localQuestion: IQuestion;
  localMessage: IMessage;
  localTemp: ITemp;
  public payload = {};
  public Title: any;
  public Tag: any;
  public Question: any;
  public Message: any;
  public tagTab: boolean;
  public QuestionTab: boolean;
  public ReviewTab: boolean;
  public AdvisorNewMessageTab1: boolean;
  public AdvisorNewMessageTab2: boolean;
  public AdvisorNewMessageTab3: boolean;
  public AdvisorNewMessageTab4: boolean;
  public AdvisorNewMessageTab5: boolean;
  public AdvisorNewMessageTab6: boolean;
  public currentStudentId: string;
  advisorarchiveCount = new Subject();
  advisordraftCount = new Subject();
  advisorinboxCount = new Subject();
  studentFirstName = new Subject();
  studentlastName = new Subject();
  studentCountry = new Subject();
  studentCity = new Subject();
  libaryTypeForAPI = new Subject();
  educatorStudentId = new Subject();
  sliderData = new Subject();
  sidebarData = new Subject();
  studentSliderData = new Subject();
  insufficientData = new Subject();
  membershipPrizeCount = new Subject();
  selectedType = new BehaviorSubject("public");
  constructor(private http: HttpClient, private router: Router) {}

  getCurrentmembership() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.educatorCurrentPlan}`);
  }

  addStudent(formData: object) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.addStudent}`, formData);
  }

  studentList(formData ?: string) {
    if(formData){
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentList}?form=${formData}`);
    }else{
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentList}`);
    }
  }

  // notification Read 
  makeNotificationRead(id) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.makeNotificationRead}/${id}`);
  }


  checkInboxMessage(id) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.checkInboxMessage}/${id}`);
  }

  insufficientBalance() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.insufficientModal}`);
  }

  checkForMessageType() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.checkForMessageType}`);
  }

  educatorSchoolName() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.educatorSchoolName}`)
  }

  // end notification Read 


  getClassList() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.classlist}`);
  }

  getFormList() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.formList}`);
  }

  getYearList() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.yearList}`);
  }

  filterYear(formData: any) {
    return this.http.get(
      `${apiUrls.baseUrl}${apiUrls.filterYear}?year=${formData}`
    );
  }

  filterClass(formData: any) {
    return this.http.get(
      `${apiUrls.baseUrl}${apiUrls.filterClass}?class=${formData}`
    );
  }
  filterStatus(formData: any) {
    return this.http.get(
      `${apiUrls.baseUrl}${apiUrls.filterStatus}?status=${formData}`
    );
  }

  allFilters(status ?:any , form ?:any , year ?:any) {
    if(status && form && year ){
      return this.http.get( `${apiUrls.baseUrl}${apiUrls.filterStatus}?status=${status}&&form=${form}&&year=${year}`);
    }else if(status && form){
      return this.http.get( `${apiUrls.baseUrl}${apiUrls.filterStatus}?status=${status}&&form=${form}`);
    }else if (form && year){
      return this.http.get( `${apiUrls.baseUrl}${apiUrls.filterStatus}?form=${form}&&year=${year}`);
    }else if (status && year){
      return this.http.get( `${apiUrls.baseUrl}${apiUrls.filterStatus}?status=${status}&&year=${year}`);
    }else if(status){
      return this.http.get( `${apiUrls.baseUrl}${apiUrls.filterStatus}?status=${status}`);
    }else if (form){
      return this.http.get( `${apiUrls.baseUrl}${apiUrls.filterStatus}?form=${form}`);
    }else if (year){
      return this.http.get( `${apiUrls.baseUrl}${apiUrls.filterStatus}?year=${year}`);
    }else{
      return this.http.get( `${apiUrls.baseUrl}${apiUrls.filterStatus}`);
    }
  }

  getStudentDetail(id) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentDetail}/${id}`);
  }

  getMessageExchange(id, value?: any) {
    if (value) {
      return this.http.get(
        `${apiUrls.baseUrl}${apiUrls.messageExchange}/${id}/${value}`
      );
    } else {
      return this.http.get(
        `${apiUrls.baseUrl}${apiUrls.messageExchange}/${id}`
      );
    }
  }

  notification(number ?: number){
    if(number== 1 || number > 1 ){
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.notification}?pageNumber=${number}`);
    }else{
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.notification}`);
    }
  }

  getcareerGoal(id) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.careerGoal}/${id}`);
  }

  getAchivements(id) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.achivements}/${id}`);
  }

  addClass(formData: any) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.addClass}`, formData);
  }

  deleteStudent(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.deleteStudent}`,
      formData
    );
  }
  editClass(id: string, payload?: any) {
    return this.http.put(
      `${apiUrls.baseUrl}${apiUrls.editClass}/${id}`,
      payload
    );
  }

    studentCreditRequest( year?:string, form?: string , status?: string){

      if(status && form && year ){
        return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentCreditRequest}?status=${status}&&form=${form}&&year=${year}`)

      }else if(status && form){
        return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentCreditRequest}?status=${status}&&form=${form}`)
        
      }else if(form && year){
        return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentCreditRequest}?form=${form}&&year=${year}`)

      }else if(status && year){
        return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentCreditRequest}?status=${status}&&year=${year}`)

      }else if (status) {
        return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentCreditRequest}?status=${status}`)

      }else if (form){
        return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentCreditRequest}?form=${form}`)

      }else if (year){
        return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentCreditRequest}?year=${year}`)
        
      }else {
        return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentCreditRequest}`)

      }
    }

    studentCreditRequestListing(status?: string){

       if(status){
        return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentCreditRequest}?status=${status}`)

      }else{
        return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentCreditRequest}`)
      }
    }

    creditGenral(){
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.creditGenral}`)
    }

  editYear(id: string, payload?: any) {
    return this.http.put(
      `${apiUrls.baseUrl}${apiUrls.editYear}/${id}`,
      payload
    );
  }

  editStudentClass(id: string, payload?: any) {
    return this.http.put(
      `${apiUrls.baseUrl}${apiUrls.editStudentClass}/${id}`,
      payload
    );
  }

  deleteClass(id) {
    return this.http.put(`${apiUrls.baseUrl}${apiUrls.deleteClass}/${id}`, {});
  }

  uploadStudent(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.uploadStudent}`,
      formData
    );
  }

  historicalSpend(date?: Date, start?: Date, end?: Date) {
    if (start && end) {
      return this.http.get(
        `${apiUrls.baseUrl}${apiUrls.educatorHistoricalSpend}?startDate=${start}&endDate=${end}`
      );
    } else if (date) {
      return this.http.get(
        `${apiUrls.baseUrl}${apiUrls.educatorHistoricalSpend}?date=${date}`
      );
    } else {
      return this.http.get(
        `${apiUrls.baseUrl}${apiUrls.educatorHistoricalSpend}`
      );
    }
  }

  historicalSpendDetails(date?: Date, start?: Date, end?: Date) {
    if (start && end) {
      return this.http.get(
        `${apiUrls.baseUrl}${apiUrls.educatorHistoricalSpendDetail}?startDate=${start}&endDate=${end}`
      );
    } else if (date) {
      return this.http.get(
        `${apiUrls.baseUrl}${apiUrls.educatorHistoricalSpendDetail}?date=${date}`
      );
    } else {
      return this.http.get(
        `${apiUrls.baseUrl}${apiUrls.educatorHistoricalSpendDetail}`
      );
    }
  }

  inviteStudents(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.inviteStudent}`,
      formData
    );
  }

  UpdateStudentsPassword(formData: any, id: string) {
    return this.http.put(
      `${apiUrls.baseUrl}${apiUrls.updateStudentPassword}/${id}`,
      formData
    );
  }

  // UpdateEducatorPassword(formData:any,id: string){
  //   return this.http.put(`${apiUrls.baseUrl}${apiUrls.updateEducatorPasswword}/${id}`,formData,)
  // }

  downloadTemplate() {
    return `${apiUrls.baseUrl}${apiUrls.downloadTemplate}`;
  }

  // studentCreditRequest() {
  //   return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentCreditRequest}`);
  // }
  // creditGenral() {
  //   return this.http.get(`${apiUrls.baseUrl}${apiUrls.creditGenral}`);
  // }

  sendCreditRequest(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.sendCreditRequest}`,
      formData
    );
  }

  calculateCredit(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.calculatePrize}`,
      formData
    );
  }

  approveCreditRequest(formData: any) {
    return this.http.put(
      `${apiUrls.baseUrl}${apiUrls.approveCreditRequest}`,
      formData
    );
  }

  declineCreditRequest(formData: any) {
    return this.http.put(
      `${apiUrls.baseUrl}${apiUrls.declineCreditRequest}`,
      formData
    );
  }

  checkToken(formData: any) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.checkToken}`, formData);
  }

  // educator services

  upgradeMembership(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.upgradeMembership}`,
      formData
    );
  }
  calculateCreditPrize(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.calculateCreditPrize}`,
      formData
    );
  }

  changeMembership(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.changeMembership}`,
      formData
    );
  }

  membershipPrize(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.membershipPrize}`,
      formData
    );
  }

  membershipList() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.membershipList}`);
  }

  educatorBilling() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.educatorBilling}`);
  }

  creditCount() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.creditCount}`);
  }

  creditListCount(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.creditListCount}`,
      formData
    );
  }

  //behaviour subject

  private edit = new BehaviorSubject(false);
  edit_User = this.edit.asObservable();

  editUser(data) {
    this.edit.next(data);
  }

  // 2

  private Tags = new BehaviorSubject(false);
  message_Tags = this.Tags.asObservable();

  messageTag(data) {
    this.Tags.next(data);
  }

  //3

  private inboxCounts = new BehaviorSubject(false);
  message_inboxCounts = this.inboxCounts.asObservable();

  inboxCount(data) {
    this.inboxCounts.next(data);
  }

  //4

  private draftCounts = new BehaviorSubject(false);
  message_draftCounts = this.draftCounts.asObservable();

  draftCount(data) {
    this.draftCounts.next(data);
  }

  //5
  private outBoxCounts = new BehaviorSubject(false);
  message_outBoxCounts = this.outBoxCounts.asObservable();

  outBoxCount(data) {
    this.outBoxCounts.next(data);
  }

  //6

  private archiveCounts = new BehaviorSubject(false);
  message_archiveCounts = this.archiveCounts.asObservable();

  archiveCount(data) {
    this.archiveCounts.next(data);
  }

  //7

  private propairCounts = new BehaviorSubject(false);
  message_propairCounts = this.propairCounts.asObservable();

  propairCount(data) {
    this.propairCounts.next(data);
  }

  //8

  private advisorInboxCounts = new BehaviorSubject(false);
  message_advisorInboxCounts = this.advisorInboxCounts.asObservable();

  advisorInboxCount(data) {
    this.advisorInboxCounts.next(data);
  }

  //9

  private advisorDraftCounts = new BehaviorSubject(false);
  message_advisorDraftCounts = this.advisorDraftCounts.asObservable();

  advisorDraftCount(data) {
    this.advisorDraftCounts.next(data);
  }

  // 10

  private advisorArchiveCounts = new BehaviorSubject(false);
  message_advisorArchiveCounts = this.advisorArchiveCounts.asObservable();

  advisorArchiveCount(data) {
    this.advisorArchiveCounts.next(data);
  }

  // 11

  private studentIds = new BehaviorSubject(false);
  id_student = this.studentIds.asObservable();

    // 12

    private MembershipPrizeCount = new BehaviorSubject(false);
    membership_prizeCount = this.MembershipPrizeCount.asObservable();
  
    membershipPriseCount(data) {
      this.MembershipPrizeCount.next(data);
    }

        // 13

        private openRequestCount = new BehaviorSubject(false);
        open_requestCount = this.openRequestCount.asObservable();
      
        openRequestCounts(data) {
          this.openRequestCount.next(data);
        }

    // 14 

  

     private userDatas = new BehaviorSubject(false);
      message_userDatas = this.userDatas.asObservable();
          
      userData(data) {
        this.userDatas.next(data);
       }


     // 15 

     private deletDrafts = new BehaviorSubject(false);
     message_deletDraft = this.deletDrafts.asObservable();
         
     deletDraft(data) {
       this.deletDrafts.next(data);
      }


      // 16 

      private draftDataLiveList = new BehaviorSubject(false);
      message_draftDataLiveList = this.draftDataLiveList.asObservable();

      draftDataLiveLists(data){
        this.draftDataLiveList.next(data);
      }

     // 16 

      private draftDataNewList = new BehaviorSubject(false);
      message_draftDataNewList = this.draftDataNewList.asObservable();
      
      draftDataNewLists(data){
        this.draftDataNewList.next(data);
      }

  // student module : my message

  studentDashboard(date?: Date, start?: Date, end?: Date) {
    if (start && end) {
      return this.http.get(
        `${apiUrls.baseUrl}${apiUrls.studentDashboard}?startDate=${start}&endDate=${end}`
      );
    } else if (date) {
      return this.http.get(
        `${apiUrls.baseUrl}${apiUrls.studentDashboard}?date=${date}`
      );
    } else {
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.studentDashboard}`);
    }
  }

  toDoList() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.toDoList}`);
  }

  outBox() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.outbox}`);
  }

  draftBox() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.draftbox}`);
  }

  draftNewMessageExchange() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.newMessageExchnage}`);
  }

  inbox(id?: string) {
    if (id) {
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.inbox}?userId=${id}`);
    } else {
      return this.http.get(`${apiUrls.baseUrl}${apiUrls.inbox}`);
    }
  }

  archive() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.archive}`);
  }

  messageDetails(id) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.messageDetails}/${id}`);
  }

  messageDetailsLive(id) {
    return this.http.get(
      `${apiUrls.baseUrl}${apiUrls.messageDetailLive}/${id}`
    );
  }

  sendNow(formData: any) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.sendNow}`, formData);
  }

  deleteMessage(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.deleteMessage}`,
      formData
    );
  }

  deleteNewMessage(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.deleteNewMessage}`,
      formData
    );
  }

  deleteMessageLive(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.deleteMessageLive}`,
      formData
    );
  }

  messageRead(id) {
    return this.http.put(`${apiUrls.baseUrl}${apiUrls.messageRead}/${id}`, {});
  }

  messageThreadDetail(id) {
    return this.http.get(
      `${apiUrls.baseUrl}${apiUrls.messageThreadDetails}/${id}`,
      {}
    );
  }

  newExchange(formData: any) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.newExchange}`, formData);
  }

  updateMessage(formData: any, id) {
    return this.http.put(
      `${apiUrls.baseUrl}${apiUrls.updateMessage}/${id}`,
      formData
    );
  }

  updateMessageLive(formData: any) {
    return this.http.put(
      `${apiUrls.baseUrl}${apiUrls.updateMessageLive}`,
      formData
    );
  }

  sendReplyLiveDraft(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.sendReplyLiveDraft}`,
      formData
    );
  }

  saveAsDraft(formData: any) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.saveAsDraft}`, formData);
  }

  saveAsDraftLive(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.saveAsDraftLive}`,
      formData
    );
  }

  sector() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.sector}`);
  }

  checkBalance() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.checkBalance}`);
  }

  adviceList() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.adviceList}`);
  }

  collegeList(searchPattern: string) {
    return this.http.get(
      `${apiUrls.baseUrl}${apiUrls.collegeList}?searchPattern=${searchPattern}`
    );
  }
  jobList() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.jobList}`);
  }

  employersList(searchPattern: string) {
    return this.http.get(
      `${apiUrls.baseUrl}${apiUrls.employersList}?searchPattern=${searchPattern}`
    );
  }

  markMessageComplete(id) {
    return this.http.get(
      `${apiUrls.baseUrl}${apiUrls.markMessageComplete}/${id}`
    );
  }

  viewStatics(id) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.viewStatics}/${id}`);
  }

  ratingsAndReviews(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.ratingsAndReviews}`,
      formData
    );
  }

  archiveMessageFilter(formData ?: any , id ?: any) {

    if(formData && id) {
      return this.http.get(
        `${apiUrls.baseUrl}${apiUrls.archiveMessageFilter}?filterType=${formData}&user=${id}`
      );
    }else{
      return this.http.get(
        `${apiUrls.baseUrl}${apiUrls.archiveMessageFilter}?filterType=${formData}`
      );
    }

  }

  inboxListingFilter(formData: any) {
    return this.http.get(
      `${apiUrls.baseUrl}${apiUrls.inboxListingFilter}?filterType=${formData}`
    );
  }

  sendPropairSupport(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.SendPropairSupport}`,
      formData
    );
  }

  propairSupportList() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.propairSupportList}`);
  }

  messageThreadDetailPropair(id) {
    return this.http.get(
      `${apiUrls.baseUrl}${apiUrls.messageThreadDetailPropair}/${id}`,
      {}
    );
  }

  SendReplyPropairSupport(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.SendReplyPropairSupport}`,
      formData
    );
  }

  deleteMessagePropairSupport(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.deleteMessagePropairSupport}`,
      formData
    );
  }

  fileUpload(formData: object) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.fileUpload}`, formData);
  }

  removeImageUpload(formData: object) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.removeImage}`, formData);
  }

  propairSupportListFilter(formData: any) {
    return this.http.get(
      `${apiUrls.baseUrl}${apiUrls.propairSupportListFilter}?status=${formData}`
    );
  }

  sendUpdatedOutBox(formData: any) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.sendUpdatedOutBox}`,
      formData
    );
  }
  countryList() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.countryData}`);
  }

  segmentLogo(formData:any){
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.segemntApiForCollege}`,formData)
  }

  
  thumbnailImage(formData:any){
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.thumbnailImage}`,formData)
  }


  cityList(formData: any) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.cityData}`, formData);
  }

  /* Stripe Services Temp */

  getKeys() {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.memberShipeKey}`);
  }
  checkTransationStatus(id) {
    return this.http.get(
      `${apiUrls.baseUrl}${apiUrls.membershipTransationStatus}/${id}`
    );
  }

  createSession(payload) {
    return this.http.post(
      `${apiUrls.baseUrl}${apiUrls.membershipCreateSession}`,
      payload
    );
  }

  GetStripePublicKey() {
    return this.http.get<any>(
      `${apiUrls.baseUrl}/membership/checkout/stripe/stripe-key`
    );
  }
  createToken(payload) {
    return this.http.post<any>(`${apiUrls.baseUrl}/membership/token`, payload);
  }
  createCharge(stripeToken) {
    return this.http.post<any>(
      `${apiUrls.baseUrl}/membership/stripe`,
      stripeToken
    );
  }
  createCustomer(payload) {
    return this.http.post<any>(
      `${apiUrls.baseUrl}/membership/createCustomer`,
      payload
    );
  }
  createCard(payload) {
    return this.http.post<any>(
      `${apiUrls.baseUrl}/membership/createCard`,
      payload
    );
  }

  listCards(payload) {
    return this.http.post<any>(
      `${apiUrls.baseUrl}/membership/listCards`,
      payload
    );
  }

  chargeCard(payload) {
    return this.http.post<any>(
      `${apiUrls.baseUrl}/membership/chargeCard`,
      payload
    );
  }

  transactionDetails(payload) {
    return this.http.post<any>(
      `${apiUrls.baseUrl}/membership/transactionDetails`,
      payload
    );
  }

  sendReply(formData: any) {
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.sendReply}`, formData);
  }

  paybill() {
    return this.http.post<any>(`${apiUrls.baseUrl}/educator/paybill`, "");
  }
  deleteCard(payload) {
    return this.http.post<any>(
      `${apiUrls.baseUrl}/membership/deleteCard`,
      payload
    );
  }

  //Student_Flags
  flagIssue(id, payload) {
    return this.http.post<any>(`${apiUrls.baseUrl}/issueFlag/${id}`, payload);
  }

  //StudentProfileApi's
  bioData(id?: string) {
    if (id) {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/admin/profileInfo?userId=${id}`
      );
    } else {
      return this.http.get<any>(`${apiUrls.baseUrl}/admin/profileInfo`);
    }
  }

  editStudentBiography(payload: {}) {
    return this.http.put<any>(`${apiUrls.baseUrl}/admin/editStudent`, payload);
  }
  editStudentCareer(payload: {}) {
    return this.http.put<any>(`${apiUrls.baseUrl}/admin/editStudent`, payload);
  }


  //Student Education Api's

  educationFillingForm(payload){
    return this.http.post<any>(`${apiUrls.baseUrl}/advisor/addEducationStudent`, payload);
  }
  
  editFillingForm(payload , id){
    return this.http.put<any>(`${apiUrls.baseUrl}/advisor/editEducationStudent/${id}`, payload);
  }
  
  getGCSEList(val?){
    return this.http.get<any>(`${apiUrls.baseUrl}/advisor/subjectList?searchPattern=${val}`);
  }
  getAlevelList(val?){
    return this.http.get<any>(`${apiUrls.baseUrl}/advisor/subjectListAlevel?searchPattern=${val}`);
  }
  getIBList(val?){
    return this.http.get<any>(`${apiUrls.baseUrl}/advisor/subjectListIb?searchPattern=${val}`);
  }
  
  getStudentEducationList(id?: string) {
    if (id) {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/advisor/educationListStudent?userId=${id}`
      );
    } else {
      //http://propair.n1.iworklab.com:3002/advisor/educationListStudent
      return this.http.get<any>(`${apiUrls.baseUrl}/advisor/educationListStudent`);
    }
  }

  getActivitiesData(id?: string) {
    if (id) {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/admin/activitiesList?user=${id}`
      );
    } else {
      return this.http.get<any>(`${apiUrls.baseUrl}/admin/activitiesList`);
    }
  }

  addActivityData(payload) {
    return this.http.post<any>(
      `${apiUrls.baseUrl}/admin/addActivities`,
      payload
    );
  }
  editActivity(payload, id) {
    return this.http.put<any>(
      `${apiUrls.baseUrl}/admin/editActivity/${id}`,
      payload
    );
  }
  removeActivity(id) {
    return this.http.get<any>(`${apiUrls.baseUrl}/admin/removeActivity/${id}`);
  }

  getSkillListing(id?: string) {
    if (id) {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/admin/skillList?user=${id}`
      );
    } else {
      return this.http.get<any>(`${apiUrls.baseUrl}/admin/skillList`);
    }
  }

  getSoftSkills(pattrn){
     return this.http.get<any>(`${apiUrls.baseUrl}/educator/skillList?searchPattern=${pattrn}`);
  }
  addSkillData(payload) {
    return this.http.post<any>(`${apiUrls.baseUrl}/admin/addSkills`, payload);
  }

  onEditSkillData(payload) {
    return this.http.put<any>(`${apiUrls.baseUrl}/admin/editSkill`, payload);
  }
  onRemoveSkill(id: string) {
    return this.http.get<any>(`${apiUrls.baseUrl}/admin/removeSkill/${id}`);
  }
  // extrasdropsData() {
  //   return this.http.get<any>(
  //     `${apiUrls.baseUrl}/advisor/activityListDropdown`
  //   );
  // }
  // skillsdropsData() {
  //   return this.http.get<any>(`${apiUrls.baseUrl}/advisor/skillListdropdown`);
  // }
  getStudentProfile(id?: string) {
    if (id) {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/profileGeneralStudent?userId=${id}`
      );
    } else {
      return this.http.get<any>(`${apiUrls.baseUrl}/profileGeneralStudent`);
    }
  }

  getAdvisorProfile(id?: string) {
    if (id) {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/profileGeneralAdvisor?userId=${id}`
      );
    } else {
      return this.http.get<any>(`${apiUrls.baseUrl}/profileGeneralAdvisor`);
    }
  }
  //studentApi Ends

  //AdvisorProfileApi's
  editBiography(payload) {
    return this.http.put<any>(
      `${apiUrls.baseUrl}/advisor/editAdvisor/`,
      payload
    );
  }

  careerListingData(id?: string) {
    if (id) {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/advisor/carrerPathList?user=${id}&requestType=library`
      );
    } else {
      return this.http.get<any>(`${apiUrls.baseUrl}/advisor/carrerPathList`);
    }
  }
  addNewCareer(payload) {
    return this.http.post<any>(
      `${apiUrls.baseUrl}/advisor/addCarrerPath`,
      payload
    );
  }
  editNewCareer(id, payload) {
    return this.http.put<any>(
      `${apiUrls.baseUrl}/advisor/editCarrerPath/${id}`,
      payload
    );
  }
  removeCareerData(id) {
    return this.http.get<any>(
      `${apiUrls.baseUrl}/advisor/removeEmployment/${id}`
    );
  }
  getEducationList(id?: string) {
    if (id) {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/advisor/educationList?userId=${id}&isLibrary=true`
      );
    } else {
      return this.http.get<any>(`${apiUrls.baseUrl}/advisor/educationList`);
    }
  }
  addNewEducation(payload) {
    return this.http.post<any>(
      `${apiUrls.baseUrl}/advisor/addEducation`,
      payload
    );
  }
  editNewEducation(id, payload) {
    return this.http.put<any>(
      `${apiUrls.baseUrl}/advisor/editEducation/${id}`,
      payload
    );
  }
  removeEducationData(id) {
    return this.http.get<any>(
      `${apiUrls.baseUrl}/advisor/removeEducation/${id}`
    );
  }
  getEmployData(pattern) {
    return this.http.get<any>(
      `${apiUrls.baseUrl}/employersList?searchPattern=${pattern}`
    );
  }
  getAdviceAreasList(id?: string) {
    if (id) {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/advisor/adviceAreaList?user=${id}`
      );
    } else {
      return this.http.get<any>(`${apiUrls.baseUrl}/advisor/adviceAreaList`);
    }
  }
  getUpdateAdvice(payload) {
    return this.http.put<any>(
      `${apiUrls.baseUrl}/advisor/addAdviceArea`,
      payload
    );
  }
  removeAdviceArea(payload) {
    return this.http.put<any>(
      `${apiUrls.baseUrl}/advisor/removeAdviceArea`,
      payload
    );
  }

  careerListing() {
    return this.http.get<any>(`${apiUrls.baseUrl}/advisor/carrerDropdwonList`);
  }
  workExperienceListing() {
    return this.http.get<any>(`${apiUrls.baseUrl}/advisor/workExpereinceList`);
  }
  apprenticeListing() {
    return this.http.get<any>(`${apiUrls.baseUrl}/advisor/apprenticehipsList`);
  }
  startupListing() {
    return this.http.get<any>(`${apiUrls.baseUrl}/advisor/startupList`);
  }
  othersListing() {
    return this.http.get<any>(`${apiUrls.baseUrl}/advisor/otherList`);
  }
  inboxProfileFilter(payload: string, id?: string) {
    if (id) {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/inboxListingFilter?user=${id}&filterType=${payload}`
      );
    } else {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/inboxListingFilter?filterType=${payload}`
      );
    }
  }

  archiveProfileFilter(payload: string, id?: string) {
    if (id) {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/archiveMessageFilter?user=${id}&filterType=${payload}`
      );
    } else {
      return this.http.get<any>(
        `${apiUrls.baseUrl}/archiveMessageFilter?filterType=${payload}`
      );
    }
  }

  sectors(pattrn?: any) {
    if(pattrn){
      return this.http.get<any>(`${apiUrls.baseUrl}/getAllTags?searchPattern=${pattrn}`);

    }else{
      return this.http.get<any>(`${apiUrls.baseUrl}/getAllTags`)
    }
  }

  roles ( pattern){
    return this.http.get<any>(`${apiUrls.baseUrl}/typeOfJob?searchPattern=${pattern}`);
  }

  getCountryData() {
    return this.http.get<any>(`${apiUrls.baseUrl}/educator/countryList`);
  }

  getCities(payload) {
    return this.http.post<any>(`${apiUrls.baseUrl}/educator/cityList`, payload);
  }
  getSchools(pattrn) {
    return this.http.get<any>(
      `${apiUrls.baseUrl}/collegeList?searchPattern=${pattrn}`
    );
  }

  //advisor Profile ends

  //new_Signup_begin
  public signupFlowtoken: string;

  signupPassword(id, payload) {
    return this.http.post<any>(
      `${apiUrls.baseUrl}/advisor/setPassword/${id}`,
      payload
    );
  }

  signupFlow2(payload) {
    return this.http.put<any>(
      `${apiUrls.baseUrl}/advisor/updateProfile`,
      payload
    );
  }
  getPersonalInfo() {
    return this.http.get<any>(`${apiUrls.baseUrl}/admin/profileInfo`);
  }

  signupFlow3(payload) {
    return this.http.put<any>(`${apiUrls.baseUrl}/admin/editStudent`, payload);
  }

  //companyImage
  getCompany(payload) {
    return this.http.post(`${apiUrls.baseUrl}/segmentapi`, payload);
  }

  // stepper functionality

  tempTile(data) {
    this.title = data;
  }

  tempTag(data) {
    this.tag = data;
  }

  tempQuestion(data) {
    this.question = data;
  }

  // stepper bar  local storage functionality

  setTitle(info: ITitle) {
    localStorage.setItem("title", JSON.stringify(info));
    this.localTitle = info;
  }

  getTitle() {
    this.localTitle = JSON.parse(localStorage.getItem("title"));

    return this.localTitle;
  }

  removeTitle() {
    localStorage.removeItem("title");
  }

  /// tags
  setTag(info: ITag) {
    localStorage.setItem("tag", JSON.stringify(info));
    this.localTag = info;
  }

  getTag() {
    this.localTag = JSON.parse(localStorage.getItem("tag"));
    return this.localTag;
  }

  removeTag() {
    localStorage.removeItem("tag");
  }

  /// Slider
  setSliderData(info: ITag) {
    localStorage.setItem("slider", JSON.stringify(info));
    this.localTag = info;
  }

  getSliderData() {
    this.localTag = JSON.parse(localStorage.getItem("slider"));
    return this.localTag;
  }

  removeSliderData() {
    localStorage.removeItem("slider");
  }

  /// student Slider
  setStudentSliderData(info: ITag) {
    localStorage.setItem("student slider", JSON.stringify(info));
    this.localTag = info;
  }

  getStudentSliderData() {
    this.localTag = JSON.parse(localStorage.getItem("student slider"));
    return this.localTag;
  }

  removeStudentSliderData() {
    localStorage.removeItem("student slider");
  }

  /// question

  setQusetion(info: IQuestion) {
    localStorage.setItem("question", JSON.stringify(info));
    this.localQuestion = info;
  }

  getQuestion() {
    this.localQuestion = JSON.parse(localStorage.getItem("question"));
    return this.localQuestion;
  }

  removeQuestion() {
    localStorage.removeItem("question");
  }

  /// message

  setMessage(info: IMessage) {
    localStorage.setItem("message", JSON.stringify(info));
    this.localMessage = info;
  }

  getMessage() {
    this.localMessage = JSON.parse(localStorage.getItem("message"));
    return this.localMessage;
  }

  removeMessage() {
    localStorage.removeItem("message");
  }

  removeData() {
    localStorage.removeItem("title");
    localStorage.removeItem("tag");
    localStorage.removeItem("question");
    localStorage.removeItem("message");
  }

  getAllMessage() {
    this.Title = this.getTitle();
    this.Tag = this.getTag();
    this.Question = this.getQuestion();
    this.Message = this.getMessage();

    this.payload = {
      title: this.Title["title"],
      type: this.Title["type"],
      tags: this.Tag["tags"],
      sector: this.Tag["sector"],

      adviceAreas: this.Tag["adviceAreas"],
      typeJob: this.Tag["typeJob"],
      fieldStudy: this.Tag["fieldStudy"],
      employers: this.Tag["employers"],
      college: this.Tag["college"],
      location: this.Tag["location"],
      introduce: this.Question["introduce"],
      questions: this.Question["questions"],
      details: this.Question["details"],
      message: this.Message["message"],
    };

    return this.payload;
  }
}
