import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked ,HostListener} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/shared/common_services/http.service';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from "../../../lib/services/student.service"
import { AuthService } from "../../../lib/services/auth.service"
import { ElementScrollPercentage } from '../../../lib/element-scroll-percentage';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



declare var $

@Component({
	selector: 'app-new-student-message',
	templateUrl: './new-student-message.component.html',
	styleUrls: ['./new-student-message.component.scss']
})
export class NewStudentMessageComponent implements OnInit {

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
		private studentService: StudentService,
		private toasterService: ToastrService,
		private _fb: FormBuilder,
		private authService: AuthService,
		elementScrollPercentage: ElementScrollPercentage,
		private activatedRoute: ActivatedRoute,
	) {

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

		//this.selecetdValue = 'public';


		if (this.authService.getNewExchange()) {

			this.messageData = this.authService.getNewExchange()

			console.log(this.messageData, 'dataaaaaaaaaaaaaaa');
			if (this.messageData) {
				this.exchangeForm.patchValue({
					title: this.messageData.title,
					tags: this.messageData.tags,
					sector: this.messageData.sector,
					adviceAreas: this.messageData.adviceAreas,
					typeJob: this.messageData.typeJob,
					fieldStudy: this.messageData.fieldStudy,
					employers: this.messageData.employers,
					college: this.messageData.college,
					location: this.messageData.location,
					introduce: this.messageData.introduce,
					questions: this.messageData.questions,
					details: this.messageData.details,
					Title: this.messageData.Title,
					message: this.messageData.message,

				});
				this.focusOutFunction({});
			}
			

		}
		this.tags();
		this.adviceList();
		this.jobList();

		this.dummyFunction(this.selecetdValue);


		//jQuery time

		// this.getMessger()

	}

	dummyFunction(selecetdValue) {
		// console.log("selected--", selecetdValue)
		var current_fs, next_fs, previous_fs; //fieldsets
		var left, opacity, scale; //fieldset properties which we will animate
		var animating; //flag to prevent quick multi-click glitches
		var currentIndex = 0;
		var nextClicked = false;
		var privious = false;
		var previousClicked = false;
		$(".finish").hide();
		$(".previous").hide();
		$(".submit2").hide();
		$(".submit").hide();





		//$(".next").click(function() {
		$('.next').on('click', function () {
			$(".previous").show();

			if (!nextClicked) {
				// console.log("Inside if conditopn")
				currentIndex = 0;
			}
			else {
				if (currentIndex < 2) {
					// console.log('Inside else-----------');
					currentIndex += 1;
				}

			}

			if (currentIndex < 3) {
				if (animating) {
					return false;
				}
				animating = true;
				// console.log('currenyIndex', currentIndex);


				current_fs = $(this).parents(".submitting-buttons").prev("#msform").find(`fieldset:eq(${currentIndex})`);
				next_fs = $(this).parents(".submitting-buttons").prev("#msform").find(`fieldset:eq(${currentIndex})`).next();


				// console.log('next_fs', next_fs);

				//activate next step on progressbar using the index of next_fs
				$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
				//$("#progressbar li").eq($("fieldset").index(next_fs1)).addClass("active");

				//show the next fieldset
				next_fs.show();
				//hide the current fieldset with style
				current_fs.animate({ opacity: 0 }, {
					step: function (now, mx) {
						//as the opacity of current_fs reduces to 0 - stored in "now"
						//1. scale current_fs down to 80%
						scale = 1 - (1 - now) * 0.2;
						//2. bring next_fs from the right(50%)
						left = (now * 50) + "%";
						//3. increase opacity of next_fs to 1 as it moves in
						opacity = 1 - now;
						current_fs.css({
							'transform': 'scale(' + scale + ')',
							'position': 'absolute'
						});
						next_fs.css({ 'left': left, 'opacity': opacity });
					},
					duration: 800,
					complete: function () {
						current_fs.hide();
						animating = false;
					},
					//this comes from the custom easing plugin
					//	easing: 'easeInOutBack'
				});
			}
			if (currentIndex == 2) {
				$(".next").hide();
				if (selecetdValue == 'private') {
					// console.log('ngonit if');
					$(".submit2").show();
					$(".submit").hide();
				} else if (selecetdValue = 'public') {
					// console.log('ngonit else');
					$(".submit").show();
					$(".submit2").hide();

				}
			}
			else {

				// show finish button
			}
			nextClicked = true;

		});

		$(".previous").click(function () {
			$(".next").show();
			$(".finish").hide();
			$(".submit2").hide();
			$(".submit").hide();
 

			// console.log("================>>>>", currentIndex)

			if (!previousClicked) {

				currentIndex = currentIndex += 1;
				console.log("Inside if conditopn", currentIndex)
			}
			else {
				if (currentIndex > 1) {
					currentIndex -= 1;
					console.log('Inside else-----------', currentIndex);
					if(currentIndex == 1){
						$(".previous").hide();

					}
				}

			}

			//if(currentIndex < 3){
			if (animating) return false;
			animating = true;

			// current_fs = $(this).parent();
			// previous_fs = $(this).parent().prev();

			current_fs = $(this).parents(".submitting-buttons").prev("#msform").find(`fieldset:eq(${currentIndex})`);
			previous_fs = $(this).parents(".submitting-buttons").prev("#msform").find(`fieldset:eq(${currentIndex})`).prev();

			//de-activate current step on progressbar
			$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

			//show the previous fieldset
			previous_fs.show();
			//hide the current fieldset with style
			current_fs.animate({ opacity: 0 }, {
				step: function (now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale previous_fs from 80% to 100%
					scale = 0.8 + (1 - now) * 0.2;
					//2. take current_fs to the right(50%) - from 0%
					left = ((1 - now) * 50) + "%";
					//3. increase opacity of previous_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({ 'left': left });
					previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
				},
				duration: 800,
				complete: function () {
					current_fs.hide();
					animating = false;
				},
				//this comes from the custom easing plugin
				// easing: 'easeInOutBack'
			});

			//}

			//else{
			// show finish button
			//}
			previousClicked = true;

		});

		$(".submit").click(function () {
			return false;
		})

	}

	ngOnDestroy() {
		console.log('DESTROY >>>')
		// localStorage.setItem('Rahul',JSON.stringify(this.exchangeForm.value));.
		if (!this.isCancel) {

			this.authService.setNewExchange(this.exchangeForm.value)
		}
	}
	//   navigatetPage(){
	//     console.log("inside")
	// 	this.authService.removeNewExchange();
	// 	this.router.navigateByUrl('student-module/dashboard/Step2');
	//   }

	scrollToBottom(): void {
		try {
		  console.log(this.fixedBox.nativeElement.scrollHeight, 'scroll to bottom');
		  
			this.fixedBox.nativeElement.scrollTop = this.fixedBox.nativeElement.scrollHeight + 100;
		} catch(err) { 
		  console.log(err, 'err');
		  
		}                 
	}

	

	getMessger() {
		this.httpService.getAllMessageExchange().subscribe(response => {
			// console.log(response, 'response');

		})
	}

	lastPercent = 0;
	onScroll(event) {
	  // console.log(this.totalPages, 'total pages');
	  let scrollPercent = this.elementScrollPercentage.getScroll(this.fixedBox.nativeElement);
	  // console.log(scrollPercent, 'scrollPercentage');
  
	  if (scrollPercent < this.lastPercent && scrollPercent <= 11 && scrollPercent >= 10) {
		if (this.currentPage + 1 <= this.totalPages) {
		  this.currentPage = this.currentPage + 1;
		}
  
	  } else {
		this.lastPercent = scrollPercent;
	  }
  
  
	}




	tags() {
		this.studentService.sector().subscribe(data => {

			this.sectorTags = data['data']
			// console.log(this.sectorTags, 'tags');

		})
	}

	adviceList() {
		this.studentService.adviceList().subscribe(data => {
			this.advice = data['data']
			// console.log(this.advice, 'advice area');

		})
	}

	change(data) {
		this.formData = this.exchangeForm.value.tags
		console.log(this.formData);



	}

	navigate() {
		this.isCancel = true;
		localStorage.removeItem('newExchange');
		// console.log('navigate');
		this.authService.removeNewExchange();
		this.router.navigateByUrl('student-module/dashboard/student-message')

	}

	focusOutFunction(data) {
		if(this.exchangeForm.value.tags) {
			this.formData = this.exchangeForm.value.tags
			console.log(this.formData, 'focus out');
			this.toArray = this.exchangeForm.value.tags.split(",");
			console.log(this.toArray, 'to array');
			console.log(this.toArray.length, 'to array length');
			
	
			if (this.toArray.length > 0) {
				this.show = true;
				// console.log('inside iffffff');
	
			} else {
				// console.log("elseeee")
				this.show = false
			}
		}




	}

	type(value) {
		this.selecetdValue = value;
		// console.log("selected value-", this.selecetdValue)
		this.dummyFunction(this.selecetdValue);
		// this.dropDownValue = value
		// //   console.log(this.dropDownValue,'drop down');

		// if (this.dropDownValue == "private") {
		// 	this.privateValue = this.dropDownValue
		// 	//   console.log(this.privateValue,'private Value');

		// } else if (this.dropDownValue == "public") {
		// 	this.publicValue = this.dropDownValue
		// 	//   console.log(this.publicValue,'public value');

		// }
		// //   console.log(this.dropDownValue);




	}

	title() {

		// console.log('hahahaaha');
		// console.log(this.exchangeForm.value.title);
		if (this.exchangeForm.value.title.length > 200) {
			return this.toasterService.error('Error', 'You can not exceed 200 character')
		  }

		if (this.exchangeForm.value.title) {
			this.titleValue = this.exchangeForm.value.title

		}


	}

	finish() {
		this.isCancel = true;
		localStorage.removeItem('newExchange');
		// console.log('navigate');
		this.authService.removeNewExchange();

		// console.log('iiiiiii');
		// console.log(this.exchangeForm.value);
		this.exchangeForm.patchValue({ isDraft: false });
		if (this.selecetdValue == 'private') {
			this.exchangeForm.patchValue({ type: 'private' })
		} else if (this.selecetdValue == 'public') {

			this.exchangeForm.patchValue({ type: 'public' })
		}

		this.studentService.newExchange(this.exchangeForm.value).subscribe(data => {
			console.log(data, 'finish');
			this.router.navigateByUrl('student-module/dashboard/student-message')

		}, err => {
			this.toasterService.error('error', err.error.message)

		}
		)

	}

	draft() {

		this.isCancel = true;
		localStorage.removeItem('newExchange');
		// console.log('navigate');
		this.authService.removeNewExchange();

		// console.log('draft function');
		// console.log(this.exchangeForm.value, '=============>>>>>');
		this.exchangeForm.patchValue({ isDraft: true });
		if (this.selecetdValue == 'private') {
			this.exchangeForm.patchValue({ type: 'private' })
		} else if (this.selecetdValue == 'public') {

			this.exchangeForm.patchValue({ type: 'public' })
		}
		this.studentService.saveAsDraft(this.exchangeForm.value).subscribe(data => {
			if(data['status']== 200){

				this.toasterService.success('Success', data['message'])


				this.router.navigateByUrl('student-module/dashboard/student-message')
			}
			// console.log(data, 'ddddddddddddddddd');


		}, err => {
			this.toasterService.error('error', err.error.message)
		}
		)
	}


	
	delete(tag,i){
		console.log(tag,'tag');
		console.log(i,'i');

		this.toArray.splice(i,1);
		
		this.exchangeForm.patchValue({'tags': this.toArray.join(',')});
		this.focusOutFunction({});


	}

	filterFunction(value){
		console.log(value,'vvvvvvvvvvvv');
		if(value.length>5){
				this.showSearch = true;
				this.studentService.collegeList(value).subscribe(data=>{
				this.collegeLists = data['data'].universityData
				console.log(this.collegeLists,'college list');
				
			})
		} else {
			this.showSearch = false;
		}
	}


	jobList(){
		this.studentService.jobList().subscribe(data=>{
			this.jobData = data['data']
			console.log(this.jobData,'job data');
			
		})
	}

	employersList(value){
		console.log(value,'vvvvvvvvvvvv');
		if(value){
			this.showSearch = true;
			this.studentService.employersList(value).subscribe(data=>{
				this.employersData = data['data']
				console.log(this.employersData,'employesrs data');
				
			})

		}else{
			this.showSearch = false;

		}
	}




}
