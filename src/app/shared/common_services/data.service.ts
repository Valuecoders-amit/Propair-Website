import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }
  getToken(){
    return localStorage.getItem("token")
  }
  dailyForecast() {
    return this._http.get("http://localhost:3000/message")
  }
}
