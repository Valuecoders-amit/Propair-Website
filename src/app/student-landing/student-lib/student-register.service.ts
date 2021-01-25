import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class StudentRegisterService {

  constructor(private http:HttpClient) { 

  }

  studentRegister(formData){
     return this.http.post(`${environment.apiURL}/student/register`,formData)
  }
}
