import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked ,HostListener} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateRef} from '@angular/core';
import { NavigationEnd } from '@angular/router';

import { HttpService } from 'src/app/shared/common_services/http.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {StudentService } from '../../../lib/services/student.service'

@Component({
  selector: 'app-advisor-new-signup',
  templateUrl: './advisor-new-signup.component.html',
  styleUrls: ['./advisor-new-signup.component.scss']
})
export class AdvisorNewSignupComponent implements OnInit {

  currentResource: string ='dashboard';
  
  selectedOption: number;

  public show1 = false;
  public show2 = false;
  public show3 = false;
  public show4 = false;




	innerScroll = 0;
	myScrollContainer: any;
	public jobData:any;
	public employersData:any

	//dropdown pagination
	currentPage: number;
	totalPages: number;
	pageSize = 20;

	@ViewChild('fixedBox', { static: false }) fixedBox: ElementRef;

	@HostListener('window:unload')
	private onUnload(): void {
		localStorage.removeItem('name');
	}

	// public exchangeForm: FormGroup;

	public sectorTags: any;
	public advice: any;
	public collegeLists:any
	public titleValue: any;
	public dropDownValue: any;
	public valueSelected: string;
	public selecetdValue: string = 'public';
	userFilter: any = '';
	public showSearch = false;
	// public privateValue: any;
	// public publicValue: any;


	public messageData: any;

	public questionTags: string[] = ['abc', 'xyz', 'pqr']
	public privious = false;
	public data: any = [];
	public toArray = [];
	public private = false;
	public public = false;
	public show = false;

	public formData: any;
	public isCancel: boolean;
	//   puclic array:any=[]

  constructor(
    private router: Router,
		private httpService: HttpService,
		private toasterService: ToastrService,
		private _fb: FormBuilder,
    public studentService: StudentService,
		private activatedRoute: ActivatedRoute,
  ) {


    this.selectedOption = 0;
    this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.url.split('/')[4];  
        console.log(this.currentResource,'currentResource');
        
      }
 
    }) 
   }

  ngOnInit() {
  }

  openNav(){
    document.getElementById("mySidenav").style.width = "100%";
  }
  closeNav(){
    document.getElementById("mySidenav").style.width = "0";
  }

}
