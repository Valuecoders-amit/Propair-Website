import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class educatorSettingsService {
  id: any;
  constructor(private http: HttpClient) {
    const token = this.getToken();
    const currentToken = this.getDecodedAccessToken(token);
    this.id = currentToken.id.userId;
  }

  /* Get Current User Details */
  getCurrentUser() {
    return this.http.get<any>(
      `${environment.apiURL}/user/get-user/` + `${this.id}`
    );
  }

  /* Update user Info */
  updateUser(newdata) {
    return this.http.put<any>(
      `${environment.apiURL}/educator/update/` + `${this.id}`,
      newdata
    );
  }

  /* GET TOKEN INFO */
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  getToken() {
    return localStorage.getItem("token");
  }
  checkCurrentPassword(payload) {
    return this.http.post<any>(
      `${environment.apiURL}/user/checkCurrentPassword/` + `${this.id}`,payload
    );
  }

  updatePassword(payload) {
    return this.http.put<any>(
      `${environment.apiURL}/user/update-password/`,payload);
  }

  authenticate(email, password) {
    return this.http.post<any>(`${environment.apiURL}/user/login`, {
      email,
      password
    });
  }
  UploadSchoolImage(fileUrl) {
    return this.http.post<any>(
      `${environment.apiURL}/educator/upload`,
      fileUrl
    );
  }
  getSchoolImage() {
    return this.http.get<any>(
      `${environment.apiURL}/educator/image/` + `${this.id}`
    );
  }
}
