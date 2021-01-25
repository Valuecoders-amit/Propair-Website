import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
// import { AdvisorService } from "../../lib/services/advisor.service";
import { educatorSettingsService } from "src/app/lib/services/edu.settings.service";
import * as jwt_decode from "jwt-decode";
import { CustomValidators } from './custom-validators';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions
} from "@ng-bootstrap/ng-bootstrap";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})


export class SettingsComponent implements OnInit {
  
  closeResult: string;
  phone: string;
  modalOptions: NgbModalOptions;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  show_button: boolean;
  show_eye: boolean;
  updatedField:any
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private http: educatorSettingsService,
    // private advisorService: AdvisorService,
  ) {
        this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      size: "lg"
    };
  }
  fields: any = {};
  files: any;
  enablelogo: boolean = false;
  profileForm: FormGroup;
  readonly: boolean = true;
  currentUser: any;
  updatedData: any;
  checked: any;
  imageSrc: any;
  passChange: boolean = false;
  notificationsForm: FormGroup;
  updatePassword: FormGroup;
  updatePass : boolean = false;

  currentCroppedImage: any = "";
  ngOnInit() {
    this.updatePassword = this.fb.group({
      password: [null,      [
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true
          }),
         
        ])
      ]],
      confirmPassword: [null, Validators.compose([Validators.required])],
    },{
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
    });


    this.currentUser = {};
    this.getCurrentUser();
    // this.profileFormData(); 
    this.getSchooolImage();
    
  }

  //Form initialize
  profileFormData() {
   
    this.profileForm = this.fb.group({
      firstName: [
        this.currentUser.firstName,
        [
          Validators.minLength(3),
          Validators.required,
          Validators.pattern(/^[a-z\s]+([a-z0-9]+)*$/i)
        ]
      ],
      lastName: [
        this.currentUser.lastName,
        [
          Validators.minLength(3),
          Validators.required,
          Validators.pattern(/^[a-z\s]+([a-z0-9]+)*$/i)
        ]
      ],
      email: [
        this.currentUser.email,
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ]
      ],
      contact: [
        this.currentUser.contact,
        [Validators.required,Validators.min(1000000)]
      ],
      countryCode: [this.currentUser.countryCode],
      password: ["", [Validators.required]],
      // school_logo: ["", [Validators.required]],
      cr_req: [],
      crLimit: [this.currentUser.crLimit, [Validators.required]],
      newPassword: [
        null,
        [
          Validators.required,
          Validators.minLength(8),Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ]
      ],
      cPassword: [null, Validators.compose([Validators.required])],
      
    },{
    });
  }
  edit(d) {
    this.fields = { [d]: true };
    this.readonly = !this.readonly;
  }
  /*CurrentUSer  */
  getCurrentUser() {
   
    this.currentUser = JSON.parse(localStorage.getItem("userInfo"))
    this.profileFormData()
  }
  //update user details
  updateCurrentData(data) {
    let filedToUpdate = data
    this.fields[data] = false;
    this.readonly = !this.readonly;
    this.updatedField=data
    let payload = {};
    payload[data] = this.profileForm.value[data];

    if (this.profileForm.get(data).invalid ) {
      this.getCurrentUser();
      return this.toaster.error("error", "Invalid input");
    } else {
      if (data == "email") {
        this.toaster.warning("this will change your Login Credentials");
      }
      
      this.http.updateUser(payload).subscribe(
        data => {
          this.currentUser[filedToUpdate] = payload[filedToUpdate]
          localStorage.removeItem('userInfo')
          localStorage.setItem('userInfo',JSON.stringify(this.currentUser))        
          if (data.isSuccess) this.toaster.success(this.updatedField,"updated");
          
          this.getCurrentUser();
        },
        err => {
          this.toaster.error(err.error);
        }
      );
    }
  }

  // checkbox for school Credit request
  toggle(event: any) {
    this.checked = !this.checked;
    let payload = {
      cr_req: this.checked
    };

    this.http.updateUser(payload).subscribe(data => {
      if (data.isSuccess && this.checked) {
        this.toaster.success("Credit request Enabled");
      } else {
        this.toaster.warning(
          "Students cannot request credits because this is turned off in Settings"
        );
      }
      this.getCurrentUser();
    });
  }

  /* Enable Password Change Field*/
  changePassword() {
    this.passChange = !this.passChange;
  }

  // Match CurrentPass
  currentPassCheck() {
    const token = localStorage.getItem("token");
    const decodeToken = this.getDecodedAccessToken(token);
    const currentUser = decodeToken.email;
    const password = this.profileForm.value["password"];
      let payload = {
        comparePassword:this.profileForm.value.password
      }
      this.http.checkCurrentPassword(payload).subscribe(data=>{
        if(data === true){
        this.http
            .updatePassword(this.profileForm.value.newPassword)
            .subscribe(data => {
              this.toaster.success("Password Updated");
              this.passChange = !this.passChange;
              this.profileForm.controls['password'].reset();
              this.profileForm.controls['cPassword'].reset()
              this.profileForm.controls['newPassword'].reset()
            });
          }
          else{
            this.toaster.error("Current Password incorrect")
            this.profileForm.controls['password'].reset();
              this.profileForm.controls['cPassword'].reset()
              this.profileForm.controls['newPassword'].reset()
          }
      })
     
          
        };
     
      

 

  /* Get Token Info */
  getDecodedAccessToken(token: string): any {
    try {
      let Token = jwt_decode(token)
      return jwt_decode(token);
      
      
    } catch (Error) {
      return null;
    }
  }

  /* Image Upload */
  imageUpload() {
    let formData = new FormData();
    formData.append("image", this.files, this.files.name);

    this.http.UploadSchoolImage(formData).subscribe(
      res => {
        this.toaster.success(res.message);
        this.enablelogo = false;
        this.files=!this.files
        this.getSchooolImage();
        this.imageChangedEvent=null
        
      },
      err => {
        this.toaster.error("Only *Png Formats Supported");
      }
    );
  }
  getSchooolImage() {
    this.http.getSchoolImage().subscribe(data => {
      if (data.images == null) {
        return;
      } else this.imageSrc = data.images.files[0];
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  

  /* MODAL */
  open(content) {
    this.modalService.open(content, this.modalOptions).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
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
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    if (this.imageChangedEvent.type == "change") {
      this.enablelogo = !this.enablelogo;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.file;
    this.files = this.croppedImage;
  }
 
  resetImage(){
    this.imageChangedEvent=null
  }

  //show current pass
  showPassword(d) {
    this.fields[d] = !this.fields[d];
  
  }
  
  countryChanged(e) {
    if (e) {
      this.updateCurrentData("countryCode");
    }
  }

  checkContact(){
    if(this.profileForm.value["contact"].length < 7){
      return this.toaster.error('Contact must be minimum 7digits long')
    }
  }
  //For selecting new Image on POPUP
  newImageSelect(){
    this.imageChangedEvent=null
  }

  //New Updated Password
  updateAdvisorPassword() {
    this.updatePass = true;
    if(this.updatePassword.invalid){
      return;
    }
    this.updatePass = false;

    let payload = {
      password: this.updatePassword.value.password,
    };


    this.http.updatePassword(payload)
            .subscribe(data => {
              this.toaster.success("Success", data["messaage"]);
              this.updatePassword.reset();
               document.getElementById("openSuccesModal").click();
            }, err =>{
              this.toaster.error("Error");
            });
  }

  cancel() {
    this.updatePassword.reset();
  }
 
}
