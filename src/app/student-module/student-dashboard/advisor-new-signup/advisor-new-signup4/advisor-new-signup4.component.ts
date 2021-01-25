import { Component, OnInit, TemplateRef } from "@angular/core";
import { StudentService } from "../../../../lib/services/student.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IMyDpOptions, IMyDateModel } from "mydatepicker";

@Component({
  selector: "app-advisor-new-signup4",
  templateUrl: "./advisor-new-signup4.component.html",
  styleUrls: ["./advisor-new-signup4.component.scss"],
})
export class AdvisorNewSignup4Component implements OnInit {
  myDatePickerOptions: IMyDpOptions = {
    // other options...
    // dateFormat: 'dd/mm/yyyy',
    sunHighlight: true,
    inline: false,
    editableDateField: false,
    showTodayBtn: false,
    disableSince: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    },
  };

  myDatePickerOptions2: IMyDpOptions = {
    // other options...
    // dateFormat: 'dd/mm/yyyy',
    sunHighlight: true,
    inline: false,
    editableDateField: false,
    showTodayBtn: false,
    disableSince: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    },
  };

  carrerData: Array<any> = [];
  careeListing: Array<any> = [];
  moreData: number;
  checkData: boolean = false;
  modalRef2: BsModalRef;
  submitForm: boolean = false;
  addPosition: FormGroup;
  editInfo: boolean = false;
  careerId: string;
  myDate = {
    date: {
      year: "2008",
      month: "1",
      day: "1",
    },
  };
  imageUrl: any;
  sectorsData: Array<{}>;
  rolesData : Array<any> = [];
  optionalData = ["Employee 1", "Employee 2", "Employee 3"];
  optionsData: Array<{}>;
  countryData: Array<any>;
  citiesData: Array<any>;
  options = {};



  constructor(
    private profileService: StudentService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private toasterService: ToastrService,
    private modalService: BsModalService,
  ) {
    this.profileService.AdvisorNewMessageTab1 = true;
    this.profileService.AdvisorNewMessageTab2 = true;
    this.profileService.AdvisorNewMessageTab3 = true;
    this.profileService.AdvisorNewMessageTab4 = true;
    this.profileService.AdvisorNewMessageTab5 = false;
    this.profileService.AdvisorNewMessageTab6 = false;
  }

  ngOnInit() {
    this.addPosition = new FormGroup({
        title: new FormControl("", [Validators.required]),
        employer: new FormControl(null, [Validators.required]),
        sector: new FormControl(null, [Validators.required]),
        role: new FormControl(null, [Validators.required]),
  
        location: new FormControl(null, [Validators.required]),
        startDate: new FormControl(null, [Validators.required]),
        endDate: new FormControl(null, [Validators.required]),
        checkMark: new FormControl(false),
        image: new FormControl(""),
      });
      this.careerListing();
      this.getAllSectors();
  }

  next() {
    this.SpinnerService.show();
    this.router.navigate([
      "/advisor-newsignup",
      this.profileService.signupFlowtoken,
      "advisor-new-message5",
    ]);
  }

  skip() {
    this.router.navigate([
      "/advisor-newsignup",
      this.profileService.signupFlowtoken,
      "advisor-new-message5",
    ]);
  }

  privious() {
    this.router.navigate([
      "/advisor-newsignup",
      this.profileService.signupFlowtoken,
      "advisor-new-message3",
    ]);
  }

  //Emaployers
  employerList(){
    let patt = this.addPosition.value.employer;
    this.profileService.getEmployData(patt).subscribe((data) => {
      this.optionsData = [];
      this.optionsData = data["data"];
      
    });
  }

//Sectors
  getAllSectors() {
  // const patt = this.addPosition.value.sector;
    this.profileService.sectors().subscribe((data) => {
        this.sectorsData = [];
        this.sectorsData = data["data"];
    
    });
  }

//Role_Data
  getAllRoles(){
    const patt = this.addPosition.value.role;
    this.profileService.roles(patt).subscribe((data) =>{
      this.rolesData =[];
      this.rolesData = data["data"]
    })
  }  

  addCareer(template: TemplateRef<any>) {
    this.addPosition.addControl(
      "endDate",
      new FormControl(null, [Validators.required])
    );
    this.submitForm = false;
    this.addPosition.reset({ checkMark: false });
    this.editInfo = false;
    this.modalRef2 = this.modalService.show(template);
  }


  editCareer(career, template: TemplateRef<any>) {

    // this.checkPresent();
    if (career.endDate) {
      this.onDateChanged({
        date: {
          year: new Date(career.startDate).getFullYear(),
          month: new Date(career.startDate).getMonth() + 1,
          day: new Date(career.startDate).getDate(),
        },
      });

      this.addPosition.addControl(
        "endDate",
        new FormControl(null, [Validators.required])
      );
      this.addPosition.setValue({
        title: career.title,
        employer: career.employer,
        sector: career.sector,
        role: career.role,
        location: career.location,
        checkMark: career.isCurrentlyWorking,
        startDate: {
          date: {
            year: new Date(career.startDate).getFullYear(),
            month: new Date(career.startDate).getMonth() + 1,
            day: new Date(career.startDate).getDate(),
          },
        },
        endDate: {
          date: {
            year: new Date(career.endDate).getFullYear(),
            month: new Date(career.endDate).getMonth() + 1,
            day: new Date(career.endDate).getDate(),
          },
        },
        image: (career.image ? career.image : "assets/images/logo-pro.png") || "assets/images/logo-pro.png"
      });
    } else {
      this.addPosition.removeControl("endDate");
      this.addPosition.setValue({
        title: career.title,
        employer: career.employer,
        sector: career.sector,
        role: career.role,
        location: career.location,
        checkMark: career.isCurrentlyWorking,
        startDate: {
          date: {
            year: new Date(career.startDate).getFullYear(),
            month: new Date(career.startDate).getMonth() + 1,
            day: new Date(career.startDate).getDate(),
          },
        },
        image: (career.image ? career.image : "assets/images/logo-pro.png") || "assets/images/logo-pro.png"
      });
    }

    this.modalRef2 = this.modalService.show(template);
    this.editInfo = true;
    this.careerId = career["_id"];
  }

  onAddPosition() {
    this.submitForm = false;
    if (!this.addPosition.valid) {
      this.submitForm = true;
   
      return;
    }

    let payload = {
      title: this.addPosition.value.title,
      employer: this.addPosition.value.employer,
      sector: this.addPosition.value.sector,
      role: this.addPosition.value.role,
      location: this.addPosition.value.location,
      isCurrentlyWorking: this.addPosition.value.checkMark,
      startDate: this.addPosition.value.startDate.jsdate,
      image : this.addPosition.value.image
    };

    if (this.addPosition.value.endDate != null)
      payload["endDate"] = this.addPosition.value.endDate.jsdate;


    this.profileService.addNewCareer(payload).subscribe(
      (data) => {
      

        this.careerListing();
        this.toasterService.success("Added Successfully");
      },
      (err) => {
        this.toasterService.error(`${err.error.message}`);
      }
    );

    this.modalRef2.hide();
  }

  onEditPosition() {
    this.submitForm = false;

    if (!this.addPosition.valid) {
      this.submitForm = true;
      return;
    }

    let payload = {
      title: this.addPosition.value.title,
      employer: this.addPosition.value.employer,
      sector: this.addPosition.value.sector,
      role: this.addPosition.value.role,
      location: this.addPosition.value.location,
      image : this.addPosition.value.image,
      startDate: new Date(
        this.addPosition.value.startDate.date.year,
        this.addPosition.value.startDate.date.month - 1,
        this.addPosition.value.startDate.date.day
      ),
      isCurrentlyWorking: this.addPosition.value.checkMark,
      // "endDate":new Date(this.addPosition.value.endDate.date.year,this.addPosition.value.endDate.date.month-1,this.addPosition.value.endDate.date.day),
    };

    if (this.addPosition.value.endDate != null) {
      payload["endDate"] = new Date(
        this.addPosition.value.endDate.date.year,
        this.addPosition.value.endDate.date.month - 1,
        this.addPosition.value.endDate.date.day
      );
    }


    this.profileService.editNewCareer(this.careerId, payload).subscribe(
      (data) => {
        this.checkData = false;
        this.careerListing();
        this.toasterService.success("Edit Successfully");
      },
      (err) => {
        this.toasterService.error(`${err.error.message}`);
      }
    );

    this.modalRef2.hide();
    // this.addPosition.reset();
    this.editInfo = false;
  }

  careerListing() {
    this.profileService.careerListingData().subscribe((data) => {
      this.moreData = data["data"].length - 3;
      this.carrerData = data["data"];
      this.careeListing = [...this.carrerData];
      this.careeListing.splice(3);
    });
  }

  moreCareer() {
    this.careeListing = this.carrerData;
    this.checkData = true;
  }

  removeCareer() {
    this.profileService.removeCareerData(this.careerId).subscribe((data) => {

      this.checkData = false;
      this.careerListing();
      this.toasterService.success("Removed Successfully");
    });

    this.modalRef2.hide();
    this.addPosition.reset();
    this.editInfo = false;
  }
 

  onDateChanged(event) {
    let copy = JSON.parse(JSON.stringify(this.myDatePickerOptions2));
    copy.disableUntil = event.date;
    this.myDatePickerOptions2 = copy;
  }

  checkPresent() {
    if (this.addPosition.value.checkMark == true) {
      this.addPosition.removeControl("endDate");
    } else {
      this.addPosition.addControl(
        "endDate",
        new FormControl(null, [Validators.required])
      );
    }
  }

  //Google_Api
  public handleAddressChange(value: any) {
    this.addPosition.patchValue({
      location: value.formatted_address,
    });
  }


  //Company_Api
  selectCompany(compName : any){
    const payload = {
      companyName : compName
    }
    this.profileService.getCompany(payload).subscribe(data => {
      const imageData = data["data"];

      this.addPosition.patchValue({
        'image' : imageData.logo
      })
      
    }, err => {
    })
  }

}
