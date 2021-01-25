import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { StudentService } from "../../../lib/services/student.service";
import { AuthService } from "../../../lib/services/auth.service";
import { AdvisorService } from "../../../lib/services/advisor.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-general-settings",
  templateUrl: "./general-settings.component.html",
  styleUrls: ["./general-settings.component.scss"],
})
export class GeneralSettingsComponent implements OnInit {
  locationsData: Array<any> = [];
  userData: any;
  profileForm: FormGroup;
  updatePassword: FormGroup;
  referralCode: any;
  referralData: any;
  files: any;
  imageSrc: any;
  logoImages: Array<any> = [];
  showSearch: boolean = false;
  modalRef2: BsModalRef;
  genderData: string;
  fields: any = {};
  formattedAddress: string;
  readonly: boolean = true;
  public imageValue :any;
  @ViewChild('focus', { static: false }) input: ElementRef;
  @ViewChild('focus2', { static: false }) input2: ElementRef;
  @ViewChild('focus3', { static: false }) input3: ElementRef;
  @ViewChild('focus4', { static: false }) input4: ElementRef;
  @ViewChild('autofocus', { static: false }) search: ElementRef;
 
  options = {
    types: ['(cities)'],
  };

  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
    private advisorService: AdvisorService,
    private _fb: FormBuilder,
    // private studentService: StudentService,
    private modalService1: BsModalService
  ) {
    this.profileForm = this._fb.group({
      firstName: [{ value: null, disabled: true }, Validators.required],
      lastName: [{ value: "", disabled: true }, Validators.required],
      gender: [ null , [Validators.required]],
      screenName: [{ value: "", disabled: true }, Validators.required],
      email: [null, [Validators.required]],
      contact: [{ value: "", disabled: true }, Validators.required],
      countryCode: [null, [Validators.required]],
      location : [null, [Validators.required]],
      
    });

    

    this.updatePassword = this._fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });

  }

  ngOnInit() {
    this.advsiorInfo()
    this.userDataList();
  }

  userDataList() {
    this.userData = this.authService.getUserInfo();
    if (this.userData) {
      this.imageSrc = this.userData.image;
      this.referralCode = this.userData.referralCode;
      this.profileForm.patchValue({ 
        firstName : this.userData.firstName,
        lastName : this.userData.lastName,
        gender : this.userData.gender,
        screenName : this.userData.screenName,
        email : this.userData.email,
        contact: this.userData.contact,
        countryCode : this.userData.countryCode,
        location: this.userData.location || 'No Location',
        age: this.userData.age,
      })
      this.genderData = this.userData.gender

    }


  }

  advsiorInfo(){
    this.advisorService.advisorInfo().subscribe(data =>{
    })
  }

  Edit(value) {
    if (value == "Firstname") {
      this.profileForm.controls["firstName"].enable();
      this.input.nativeElement.focus()
    } else if (value == "LastName") {
      this.profileForm.controls["lastName"].enable();
      this.input2.nativeElement.focus()
    } else if (value == "ScreenName") {
      this.profileForm.controls["screenName"].enable();
      this.input3.nativeElement.focus()
    } else if (value == "Contact") {
      this.profileForm.controls["contact"].enable();
      this.input4.nativeElement.focus()

    } 
  }

  update(value) {
    if (value == "Firstname") {
      let payload = {
        firstName: this.profileForm.value.firstName,
      };

      this.advisorService
        .updateAdvisorProfile(payload)
        .subscribe((response) => {
          if (response["status"] == 200) {
            this.toaster.success("Success", response["message"]);
            this.userData = response["data"];
            this.advisorService.userData(this.userData)
            this.profileForm.controls["firstName"].disable();
            this.authService.setUserInfo(response["data"]);
          }
        });
    } else if (value == "LastName") {
      let payload = {
        lastName: this.profileForm.value.lastName,
      };

      this.advisorService
        .updateAdvisorProfile(payload)
        .subscribe((response) => {
          if (response["status"] == 200) {
            this.toaster.success("Success", response["message"]);
            this.userData = response["data"];
            this.advisorService.userData(this.userData)
            this.profileForm.controls["lastName"].disable();
            this.authService.setUserInfo(response["data"]);
          }
        });
    } else if (value == "ScreenName") {
      let payload = {
        screenName: this.profileForm.value.screenName,
      };

      this.advisorService
        .updateAdvisorProfile(payload)
        .subscribe((response) => {
          if (response["status"] == 200) {
            this.toaster.success("Success", response["message"]);
            this.profileForm.controls["screenName"].disable();
            this.authService.setUserInfo(response["data"]);
          }
        });
    } else if (value == "Contact") {
      let payload = {
        contact: this.profileForm.value.contact,
        countryCode : this.profileForm.value.countryCode,
      };

      this.advisorService
        .updateAdvisorProfile(payload)
        .subscribe((response) => {
          if (response["status"] == 200) {
            this.toaster.success("Success", response["message"]);
            this.profileForm.controls["contact"].disable();
            this.authService.setUserInfo(response["data"]);
          }
        });
    }
  }

  userGender(genderName, template: TemplateRef<any>) {
    this.genderData = genderName;
    let payload = {
      gender: this.genderData,
    };
    this.getProfileLogo(payload, template);
  }

  image(template: TemplateRef<any>){
    if(this.genderData){
      
      let payload = {
        gender: this.genderData,
      };
      this.getProfileLogo(payload, template);

    }
  }

  getProfileLogo(payload, template: TemplateRef<any>) {
    this.advisorService.updateLogo(payload , 1).subscribe(
      (data) => {
        let logoData = data.updateData;
        this.logoImages = logoData.map((el) => {
          let obj = {
            id: el._id,
            image: "http://propair.n1.iworklab.com:3002/" + el.image,
          };
          return obj;
        });

        this.modalRef2 = this.modalService1.show(template , {backdrop : 'static'});
      },
      (err) => {
      }
    );
  }

  updateProfileLogo(img_url) {
    let payload = {
      image: img_url,
      gender: this.genderData,
    };

    this.modalRef2.hide();
    this.advisorService.updateAdvisorProfile(payload).subscribe((response) => {
      if (response["status"] == 200) {
        this.toaster.success("Profile Updated");
        this.authService.setUserInfo(response["data"]);
        this.userData = this.authService.getUserInfo();
        this.imageSrc = this.userData.image;
      }
    });
  }

  cancel() {
    this.updatePassword.reset();
  }

  updateAdvisorPassword() {

    if (
      this.updatePassword.value["confirmPassword"] !=
      this.updatePassword.value["password"]
    ) {
      return this.toaster.error(
        "Error",
        "Password and confirm password do not match"
      );
    }

    let payload = {
      password: this.updatePassword.value.password,
    };
    this.advisorService.updateAdvisorPassword(payload).subscribe((data) => {
      if (data["status"] == "200") {
        this.toaster.success("Success", data["messaage"]);
        this.updatePassword.reset();
        document.getElementById("openSuccesModal").click();
      }
    });
  }

  // google-api
  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;
    let locationPayload = {
      location: this.formattedAddress,
    };

    this.advisorService
      .updateAdvisorProfile(locationPayload)
      .subscribe((response) => {
        if (response["status"] == 200) {
          this.toaster.success("Success", response["message"]);
          this.userData = response["data"];
          this.authService.setUserInfo(response["data"]);
        }
      });
  }

  // edit(d) {
  //   this.fields = { [d]: true };

  //   this.readonly = !this.readonly;
  // }
}
