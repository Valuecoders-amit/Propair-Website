import { Component, OnInit, TemplateRef, ViewChild , ElementRef } from "@angular/core";
import { AuthService } from "../../../../lib/services/auth.service";
import { AdvisorService } from "../../../../lib/services/advisor.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { StudentService } from "../../../../lib/services/student.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";

// import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: "app-student-general",
  templateUrl: "./student-general.component.html",
  styleUrls: ["./student-general.component.scss"],
})
export class StudentGeneralComponent implements OnInit {
  public userData: any;
  profileForm: FormGroup;
  modalRef2: BsModalRef;
  updatePassword: FormGroup;
  closeResult: string;
  changeClick = false;
  modalOptions: NgbModalOptions;
  public notificationData: any;
  public onGoingnotificationData: any;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  enablelogo: boolean = false;
  files: any;
  imageSrc: any;
  genderData: string;
  fields: any = {};
  readonly: boolean = true;
  logoImages: Array<any> = [];
  formattedAddress: string = "";
  gender = "null"
  public imageValue : any;
  @ViewChild('focus', { static: false }) input: ElementRef;
  @ViewChild('focus2', { static: false }) input2: ElementRef;
  @ViewChild('focus3', { static: false }) input3: ElementRef;
  @ViewChild('focus4', { static: false }) input4: ElementRef;


  options = {
    types: ['(cities)'],
  };

  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
    private advisorService: AdvisorService,
    private _fb: FormBuilder,
    private modalService: NgbModal,
    private studentService: StudentService,
    private modalService1: BsModalService
  ) {
    this.profileForm = this._fb.group({
      firstName: [{ value: null, disabled: true }, Validators.required],
      lastName: [{ value: "", disabled: true }, Validators.required],
      gender: ["", Validators.required],

      screenName: [{ value: "", disabled: true }, Validators.required],
      email: [null, [Validators.required]],

      contact: [{ value: "", disabled: true }, Validators.required],
      countryCode: [null, [Validators.required]],
      location: [null, [Validators.required]],

      age: [{ value: "", disabled: true }, Validators.required],
    });

    this.updatePassword = this._fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });

    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      size: "lg",
    };
  }

  ngOnInit() {
    this.userDataList();
  }

  userDataList() {
    this.userData = this.authService.getUserInfo();

    if (this.userData) {
      this.imageSrc = this.userData.image;
        this.profileForm.patchValue({
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          gender: this.userData.gender,
          screenName: this.userData.lastName,
          email: this.userData.email,
          contact: this.userData.contact,
          countryCode : this.userData.countryCode,
          location: this.userData.location || 'No Location',
          age: this.userData.age,
        });
    
        this.genderData = this.userData.gender
    }

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
    } else if (value == "Contact") {
      this.profileForm.controls["contact"].enable();
      this.input3.nativeElement.focus()
    } else if (value == "Age") {
      this.profileForm.controls["age"].enable();
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
            // this.studentService.advisorinboxCount.next(this.profileForm.value.firstName)
            this.userData = response["data"];
            this.studentService.userData( this.userData)
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
            this.studentService.userData( this.userData)
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
    } else if (value == "Age") {
      let payload = {
        age: this.profileForm.value.age,
      };

      this.advisorService
        .updateAdvisorProfile(payload)
        .subscribe((response) => {
          if (response["status"] == 200) {
            this.toaster.success("Success", response["message"]);
            this.profileForm.controls["age"].disable();
            this.authService.setUserInfo(response["data"]);
          }
        });
    }
  }

  checkNotification(data) {
    this.notificationData = data;
  }

  checkOnGoingNotification(data) {
    this.onGoingnotificationData = data;
  }

  updateOnGoingNotification() {
    let payload = {
      onGoingMessage: this.onGoingnotificationData,
    };

    this.advisorService.updateAdvisorProfile(payload).subscribe((data) => {
      if (data["status"] == 200) {
        this.toaster.success("Success", data["message"]);
        this.authService.setUserInfo(data["data"]);
      } else {
        this.toaster.error("Error", data["message"]);
      }
    });
  }

  updateNotification() {
    let payload = {
      newMessageRequest: this.notificationData,
    };

    this.advisorService.updateAdvisorProfile(payload).subscribe((data) => {
      if (data["status"] == 200) {
        this.toaster.success("Success", data["message"]);
        this.authService.setUserInfo(data["data"]);
      } else {
        this.toaster.error("Error", data["message"]);
      }
    });
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
      }else{
        this.toaster.error('Error' , data["messaage"]);
      }
    },err =>{
        this.toaster.error('Error' , err.error.message);
    });
  }

  cancel() {
    this.updatePassword.reset();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    // this.files = event.target.files[0]
    if (this.imageChangedEvent.type == "change") {
      this.enablelogo = !this.enablelogo;
    }
  }

  click() {
    this.changeClick = !this.changeClick;
  }

  UplaodImage() {
    let formData = new FormData();
    formData.append("image", this.croppedImage, this.croppedImage.name);
  }

  //modal

  /* MODAL */
  open(content) {
    this.modalService.open(content, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  resetImage() {
    this.imageChangedEvent = null;
  }

  newImageSelect() {
    this.imageChangedEvent = null;
  }

  /* Image Upload */
  imageUpload() {
    let formData = new FormData();
    formData.append("file", this.files, this.files.name);

    this.studentService.fileUpload(formData).subscribe((data) => {
      if (data["status"] == 200) {
        this.imageSrc = data["data"];
        let payload = {
          image: this.imageSrc,
        };

        this.advisorService
          .updateAdvisorProfile(payload)
          .subscribe((response) => {
            if (response["status"] == 200) {
              this.toaster.success("Success", response["message"]);
              this.authService.setUserInfo(response["data"]);
            }
          });
      }
    });
  }

  edit(d) {
    this.fields = { [d]: true };

    this.readonly = !this.readonly;
  }

  //update user details
  updateCurrentData(data) {
    this.fields[data] = false;
  }

  userGender(genderName , template: TemplateRef<any>) {
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
    this.advisorService.updateLogo(payload , 2).subscribe(
      (data) => {
        let logoData = data.updateData;
        this.logoImages = logoData.map((el) => {
          let obj = {
            id: el._id,
            image: "http://propair.n1.iworklab.com:3002/" + el.image,
          };
          return obj;
        })
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
}
