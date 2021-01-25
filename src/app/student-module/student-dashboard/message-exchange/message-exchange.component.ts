import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked ,HostListener} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateRef} from '@angular/core';
import { NavigationEnd } from '@angular/router';

import { HttpService } from 'src/app/shared/common_services/http.service';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from "../../../lib/services/student.service"
import { AuthService } from "../../../lib/services/auth.service"
import { ElementScrollPercentage } from '../../../lib/element-scroll-percentage';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

declare var $


@Component({ 
  selector: 'app-message-exchange',
  templateUrl: './message-exchange.component.html',
  styleUrls: ['./message-exchange.component.scss']
})
export class MessageExchangeComponent implements OnInit {

  currentResource: string ='dashboard';
  
  selectedOption: number;

  public show1 = false;
  public show2 = false;
  public show3 = false;
  public show4 = false;




	innerScroll = 0;
	myScrollContainer: any;
	private elementScrollPercentage: ElementScrollPercentage;
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

	public exchangeForm: FormGroup;

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
		public studentService: StudentService,
		private toasterService: ToastrService,
		private _fb: FormBuilder,
		private authService: AuthService,
		elementScrollPercentage: ElementScrollPercentage,
		private activatedRoute: ActivatedRoute,
	) {


    this.selectedOption = 0;
    this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd ) {
        this.currentResource = event.url.split('/')[4];       
      }
 
    })  


		this.currentPage = 1;

		this.elementScrollPercentage = elementScrollPercentage;

		this.exchangeForm = this._fb.group({

			title: [null, [Validators.required,Validators.minLength(0), Validators.maxLength(199)]],
			tags: [null, [Validators.required]],
			sector: [null, [Validators.required]],

			adviceAreas: [null, [Validators.required]],
			typeJob: [null],
			fieldStudy: [null],
			employers: [null],
			college: [null],
			location: [null],
			introduce: [null, [Validators.required]],
			questions: [null, [Validators.required]],
			details: [null, [Validators.required,Validators.minLength(0), Validators.maxLength(199)]],
			Title: [null, [Validators.required]],
			message: [null, [Validators.required ,Validators.minLength(0), Validators.maxLength(199)]],
			isDraft: new FormControl(''),
			type: new FormControl('')






		});

	}

	ngOnInit() {



	}






}

