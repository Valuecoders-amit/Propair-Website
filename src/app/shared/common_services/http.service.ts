import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  
  constructor(private http: HttpClient) {
   }

  /* Group-Analytics Get All details */
  getAllMessageExchange() {
    return this.http.get<any>(`${environment.apiURL}/message/getAllMessage`);
  }
  getFilteredMessageExchange(payload) {
    return this.http.post<any>(
      `${environment.apiURL}/message/getFilteredMessage`,
      payload
    );
  }
  sendMessage(payload) {
    return this.http.post<any>(
      `${environment.apiURL}/message/getFilteredMessage`,
      payload
    );
  }
  
}
