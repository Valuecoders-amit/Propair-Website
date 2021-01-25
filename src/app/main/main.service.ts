import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrls } from '../config/apiUrl';


@Injectable({
	providedIn: 'root'
})
export class MainService {

	constructor(private http: HttpClient) { }
	
	sendEmail(payload){
		return this.http.post<any>(`${apiUrls.baseUrl}/advisor/registerAdvisor`, payload);
	}

}