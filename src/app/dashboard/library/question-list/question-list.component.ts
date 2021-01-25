import { Component, OnInit } from "@angular/core";
declare var $;
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../lib/services/auth.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { StudentService } from "../../../lib/services/student.service";
import { PageChangedEvent } from "ngx-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: "app-question-list",
  templateUrl: "./question-list.component.html",
  styleUrls: ["./question-list.component.scss"],
})
export class QuestionListComponent implements OnInit {
  quickSearchTip: boolean;
  questionTypeForm: FormGroup;
  searchFilter: FormGroup;
  searchForm: FormGroup;
  public messageInfo: any = [];
  userFilter: any = "";
  public checkbox: any = [];
  public data: any;
  public currentPage = 0;
  public school: any = "my";
  public schoolValue: any;
  public sectorTags: any = [];
  public emplaoyerData: any = [];
  public typeOfJobData: any;
  public collegesData: any;
  public fieldOfStudyData: any;
  public SectorTagsArray: any;
  public employerTagsArray: Array<any> = [];
  public typeOfJobTagsArray: any;
  public collegesTagsArray: Array<any> = [];
  public fieldOfStudyTagsArray: Array<any> = [];
  yearTags:any ;
  yearArray: Array<any> = [];
  sectorArray: Array<any> = [];
  employerArray: Array<any> = [];
  typeOfJobArray: Array<any> = [];
  collegesArray: Array<any> = [];
  fieldOfStudyArray: Array<any> = [];
  searchArray: Array<any> = [];
  studentPoster: Array<any> = [];
  formArray: Array<any> = [];
  advsiorLocationArray: Array<any> = [];
  studentLocationArray: Array<any> = [];
  public params: string;
  public employer: string;
  public typeOfJob: string;
  public university: string;
  public fieldOfStudy: string;
  public checkObj: any = {};
  public searchValue = "";
  public sectorSearchValue = "";
  public employeeSearchValue = "";
  public typeOfJobSearchValue = "";
  public collegeSearchValue = "";
  public fieldOfStudySearchValue = "";
  public addAdvisorLocation = "";
  public addStudentLocation = "";
  public dropdownField = "all";
  public schoolSelectedValue = "my"
  public statusDataValue = "live"

  public advisorForm: FormGroup;
  public advisorValue: any;
  public advisorLocationParams = "";
  public studentLocationParams = "";
  public yearTagValue :any;
  public form : any;
  public paramsUrl: any;
  public paramsEmploye: any;
  public paramsTypeOfJob: any;
  public paramsUniversity: any;
  public paramsFieldOfStudy: any;
  public paramsYear: any;
  public paramsForm: any;
  public paramsStudentLocation: string;
  public sortValue :any;
  public formListdata :any;
  // public advisorLocation : any;
  // public studentLocation : any;
  public arrysOfLocation : any;
  public arrysOfstudentLocation : any;
  public statusValuePrams :any;
  public schoolValueParams : any;
  //filter variables
  public sectorSearchData: any;
  public employeeSearchData: any;
  public typeOfJobSearchData: any;
  public collegeSearchData: any;
  public fieldOfStudySearchData: any;

  formTags: Array<any> = ["1 SM", "5 DFF", "3d", "3gg", "4fr-fer"];
  payload: any = {};
  employerTags: Array<any> = [];
  public test = [];
  public editEmployee: boolean = false;
  public editSector: boolean = false;
  public editTypeOfJOb: boolean = false;
  public editCollege: boolean = false;
  public editFieldOfStudy: boolean = false;

  public hideSectorDiv: boolean = false;
  public hideEmployeeDiv: boolean = false;
  public hideTypeOfJobDiv: boolean = false;
  public hideCollegeDiv: boolean = false;
  public hideFieldOfStudyDiv: boolean = false;
  public noData: boolean = false;
  public newClass: boolean = false;
  public studentForm = [];
  public options = {
    types: ["(cities)"],
  };

  public options2 = {
    types: ["(cities)"],
  };
  public libraryTags: any;

  more: boolean = false;
  value: any;
  userData: any;
  public sideTags: any = [];

  public queryForm = {
    status : 'live', 
    school : 'my',
    searchText: "",
    sort: "all",
    pageNumber: 0,
    location: "",
    studentLocation: "",
  };

  public filterDropdownData: any;

  public schoolDataValue: Array<any> = [];

  messageCount: number;
  public filterForm: any = {};

  constructor(
    private authservice: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private studentService: StudentService,
    private SpinnerService: NgxSpinnerService,
    private activeRoute: ActivatedRoute
  ) {
    this.questionTypeForm = this.formBuilder.group({
      questionType: ["live", Validators.required],
    });

    this.searchForm = formBuilder.group({
      searchText: [null, Validators.required],
      searchFilter: formBuilder.array([]),
    });

    this.advisorForm = this.formBuilder.group({
      advisorLocation: [null, Validators.required],
    });

    this.params = this.activeRoute.snapshot.queryParamMap.get("sector");
    this.employer = this.activeRoute.snapshot.queryParamMap.get("employer");
    this.typeOfJob = this.activeRoute.snapshot.queryParamMap.get("typeOfJob");
    this.university = this.activeRoute.snapshot.queryParamMap.get("university");
    this.fieldOfStudy = this.activeRoute.snapshot.queryParamMap.get("fieldOfStudy");
    this.advisorLocationParams = this.activeRoute.snapshot.queryParamMap.get("advisorLocation");
    this.studentLocationParams = this.activeRoute.snapshot.queryParamMap.get("studentLocation");
    this.yearTagValue = this.activeRoute.snapshot.queryParamMap.get("year");
    this.form = this.activeRoute.snapshot.queryParamMap.get("form");
    this.sortValue = this.activeRoute.snapshot.queryParamMap.get("sort");
    this.statusValuePrams = this.activeRoute.snapshot.queryParamMap.get("status");
    this.schoolValueParams = this.activeRoute.snapshot.queryParamMap.get("school");

  }

  ngOnInit() {
    this.userData = this.authservice.getUserInfo();
    this.sortTags()
    this.tags();
    this.SectorTags();
    this.employersTags();
    this.typeOFJoBTags();
    this.collegesTags();
    this.fieldOfStudyTags();
    this.advisorLocationTags();
    this.studentLocationTags();
    this.getYearTags();
    this.getForm()
    // this.schoolTags()


    if (
      !this.employer &&
      !this.params &&
      !this.typeOfJob &&
      !this.university &&
      !this.fieldOfStudy &&
      !this.advisorLocationParams &&
      !this.studentLocationParams &&
      !this.yearTagValue &&
      !this.sortValue &&
      !this.statusValuePrams && 
      !this.form
      
    ) {
      this.getLibraryListing(this.queryForm, this.payload);
    }
    this.test.length = 4;
    this.checkbox = [];
  }

  sortTags(){
    if(this.sortValue && this.statusValuePrams && this.schoolValueParams){
      this.dropdownField = this.sortValue
      this.statusDataValue = this.statusValuePrams
      this.schoolSelectedValue = this.schoolValueParams
      this.queryForm["sort"] = this.sortValue;
      this.queryForm["school"] = this.schoolValueParams;
      this.queryForm["status"] = this.statusValuePrams;
      this.checkObj['sort'] = this.sortValue
      this.checkObj['school'] = this.schoolValueParams
      this.checkObj['status'] = this.statusValuePrams
      this.router.navigate([], { queryParams: this.checkObj });
      this.getLibraryListing(this.queryForm, this.payload);
    }else{
      this.dropdownField = "all"
      this.statusDataValue = "live"
      this.schoolSelectedValue = "my"
      this.queryForm["sort"] = "all"
      this.queryForm["school"] = "my";
      this.queryForm["status"] = "live"
      this.checkObj['sort'] = "all"
      this.checkObj['school'] = "my"
      this.checkObj['status'] = "live"
      this.router.navigate([], { queryParams: this.checkObj });
      this.getLibraryListing(this.queryForm, this.payload);
    }
  }

  schoolData(value){
    this.schoolSelectedValue = value
    this.queryForm["school"] = value;
    this.checkObj['school'] = value
    this.router.navigate([], { queryParams: this.checkObj });
    this.getLibraryListing(this.queryForm, this.payload);
  } 

  statusValue(value){
    if(value == 'live'){
      this.queryForm["status"] = 'live';
      this.checkObj['status'] = 'live' ;
      this.statusDataValue = 'live'
      this.router.navigate([], { queryParams: this.checkObj });
      this.getLibraryListing(this.queryForm, this.payload);

    }else{
      this.queryForm["status"] = value;
      this.checkObj['status'] = value ;
      this.statusDataValue = value
      this.router.navigate([], { queryParams: this.checkObj });
      this.getLibraryListing(this.queryForm, this.payload);
    }
  }


  schoolTags(){
    if(this.statusValuePrams){
      this.statusDataValue = this.statusValuePrams
      this.queryForm["status"] = this.statusValuePrams;
      this.checkObj['status'] = this.statusValuePrams
      this.router.navigate([], { queryParams: this.checkObj });
      this.getLibraryListing(this.queryForm, this.payload);
    }else{
      this.statusDataValue = "live"
      this.queryForm["status"] = "live"
      this.checkObj['status'] = "live"
      this.router.navigate([], { queryParams: this.checkObj });
      this.getLibraryListing(this.queryForm, this.payload);
    }
  }

  getForm(){
    this.studentService.getFormList().subscribe(data =>{
      this.formListdata = data['data']   
      let i: number = 1;
      this.formListdata = this.formListdata.map((el) => {
        let obj = {
          _id: i,
          name: el,
        };
        i++;
        return obj;
      });


      if (this.form) {
        let formMatch = [];
        let paramsArray = this.form.split(",");
  
        if (paramsArray && paramsArray.length) {
          paramsArray.forEach((el) => {
              let check = this.formListdata.some (item => item.name == el)
              if(check)  formMatch.push(el);
              else {
                this.formListdata.push({ name : el});
                formMatch.push(el)
            }
            });
      
            formMatch.forEach((element) => {
            this.filterForm[element] = true;
            this.changeValue(element, 2);
            })
        }
      }

    })

  }

  
  getYearTags() {

    this.yearTags = ["7", "8", "9", "10", "11", "12", "13"];

    let i: number = 1;
    this.yearTags = this.yearTags.map((el) => {
      let obj = {
        _id: i,
        name: el,
      };
      i++;
      return obj;
    });


    if (this.yearTagValue) {
      let yearMatch = [];
      let paramsArray = this.yearTagValue.split(",");

      if (paramsArray && paramsArray.length) {
        paramsArray.forEach((el) => {
            let check = this.yearTags.some (item => item.name == el)
            if(check)  yearMatch.push(el);
            else {
              this.yearTags.push({ name : el});
              yearMatch.push(el)
          }
          });
    
          yearMatch.forEach((element) => {
          this.filterForm[element] = true;
          this.changeValue(element, 1);
          })
      }
    }

  }

  getLibraryListing(query: any, payload: any) {
    this.SpinnerService.show();

    this.authservice.getLibraryList(this.queryForm, payload).subscribe(
      (data) => {
        this.SpinnerService.hide();
        if (data["status"] == 200) {
          this.schoolDataValue = data["data"]["messages"];
          this.messageCount = data["data"]["count"];
          this.noData = true;
          this.schoolDataValue.forEach((item) => {
            let duration = moment.duration(
              moment(new Date()).diff(moment(item.createdAt))
            );
            if (duration["_data"].seconds > 0) {
              item["duration"] = `answered ${duration["_data"].seconds} ${
                duration["_data"].seconds > 1 ? "seconds" : "second"
              } ago`;
            }
            if (duration["_data"].minutes > 0) {
              item["duration"] = `answered ${duration["_data"].minutes} ${
                duration["_data"].minutes > 1 ? "minutes" : "minute"
              } ago`;
            }
            if (duration["_data"].hours > 0) {
              item["duration"] = `answered ${duration["_data"].hours} ${
                duration["_data"].hours > 1 ? "hours" : "hour"
              } 
            ${
              duration["_data"].minutes > 0
                ? duration["_data"].minutes == 1
                  ? `${duration["_data"].minutes} minute`
                  : `${duration["_data"].minutes} minutes`
                : ""
            } ago`;
            }
            if (duration["_data"].days > 0) {
              item["duration"] = `answered ${duration["_data"].days} ${
                duration["_data"].days > 1 ? "days" : "days"
              } ago`;
            }
          });
        }
      },
      (err) => {
        this.SpinnerService.hide();
        this.schoolDataValue = [];
        this.noData = true;
        this.messageCount = 0;
      
      }
    );
  }

  showLess(data) {
    data["more"] = false;
  }

  showMore(data) {
    data["more"] = true;
    this.newClass = true;
  }

  SectorTags() {
    this.authservice.getSctorDummyList().subscribe((data) => {
      this.sectorTags = data["data"];

      if (this.params) {
        let sectorMatch = [];
        let paramsArray = this.params.split(",");

        if (paramsArray && paramsArray.length) {
          paramsArray.forEach((el) => {
              let check = this.sectorTags.some (item => item.name == el)
              if(check)  sectorMatch.push(el);
              else {
                this.sectorTags.push({ name : el});
                sectorMatch.push(el)
            }
            });
      
            sectorMatch.forEach((element) => {
            this.filterForm[element] = true;
            this.changeValue(element, 3);
            })
        }
      }
    });
  }

  sectorSearch() {
    if (!this.sectorSearchValue) {
      this.hideSectorDiv = false;
    } else {
      this.hideSectorDiv = true;

      this.authservice
        .getSctorDummyList(this.sectorSearchValue)
        .subscribe((data) => {
          this.sectorSearchData = data["data"];
         
        });
    }
  }

  submitSector(value) {
    this.sectorSearchValue = value;
    this.hideSectorDiv = false;
    this.sectorTags.push({ name: value });
    this.filterForm[this.sectorSearchValue] = true;
    this.changeValue(this.sectorSearchValue, 8);
  }

  employersTags() {
    this.authservice.getEmployersDummyList().subscribe((data) => {
      this.emplaoyerData = data["data"];
      if (this.employer) {
        let employeMatch = [];
        let employeParamsArray = this.employer.split(",");
        if (employeParamsArray && employeParamsArray.length) {
            employeParamsArray.forEach((el) => {
              let check = this.emplaoyerData.some (item => item.EmployerNames == el)
              if(check)  employeMatch.push(el);
              else {
                this.emplaoyerData.push({ EmployerNames : el});
              employeMatch.push(el)
            }
            });
      
            employeMatch.forEach((element) => {
            this.filterForm[element] = true;
            this.changeValue(element, 4);
            })
        }
      }
    });
  }

  employersSearch() {
    if (!this.employeeSearchValue) {
      this.hideEmployeeDiv = false;
    } else {
      this.hideEmployeeDiv = true;

      this.authservice
        .getEmployersDummyList(this.employeeSearchValue)
        .subscribe((data) => {
          this.employeeSearchData = data["data"];
        });
    }
  }

  submitEmploye(value) {
    this.employeeSearchValue = value;
    this.hideEmployeeDiv = false;

    let check = this.emplaoyerData.find((el) => el.EmployerNames == value);

    if (!check) {
      this.emplaoyerData.push({ EmployerNames: value });
    }

    this.filterForm[this.employeeSearchValue] = true;
    this.changeValue(this.employeeSearchValue, 4);

  }



  typeOFJoBTags() {
    this.authservice.getTypeOdJObDummyList().subscribe((data) => {
      this.typeOfJobData = data["data"];

      if (this.typeOfJob) {
        let typeOfJobDataMatch = [];
        let typeOfJobParamsArray = this.typeOfJob.split(",");

        if (typeOfJobParamsArray && typeOfJobParamsArray.length) {
          typeOfJobParamsArray.forEach((el) => {
              let check = this.typeOfJobData.some (item => item.typesOfJob == el)
              if(check)  typeOfJobDataMatch.push(el);
              else {
                this.typeOfJobData.push({ typesOfJob : el});
                typeOfJobDataMatch.push(el)
            }
            });
      
            typeOfJobDataMatch.forEach((element) => {
            this.filterForm[element] = true;
            this.changeValue(element, 5);
            })
        }

      
      }
    });
  }

  typeOFJoBTSearch() {
    if (!this.typeOfJobSearchValue) {
      this.hideTypeOfJobDiv = false;
    } else {
      this.hideTypeOfJobDiv = true;

      this.authservice
        .getTypeOdJObDummyList(this.typeOfJobSearchValue)
        .subscribe((data) => {
          this.typeOfJobSearchData = data["data"];
          // this.temp()
        });
    }
  }

  submitTypeOfJob(value) {
    this.typeOfJobSearchValue = value;
    this.hideTypeOfJobDiv = false;
    this.typeOfJobData.push({ typesOfJob: value });
    this.filterForm[this.typeOfJobSearchValue] = true;
    this.changeValue(this.typeOfJobSearchValue, 10);
  }

  collegesTags() {
    this.authservice.getCollegeDummyList().subscribe((data) => {
      this.collegesData = data["data"];

      if (this.university) {
        let universityDataMatch = [];
        let universityParamsArray = this.university.split(",");

        if (universityParamsArray && universityParamsArray.length) {
          universityParamsArray.forEach((el) => {
              let check = this.collegesData.some (item => item.university == el)
              if(check)  universityDataMatch.push(el);
              else {
                this.collegesData.push({ university : el});
                universityDataMatch.push(el)
            }
            });
      
            universityDataMatch.forEach((element) => {
            this.filterForm[element] = true;
            this.changeValue(element, 6);
            })
        }
      
      }
    });
  }

  collegeSearch() {
    if (!this.collegeSearchValue) {
      this.hideCollegeDiv = false;
    } else {
      this.hideCollegeDiv = true;

      this.authservice
        .getCollegeDummyList(this.collegeSearchValue)
        .subscribe((data) => {
          this.collegeSearchData = data["data"];
         
        });
    }
  }
  submitCollege(value) {
    this.collegeSearchValue = value;
    this.hideCollegeDiv = false;

    let check = this.collegesData.find((el) => el.university == value);

    if (!check) {
      this.collegesData.push({ university: value });
    }

    this.filterForm[this.collegeSearchValue] = true;
    this.changeValue(this.collegeSearchValue, 6);
  }


  fieldOfStudyTags() {
    this.authservice.getFieldOfStudyDummyList().subscribe((data) => {
      this.fieldOfStudyData = data["data"];

      if (this.fieldOfStudy) {
        let fieldOfStudyDataDataMatch = [];
        let fieldOfStudyDataParamsArray = this.fieldOfStudy.split(",");

        if (fieldOfStudyDataParamsArray && fieldOfStudyDataParamsArray.length) {
          fieldOfStudyDataParamsArray.forEach((el) => {
              let check = this.fieldOfStudyData.some (item => item.name == el)
              if(check)  fieldOfStudyDataDataMatch.push(el);
              else {
                this.fieldOfStudyData.push({ name : el});
                fieldOfStudyDataDataMatch.push(el)
            }
            });
      
            fieldOfStudyDataDataMatch.forEach((element) => {
            this.filterForm[element] = true;
            this.changeValue(element, 7);
            })
        }

      }
    });
  }

  fieldOfStudySearch() {
    if (!this.fieldOfStudySearchValue) {
      this.hideFieldOfStudyDiv = false;
    } else {
      this.hideFieldOfStudyDiv = true;

      this.authservice
        .getFieldOfStudyDummyList(this.fieldOfStudySearchValue)
        .subscribe((data) => {
          this.fieldOfStudySearchData = data["data"];
        });
    }
  }

  submitFieldOfStudy(value) {
    this.fieldOfStudySearchValue = value;
    this.hideFieldOfStudyDiv = false;

    let check = this.fieldOfStudyData.find((el) => el.name == value);

    if (!check) {
      this.fieldOfStudyData.push({ name: value });
    }

    this.filterForm[this.fieldOfStudySearchValue] = true;
    this.changeValue(this.fieldOfStudySearchValue, 7);

   
  }

  //AdvisorLocationStart

  advisorLocationTags(){
    if(this.advisorLocationParams){
      this.addAdvisorLocation = this.advisorLocationParams
      this.advsiorLocationArray.push(this.advisorLocationParams);
      this.queryForm["location"] = this.advisorLocationParams;
      this.getLibraryListing(this.queryForm, this.payload);
    }
    
  }
  //Ends

  // student Location start 
  studentLocationTags(){
    if(this.studentLocationParams){
      this.addStudentLocation = this.studentLocationParams
      this.studentLocationArray.push(this.studentLocationParams);
      this.queryForm["studentLocation"] = this.studentLocationParams;
      this.getLibraryListing(this.queryForm, this.payload);
    }
    
  }
   // end

  filterDropdown(data) {
    if (data == "all") {
      this.queryForm["sort"] = "all";
      this.checkObj['sort'] = data ;
      this.router.navigate([], { queryParams: this.checkObj });
      this.getLibraryListing(this.queryForm, this.payload);
    } else {
      this.queryForm["sort"] = data;
      this.checkObj['sort'] = data
      this.router.navigate([], { queryParams: this.checkObj });
      this.getLibraryListing(this.queryForm, this.payload);
    }

  }

  enter() {
    this.searchArray.push(this.searchValue);
    this.queryForm["searchText"] = this.searchValue;
    this.getLibraryListing(this.queryForm, this.payload);
  }

  removeSearch(ele) {

    let index = this.searchArray.indexOf(ele);
    this.searchArray.splice(index, 1);
    this.searchValue = "";
    this.queryForm["searchText"] = "";
    this.getLibraryListing(this.queryForm, this.payload);
  }



  messageDetail(id) {
    this.router.navigateByUrl(
      `/dashboard/library/question-reply/` + id
    );
  }

  navigateStudent(id) {
    this.studentService.educatorStudentId.next(null);
    window.open(`/dashboard/educator-student-profile/${id}/educator-student-biography`, "_blank");
  }

  navigate(id) {
    window.open(`/dashboard/educator-advisor-profile/${id}/educator-advisor-biography`, "_blank");
  }

  studentProfileNavigate(id) {
    if (this.userData._id == id) {
      this.router.navigateByUrl(
        "/student-module/dashboard/student-profile/student-biography"
      );
    } else {
      this.toasterService.error("Student can not see another student profile");
    }
  }

  removePoster(ele) {
    this.filterForm[ele] = false;
    this.changeValue(ele, 12);
  }

  changeValue(value, ide) {
    

    switch (ide) {
      //case 1
      case 1:
        if (this.filterForm[value]) {
          this.yearArray.push(value);
        } else {
          let index = this.yearArray.indexOf(value);
          this.yearArray.splice(index, 1);
        }

        break;

      //case 2
      case 2:
        if (this.filterForm[value]) {
          this.formArray.push(value);
        } else {
          let index = this.formArray.indexOf(value);
          this.formArray.splice(index, 1);
        }

        break;

      //case 3
      case 3:
        if (this.filterForm[value]) {
          this.sectorArray.push(value);
        } else {
          let index = this.sectorArray.indexOf(value);
          this.sectorArray.splice(index, 1);
        }

        break;

      //case 4
      case 4:
        this.employerArray = [];
        for (let i in this.filterForm) {
          if (this.filterForm[i]) {
            let check = this.emplaoyerData.some((el) => el.EmployerNames == i);
            if (check) this.employerArray.push(i);
          } else {
            let index = this.employerArray.indexOf(i);
            if (index > -1) {
              this.employerArray.splice(index, 1);
            }
          }
        }

        break;

      //case 5
      case 5:
        if (this.filterForm[value]) {
          this.typeOfJobArray.push(value);
        } else {
          let index = this.typeOfJobArray.indexOf(value);
          this.typeOfJobArray.splice(index, 1);
        }

        break;

      //case 6
      case 6:
        this.collegesArray = [];
        for (let i in this.filterForm) {
          if (this.filterForm[i]) {
            let check = this.collegesData.some((el) => el.university == i);
            if (check) this.collegesArray.push(i);
          } else {
            let index = this.collegesArray.indexOf(i);
            if (index > -1) {
              this.collegesArray.splice(index, 1);
            }
          }
        }

        break;

      //case 7
      case 7:
        this.fieldOfStudyArray = [];
        for (let i in this.filterForm) {
          if (this.filterForm[i]) {
            let check = this.fieldOfStudyData.some((el) => el.name == i);
            if (check) this.fieldOfStudyArray.push(i);
          } else {
            let index = this.fieldOfStudyArray.indexOf(i);
            if (index > -1) {
              this.fieldOfStudyArray.splice(index, 1);
            }
          }
        }
        break;

      //case 8
      case 8:
        if (this.filterForm[value]) {
          this.sectorArray.push(value);
        } else {
          let index = this.sectorArray.indexOf(value);
          this.sectorArray.splice(index, 1);
        }

        break;

      

      //case 10
      case 10:
        if (this.filterForm[value]) {
          this.typeOfJobArray.push(value);
        } else {
          let index = this.typeOfJobArray.indexOf(value);
          this.typeOfJobArray.splice(index, 1);
        }

        break;

    

      case 12:
        if (this.formArray.includes(value)) {
          let index = this.formArray.indexOf(value);
          this.formArray.splice(index, 1);
        } else if (this.yearArray.includes(value)) {
          let index = this.yearArray.indexOf(value);
          this.yearArray.splice(index, 1);
        } else if (this.sectorArray.includes(value)) {
          let index = this.sectorArray.indexOf(value);
          this.sectorArray.splice(index, 1);
          this.sectorSearchValue = "";
        } else if (this.employerArray.includes(value)) {
          let index = this.employerArray.indexOf(value);
          this.employerArray.splice(index, 1);
          delete this.filterForm[value];
          this.employeeSearchValue = "";
        } else if (this.typeOfJobArray.includes(value)) {
          let index = this.typeOfJobArray.indexOf(value);
          this.typeOfJobArray.splice(index, 1);
          this.typeOfJobSearchValue = "";
        } else if (this.collegesArray.includes(value)) {
          let index = this.collegesArray.indexOf(value);
          this.collegesArray.splice(index, 1);
          delete this.filterForm[value];
          this.collegeSearchValue = "";
        } else if (this.fieldOfStudyArray.includes(value)) {
          let index = this.fieldOfStudyArray.indexOf(value);
          this.fieldOfStudyArray.splice(index, 1);
          delete this.filterForm[value];
          this.fieldOfStudySearchValue = "";
        }

        break;
    }

    if (this.yearArray.length) {
      this.payload["year"] = this.yearArray;
    } else {
      delete this.payload["year"];
    }

    if (this.formArray.length) {
      this.payload["form"] = this.formArray;
    } else {
      delete this.payload["form"];
    }

    if (this.sectorArray.length) {
      this.payload["sector"] = this.sectorArray;
    } else {
      delete this.payload["sector"];
    }

    if (this.employerArray.length) {
      this.payload["employer"] = this.employerArray;
    } else {
      delete this.payload["employer"];
    }

    if (this.typeOfJobArray.length) {
      this.payload["typeOfJob"] = this.typeOfJobArray;
    } else {
      delete this.payload["typeOfJob"];
    }

    if (this.collegesArray.length) {
      this.payload["university"] = this.collegesArray;
    } else {
      delete this.payload["university"];
    }

    if (this.fieldOfStudyArray.length) {
      this.payload["feildOfStudy"] = this.fieldOfStudyArray;
    } else {
      delete this.payload["feildOfStudy"];
    }

    this.SectorTagsArray = this.sectorArray;
    this.employerTagsArray = this.employerArray;
    this.typeOfJobTagsArray = this.typeOfJobArray;
    this.collegesTagsArray = this.collegesArray;
    this.fieldOfStudyTagsArray = this.fieldOfStudyArray;
    this.studentPoster = this.yearArray;
    this.studentForm = this.formArray

    this.paramsUrl = [];
    this.paramsEmploye = [];
    this.paramsTypeOfJob = [];
    this.paramsUniversity = [];
    this.paramsFieldOfStudy = [];
    this.paramsYear = [];
    this.paramsForm = []
    this.paramsStudentLocation = "";

    if (this.payload.sector) {
      this.paramsUrl.push(this.payload.sector);
      if (this.paramsUrl.length) {
        this.checkObj["sector"] = this.paramsUrl;
      }
    } else {
      delete this.checkObj["sector"];
    }

    if (this.payload.employer) {
      this.paramsEmploye.push(this.payload.employer);
      if (this.paramsEmploye.length) {
        this.checkObj["employer"] = this.paramsEmploye;
      }
    } else {
      delete this.checkObj["employer"];
    }

    if (this.payload.feildOfStudy) {
      this.paramsFieldOfStudy.push(this.payload.feildOfStudy);
      if (this.paramsFieldOfStudy.length) {
        this.checkObj["fieldOfStudy"] = this.paramsFieldOfStudy;
      }
    } else {
      delete this.checkObj["fieldOfStudy"];
    }

    if (this.payload.university) {
      this.paramsUniversity.push(this.payload.university);
      if (this.paramsUniversity.length) {
        this.checkObj["university"] = this.paramsUniversity;
      }
    } else {
      delete this.checkObj["university"];
    }

    if (this.payload.typeOfJob) {
      this.paramsTypeOfJob.push(this.payload.typeOfJob);
      if (this.paramsTypeOfJob.length) {
        this.checkObj["typeOfJob"] = this.paramsTypeOfJob;
      }
    } else {
      delete this.checkObj["typeOfJob"];
    }

    if (this.payload.year) {
      this.paramsYear.push(this.payload.year);
      if (this.paramsYear.length) {
        this.checkObj["year"] = this.paramsYear;
      }
    } else {
      delete this.checkObj["year"];
    }

    if (this.payload.form) {
      this.paramsForm.push(this.payload.form);
      if (this.paramsForm.length) {
        this.checkObj["form"] = this.paramsForm;
      }
    } else {
      delete this.checkObj["form"];
    }


    if(this.advisorLocationParams){
      this.checkObj['advisorLocation'] = this.advisorLocationParams
     
    }

    if(this.studentLocationParams){
      this.checkObj['studentLocation'] = this.studentLocationParams
     
    }

    this.router.navigate([], { queryParams: this.checkObj });
    this.getLibraryListing(this.queryForm, this.payload);
  }

  storingData(value) {
    let type = "name";
    let url = [];
    switch (value) {
      case value.sector: {
        url.push("sector", value.sector.toString());
        break;
      }
      case "employer": {
        url = this.payload.sector.toString();
        break;
      }
    }
  }

  resetSearch() {
    this.studentPoster = [];
    this.studentForm = []
    this.SectorTagsArray = [];
    this.employerTagsArray = [];
    this.typeOfJobTagsArray = [];
    this.collegesTagsArray = [];
    this.fieldOfStudyTagsArray = [];
    this.searchArray = [];
    this.searchValue = "";
    this.sectorSearchValue = "";
    this.employeeSearchValue = "";
    this.typeOfJobSearchValue = "";
    this.collegeSearchValue = "";
    this.fieldOfStudySearchValue = "";
    this.addStudentLocation = "";
    this.addAdvisorLocation = "";
    this.sectorArray = [];
    this.employerArray = [];
    this.typeOfJobArray = [];
    this.formArray= [];
    this.collegesArray = [];
    this.fieldOfStudyArray = [];
    this.advsiorLocationArray = [];
    this.studentLocationArray = [];
    delete this.payload["year"];
    delete this.payload["sector"];
    delete this.payload["employer"];
    delete this.payload["feildOfStudy"];
    delete this.payload["university"];
    delete this.payload["typeOfJob"];
    delete this.payload["form"];

    this.filterForm = {};

    if (this.paramsUrl) {
      delete this.checkObj["sector"];
    }

    if (this.paramsEmploye) {
      delete this.checkObj["employer"];
    }

    if (this.paramsFieldOfStudy) {
      delete this.checkObj["fieldOfStudy"];
    }

    if (this.paramsUniversity) {
      delete this.checkObj["university"];
    }

    if (this.paramsTypeOfJob) {
      delete this.checkObj["typeOfJob"];
    }

    if (this.paramsYear) {
      delete this.checkObj["year"];
    }

    if (this.paramsForm) {
      delete this.checkObj["form"];
    }
    if(this.advisorLocationParams){
      delete this.checkObj['advisorLocation']
    }

    if(this.studentLocationParams){
      delete this.checkObj['studentLocation']
    }

    this.router.navigate([], { queryParams: this.checkObj });

    this.paramsUrl = [];
    this.paramsEmploye = [];
    this.paramsFieldOfStudy = [];
    this.paramsUniversity = [];
    this.paramsTypeOfJob = [];
    this.paramsYear = [];
    this.yearArray = [];
    this.paramsForm = []
    this.advisorLocationParams = ''
    this.studentLocationParams = ''


    this.queryForm = {
      status : this.statusDataValue, 
      school : this.schoolSelectedValue,
      searchText: "",
      sort: "all",
      pageNumber: 0,
      location: "",
      studentLocation: "",
    };
    this.dropdownField = "all";
    this.getLibraryListing(this.queryForm, {});
  }


  tags() {
    this.authservice.tags().subscribe((data) => {
      this.sideTags = data["data"];
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page - 1;
    this.queryForm["pageNumber"] = this.currentPage;
    this.getLibraryListing(this.queryForm, this.payload);
  }

  addemployee() {
    this.editEmployee = !this.editEmployee;
  }

  addSector() {
    this.editSector = !this.editSector;
  }
  addTypeOfSctor() {
    this.editTypeOfJOb = !this.editTypeOfJOb;
  }
  addCollege() {
    this.editCollege = !this.editCollege;
  }

  addFieldOfStudy() {
    this.editFieldOfStudy = !this.editFieldOfStudy;
  }

  // navigate(id) {
  //   this.router.navigateByUrl(
  //     `/student-module/dashboard/student-advisor-profile/${id}/student-advisor-biography`
  //   );
  // }

  search() {
    this.authservice.library().subscribe((data) => {
      this.data = data["data"];
      this.data = data["data"][0][this.questionTypeForm.value.questionType];
    });
  }

  //Google Api
  public handleAddressChange(value) {
    this.advsiorLocationArray.push(value.formatted_address);
    this.queryForm["location"] = value.formatted_address;
    this.getLibraryListing(this.queryForm, this.payload);

     this.advisorLocationParams = value.formatted_address
    //  this.arrysOfLocation = []
    //  this.arrysOfLocation.push(this.advisorLocationParams)
     if(this.advisorLocationParams){
      this.checkObj['advisorLocation'] = this.advisorLocationParams
     }
     this.router.navigate([], { queryParams: this.checkObj });

   
  }

  removeAdvsiorLocation(value) {
    this.advsiorLocationArray = [];
    this.queryForm["location"] = "";
    this.addAdvisorLocation = "";

    if(this.advisorLocationParams){
      delete this.checkObj["advisorLocation"]
      this.router.navigate([], { queryParams: this.checkObj });
      this.advisorLocationParams = '';
    }

    this.getLibraryListing(this.queryForm, this.payload);

  }

  handleLocationAddressChange(value) {
    this.studentLocationArray.push(value.formatted_address);
    this.queryForm["studentLocation"] = value.formatted_address;
    this.getLibraryListing(this.queryForm, this.payload);

    this.studentLocationParams = value.formatted_address
    // this.arrysOfstudentLocation = []
    // this.arrysOfstudentLocation.push(this.studentLocationParams)
    if(this.studentLocationParams){
     this.checkObj['studentLocation'] = this.studentLocationParams
    }
    this.router.navigate([], { queryParams: this.checkObj });

  }

  removeStudentLocation(value) {
    this.studentLocationArray = [];
    this.queryForm["studentLocation"] = "";
    this.addStudentLocation = "";

    if(this.studentLocationParams){
      delete this.checkObj["studentLocation"]
      this.router.navigate([], { queryParams: this.checkObj });
      this.studentLocationParams = '';
    }

    this.getLibraryListing(this.queryForm, this.payload);
  }

}
