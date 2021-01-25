import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
// declare var current_fs, next_fs, previous_fs; //fieldsets
// declare var left, opacity, scale; //fieldset properties which we will animate
// declare var animating; //flag to prevent quick multi-click glitches
declare var $;
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { StudentService } from "../../../lib/services/student.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
// import Stepper from 'bs-stepper'
// import { async } from '@angular/core/testing';
import { HttpClient, HttpEventType } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-advisor-support",
  templateUrl: "./advisor-support.component.html",
  styleUrls: ["./advisor-support.component.scss"],
})
export class AdvisorSupportComponent implements OnInit {
  public selectedAll: any;
  public questionId: any = 0;
  public propairData: any;
  public propairCount: any;
  public propairDataArray: any;
  public propairIds: any;
  public propairForm: FormGroup;
  propairListArray: any = [];
  public selectedIds: any = [];
  public selectedMessages: string[] = [];

  // image upload
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  public imageUrl = [] ;

  @ViewChild("fileInput", { static: true }) fileInput: ElementRef;
  constructor(
    private router: Router,
    private studentService: StudentService,
    private toasterService: ToastrService,
    private _fb: FormBuilder,
    private SpinnerService: NgxSpinnerService
  ) {

    this.propairForm = this._fb.group({
      subject: [
        null,
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(999),
        ],
      ],

      message: [
        null,
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(999),
        ],
      ],

      file: new FormControl(""),
    });
  }

  ngOnInit() {
    this.propairList();
  }


  propairList() {
    this.studentService.propairSupportList().subscribe((data) => {
      this.propairData = data["data"];
      this.propairCount = data["messageCount"];

      this.studentService.propairCount(this.propairCount);

      this.propairListArray = [];
      this.propairData.forEach((item) => {
        let temp = Object.assign({}, item, { value: false });
        this.propairListArray.push(temp);
      });
    });
  }


  showMesage(id) {
    this.studentService.messageRead(id).subscribe((data) => {
      this.router.navigateByUrl("student-module/dashboard/view-message/" + id);
    });
  }

  show(id) {
    this.studentService.messageRead(id).subscribe((data) => {
      this.router.navigateByUrl(
        "student-module/dashboard/inbox-view-message/" + id
      );
    });
  }

  navigatToNewMessageExchange(id) {
    this.router.navigateByUrl(
      "/student-module/dashboard/message-exchange/message-exchange1/" + id
    );
  }

  selectAllPropairSupport() {
    this.propairListArray.forEach((student) => {
      student.value = this.selectedAll;
    });
    this.propairIds = [];
    this.propairListArray.forEach((data) => {
      if (data.value) {
        this.propairIds.push(data._id);
      }
    });
  }

  propairChecked() {
    this.selectedAll = this.propairListArray.every(function (item: any) {
      return item.value == true;
    });
  }

  deletePropairSupportPopup() {
    this.propairIds = [];
    this.propairListArray.forEach((data) => {
      if (data.value) {
        this.propairIds.push(data._id);
      }
    });

    if (!this.propairIds.length) {
      this.toasterService.warning("Please Select The CheckBox");
    } else {
    
      $("#deletePropair").modal("show");
    }
  }

  deleteMessagePropairSupport() {
    if (this.propairIds) {
      this.studentService
        .deleteMessagePropairSupport(this.propairIds)
        .subscribe((data) => {
          if (data["status"] == 200) {
            this.toasterService.success("Sucess", data["message"]);
            $("#deletePropair").modal("hide");
            this.propairList();
          }
        });
    }
  }

  navigatePropairSupport(id) {
    this.router.navigateByUrl('advisor-dashboard/advisor-propair-view-message/'+id);
  }

  // image uploader

  uploadFile(files: any[]) {
    if (files[0] && files[0].type.includes("image")) {
      const file = files[0];

      const formData: FormData = new FormData();
      formData.append("file", file, file.name);
      this.studentService.fileUpload(formData).subscribe((data) => {
        if (data["status"] == 200) {
          this.propairForm.patchValue({ file: data["data"] });
          let image = data['data'];
          this.imageUrl.push(image)
        }else{
          this.toasterService.error('Erro' , "Image can not be greater than 5MB")
        }
      },err=>{
        this.toasterService.error('Error' , err.error.message)
      });
    }
  }



  removeImgae(value){

    let payload = {
      image : value
    }
    this.studentService.removeImageUpload(payload).subscribe(data =>{
      if(data['status'] == 200){
        let index = this.imageUrl.findIndex(x => x == value)       
        this.imageUrl.splice(index , 1)
      }else{
        this.toasterService.error("Error" , data["message"])
      }
    },err =>{
      this.toasterService.error('Error' , err.error.message)
    })
  }

  propairSupport() {
    $("#message-inbox").modal("show");
  }

  sendPropair() {
    this.SpinnerService.show();
    this.propairForm.patchValue({file : this.imageUrl})
    this.studentService.sendPropairSupport(this.propairForm.value).subscribe(
      (data) => {
        this.SpinnerService.hide();

        if (data["status"] == 200) {
          this.toasterService.success("Success", data["message"]);
          $("#message-inbox").modal("hide");
          this.propairList();
          this.imageUrl = [] ;
          this.propairForm.reset();
        } else {
          this.toasterService.error("Error", data["message"]);
        }
      },
        err => {
        this.toasterService.error("Error", err.error.error);
      }
    );
  }

  cancel() {
    this.imageUrl = null;
    this.propairForm.reset();
    this.router.navigateByUrl(
      "/student-module/dashboard/student-my-message/propair-support"
    );
  }

  imageClick(imageUrl) {
    window.open(imageUrl);
  }

  filterPropairSupport(value) {
    if (value == "all") {
      this.propairList();
    } else {
      this.studentService.propairSupportListFilter(value).subscribe((data) => {
        this.propairListArray = data["data"];
      });
    }
  }
}
