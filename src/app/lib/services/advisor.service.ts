import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrls } from '../../config/apiUrl';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IUserInfo } from '../interfaces/IUserInfo'
import { INewMessage } from '../interfaces/InewMessage'
import { Observable, BehaviorSubject } from 'rxjs';
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AdvisorService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) { }



  private userDatas = new BehaviorSubject(false);
  message_userDatas = this.userDatas.asObservable();
      
  userData(data) {
    this.userDatas.next(data);
   }

  updateAdvisorProfile(formData:any){
    return this.http.put(`${apiUrls.baseUrl}${apiUrls.updateAdvisorProfile}`,formData)
  }

  updateAdvisorPassword(formData:any){
    return this.http.put(`${apiUrls.baseUrl}${apiUrls.updateAdvisorPassword}`,formData)
  }

  inviteLink(){
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.inviteLink}`)
  }

  advisorInfo(){
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.advisorInfo}`)
  }

  advisorViews(formData:any){
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.advisorViews}`,formData)
  }

  advisorViewsList(formData:any){
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.advisorViewsList}`,formData)
  }


  updateLogo(payload , val){
    if(val == 1){
    return this.http.post<any>(`${apiUrls.baseUrl}/admin/genderImagesProfesional` , payload);
    }
    else {
      return this.http.post<any>(`${apiUrls.baseUrl}/admin/genderImagesStudent` , payload);
    }
  }

  
  advisorRegisterationThrougReferral(formData:any){
    return this.http.post(`${apiUrls.baseUrl}${apiUrls.advisorRegisterThroughReferral}`,formData)
  }


  checkInboxMessage(id) {
    return this.http.get(`${apiUrls.baseUrl}${apiUrls.checkInboxMessage}/${id}`);
  }

  
  // updateGender(payload){
  //   return this.http.put<any>(`${apiUrls.baseUrl}/admin/genderImages` , payload);
  // }
}
