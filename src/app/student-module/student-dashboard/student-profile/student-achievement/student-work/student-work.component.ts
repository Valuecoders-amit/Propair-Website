import { Component, OnInit, TemplateRef } from "@angular/core";
import { StudentService } from "../../../../../lib/services/student.service";
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IMyDpOptions, IMyDateModel } from "mydatepicker";

@Component({
  selector: "app-student-work",
  templateUrl: "./student-work.component.html",
  styleUrls: ["./student-work.component.scss"],
})
export class StudentWorkComponent implements OnInit {
  myDatePickerOptions: IMyDpOptions = {
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
  rolesData : Array<any> = [];
  myDate = {
    date: {
      year: "2008",
      month: "1",
      day: "1",
    },
  };
  imageUrl: any;
  sectorsData: Array<{}>;
  optionalData = ["Employee 1", "Employee 2", "Employee 3"];
  optionsData: Array<{}>;

  options = {
    types: ['(cities)'],
  };

  constructor(
    private profileService: StudentService,
    private toasterService: ToastrService,
    private modalService: BsModalService
  ) {}

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
  }

  //Emaployers
  employerList() {
    let patt = this.addPosition.value.employer;
    this.profileService.getEmployData(patt).subscribe((data) => {
      this.optionsData = [];
      this.optionsData = data["data"].map((el) => el.EmployerNames);
    });
  }

  //Sectors
  getAllSectors() {
    const patt = this.addPosition.value.sector;
    this.profileService.sectors(patt).subscribe((data) => {
      this.sectorsData = [];
      this.sectorsData = data["data"].map((el) => el.name);
    });
  }

  getAllRoles(event){
    if(event.keyCode){
      const patt = event.target.value;
      this.profileService.roles(patt).subscribe((data) =>{
        this.rolesData =[];
        this.rolesData = data["data"]
      })
    }
   
  } 

  addCareer(template: TemplateRef<any>) {
    this.addPosition.addControl(
      "endDate",
      new FormControl(null, [Validators.required])
    );
    this.submitForm = false;
    this.addPosition.reset({ checkMark: false });
    this.editInfo = false;
    this.modalRef2 = this.modalService.show(template , {backdrop : 'static'});
  }

  editCareer(career, template: TemplateRef<any>) {

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
        image:
          (career.image ? career.image : "assets/images/company.png") ||
          "assets/images/company.png",
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
        image:
          (career.image ? career.image : "assets/images/company.png") ||
          "assets/images/company.png",
      });
    }

    this.modalRef2 = this.modalService.show(template , {backdrop : 'static'});
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
      image: this.addPosition.value.image,
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
      image: this.addPosition.value.image,
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

  //Google_APi
  public handleAddressChange(value: any) {
    this.addPosition.patchValue({
      location: value.formatted_address,
    });
  }

  //Company_Api
  selectCompany(compName: any) {
    const payload = {
      companyName: compName,
    };
    this.profileService.getCompany(payload).subscribe(
      (data) => {
        const imageData = data["data"];

        this.addPosition.patchValue({
          image: imageData.logo,
        });
      },
      (err) => {
      }
    );
  }
}
