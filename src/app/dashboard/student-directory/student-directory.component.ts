import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as Highcharts from "highcharts";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from "../../lib/services/student.service"
import { IStudent, IStudentData } from 'src/app/lib/interfaces/Istudent';
import { Router } from '@angular/router';
import { getyear } from '../../lib/utility/utility'
import { AuthService } from '../../lib/services/auth.service'
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from '@angular/platform-browser';
import { ExportToCsv } from 'export-to-csv';
import { LoginComponent } from 'src/app/main/login/login.component';
import * as sortBy from "sort-by";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-student-directory',
  templateUrl: './student-directory.component.html',
  styleUrls: ['./student-directory.component.scss']
})
export class StudentDirectoryComponent implements OnInit {
  public yearList: number[];;
  public toDate: any = '';
  public fromDate: any = '';
  addStudentModal: BsModalRef;
  manuallyAddStudentModal: BsModalRef;
  fileUploadModal: BsModalRef
  addClasses: BsModalRef;
  public studentCount: any
  linkRiotAccountForm: FormGroup;
  classForm: FormGroup;
  names: any;
  selectedAll: any;
  closeModel: BsModalRef;
  logoutModal: BsModalRef;
  studentClassModal : BsModalRef;
  deleteValue: any = false
  fileUrl;
  public hideCheckbox: any = false;
  public isFreez: any;
  public statusDate: any;
  public dateArray:any=[]
  public data:any;
  public studentClassId:string
  public formListdata : any;
  public classCount : any;
  public remainingClass : any ;
  public yearFiler = '';
  public formFiler = '';
  public statusFiler = '';
  dropdownSettings :IDropdownSettings= {
    singleSelection: false,
    idField: '_id',
    textField: 'class',
    enableCheckAll : false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 0,
    allowSearchFilter: false
  };

  studentsData: IStudentData[] = [];
  @ViewChild('addStudents', { static: false }) addStudents: ElementRef;
  @ViewChild('manuallyAddStudent', { static: false }) manuallyAddStudent: ElementRef;
  @ViewChild('addClass', { static: false }) addClass: ElementRef;
  @ViewChild('infoModalClose', { static: false }) infoModalClose: ElementRef;
  @ViewChild('logoutPopup', { static: false }) logoutPopup: ElementRef;
  @ViewChild('studentClass', { static: false }) studentClass: ElementRef;
  @ViewChild('FileUpload', { static: false }) FileUpload: ElementRef;

  public dateForm: FormGroup;
  public addClassForm: FormGroup;
  yAxisSecondaryData = [7, 17, 32, 52, 70, 91, 116, 132, 155, 168, 172, 181];
  yAxisPrimaryData = [7.0, 10, 15, 20, 18, 21, 25, 26, 23, 18, 13, 9];
  years: any;
  public classes=[]
  public filterForm: any = {};
  public userData : any;
  public reson: any;
  public options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Student Records',
    useBom: true,
    noDownload: false,
    headers: ['firstName', 'lastName', 'class', 'year', 'email']
  };
  
  // public csvExporter = new ExportToCsv(this.options);
  constructor(
    private _fb: FormBuilder,
    private modalService: BsModalService,
    private studentService: StudentService,
    private toasterService: ToastrService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer) {

    this.dateForm = this._fb.group({

      toDate: [null, [Validators.required, Validators.email]],
      fromDate: [null, [Validators.required]],
    });
    this.linkRiotAccountForm = this._fb.group({

      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      year: [null, [Validators.required]],
      form: new FormControl('', [Validators.required , Validators.pattern('^[A-Z0-9]*$')]),

    })

    this.addClassForm = this._fb.group({
      // class: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z_ ]*$')]),
      class: new FormControl('', [Validators.required]),

    })
    this.classForm = this._fb.group({
      classes: [null, [Validators.required]],

    })

    this.names = [
      { name: 'Prashobh', selected: false },
      { name: 'Abraham', selected: false },
      { name: 'Anil', selected: false },
      { name: 'Sam', selected: false },
      { name: 'Natasha', selected: false },
      { name: 'Marry', selected: false },
      { name: 'Zian', selected: false },
      { name: 'karan', selected: false },
    ]

  }

  ngOnInit() {
    this.userData = this.authService.getUserInfo()
    this.authService.removeStudentId()
    this.dashboardData();
    this.studentList();
    this.yearList = getyear();
    this.getClass();
    this.getForm();

  }

  
  onClassSelect(item: any) {
  }

  
  onItemDeSelectSector(item:any){
  }

  sendClass(){
    
    this.studentService.editStudentClass(this.studentClassId, { class: this.classForm.value.classes}).subscribe(data =>{
      if(data['status'] == 200){
        this.toasterService.success('Success',data['message'])
        document.getElementById('openSuccesModal').click();
        this.classForm.reset()
        this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
      }
    })

  }

  cancel(){
    this.classForm.reset()
  }

  dashboardData(){
    this.authService.educatorDashboardData().subscribe(data =>{
      this.data = data['data']
    })
  }




  download() {

    // new  AngularCsv(this.options,'Csv');
    window.open(this.studentService.downloadTemplate(), '_blank')

  }

  onClick(data) {

  }


  studentList(status ?:any , form ?:any , year ?:any) {
    this.studentService.allFilters(status , form  , year ).subscribe(data => {
      if (data['status'] == 200) {
        let studentList: IStudentData[] = data['data'].studentRecords;
        data['data'].studentRecords.forEach(element => {
          if (element.isFreezed == true) {

            this.reson = element.reason

          }


        });

        this.isFreez = data['data'].studentRecords.forEach(element => {
          if (element.isFreezed) {
            this.isFreez = element.isFreezed

            if (this.isFreez == true) {
              this.hideCheckbox = false
            } else {
              this.hideCheckbox = true
            }
          }

        });


        this.studentCount = data['data'].studentCount;
        this.studentsData = []
        studentList.forEach(item => {
          let temp: IStudentData = Object.assign({}, item, { value: false, yearEdit: false, classEdit: false });
          this.studentsData.push(temp);
          
          
        });
        // this.studentsData.forEach(item=>{
          
        //   let duration = item['statusTime']
        //   this.statusDate = moment(duration).format('DD/MM/YYYY')
          
        // })
        // this.dateArray.push(this.statusDate)
        


      }
      // this.router.navigate(['/dashboard/studentDirectory', this.studentsData[0]._id])



    })
  }

  over() {

  }

  updateStudentYear(student) {
    this.studentService.editYear(student._id, { Year: student.Year }).subscribe(data => {
      if (data['status'] === 200) {
        this.toasterService.success('Success', data['message']);
        this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
      }
    })

  }

  updateStudentClass(student) {
    this.studentService.editUser(student);
    
    this.studentService.editStudentClass(student._id, { class: student.class }).subscribe(data => {
      if (data['status'] === 200) {
        this.toasterService.success('Success', data['message']);
        this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
      }
    })

  }

  studentClassEdit(id){
    this.classForm.reset();

    this.studentClassId = id
    this.authService.getStudentClassDetail(this.studentClassId).subscribe(data=>{
      if(data['status'] == 200){
        this.classForm.patchValue({
          classes : data['updateData']['class']
        })
      }
    })
  }


  showDetail(id) {
    this.router.navigateByUrl('/dashboard/studentDirectory/' + id);
  }

  filterYear(value) {
    if (value == 'all') {
      this.yearFiler = '';
      this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
    } else {
      this.yearFiler = value;
      this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
      // this.studentService.allFilters(this.statusFiler , this.formFiler ,this.yearFiler).subscribe(data => {
      //   this.studentsData = data['data'].studentRecords;
      //   this.studentCount = data['data'].studentCount;
      // })
    }
  }


  filterForms(value) {
    if (value == 'all') {
      this.formFiler = '';
      this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
    } else {
      this.formFiler = value;
      this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
      // this.studentService.allFilters(this.statusFiler , this.formFiler ,this.yearFiler).subscribe(data => {
      //   this.studentsData = data['data'].studentRecords;
      //   this.studentCount = data['data'].studentCount;
      // })
    }
  }

  filterStatus(value) {
    if (value == 'all') {
      this.statusFiler = '';
      this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
    } else {
      this.statusFiler = value;
      this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
      // this.studentService.allFilters(this.statusFiler , this.formFiler ,this.yearFiler).subscribe(data => {
      //   this.studentsData = data['data'].studentRecords;
      //   this.studentCount = data['data'].studentCount;
      // })
    }

  }




  date(a) {


  }

  froDate(a) {

  }

  tooDate(a) {


  }

  addStudentss() {

    this.addStudentModal = this.modalService.show(this.addStudents);
  }

  Class() {
    this.addClasses = this.modalService.show(this.addClass);
  }

  manuallyAdd() {
    this.manuallyAddStudentModal = this.modalService.show(this.manuallyAddStudent);

  }

  student() {

    if (this.linkRiotAccountForm.get('firstName').invalid) {
      return this.toasterService.error('error', 'First name is required')
    }
    if (this.linkRiotAccountForm.get('lastName').invalid) {
      return this.toasterService.error('error', 'Last name is required')
    }

    if (this.linkRiotAccountForm.get('email').invalid) {
      return this.toasterService.error('error', 'Email is required')
    }

    if (this.linkRiotAccountForm.get('year').invalid) {
      return this.toasterService.error('error', 'Year is required')
    }


    if (this.linkRiotAccountForm.get('form').invalid) {
      return this.toasterService.error('error', 'Form is required')
    }

    this.spinner.show();
    this.studentService.addStudent(this.linkRiotAccountForm.value).subscribe(data => {
    this.spinner.hide();
      if (data['status'] == 200) {
        this.toasterService.success('Success', data['message']);
        this.linkRiotAccountForm.reset();
        this.manuallyAddStudentModal.hide()
        this.dashboardData();
        this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
        this.getForm();
        this.getClass();

      } else {
        this.toasterService.error('Error', data['message']);
      }

    },err=>{
      this.toasterService.error("Error" , err.error.message)
    })

  }

  getClass() {
    this.studentService.getClassList().subscribe(data => {
      // this.classes = data['data']; 
      this.remainingClass = data['data']['remainingClass'] 
      this.classCount = data['data']['classCount']
      this.classes = data['data']['classData'].map(item => {
        item['edit'] = false
        return item;
      });

    })
  }

  getForm(){
    this.studentService.getFormList().subscribe(data =>{
      this.formListdata = data['data']
    })
  }

  updateClass(studentClass) {
    this.studentService.editClass(studentClass._id, studentClass).subscribe(response => {
      if (response['status'] === 200) {
        studentClass['edit'] = false;
        this.toasterService.success('Success', response['message']);
        this.getClass();
        this.dashboardData();
        this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
      }else{
        this.toasterService.error('Error', response['message'])
      }
    },err=>{
      this.toasterService.error('Error' , err.error.message)
    })
  }
  // studentApi() {
  //   this.studentResponse.forEach(item => {
  //     let temp: IStudentData = Object.assign({}, item, {value: false});
  //     this.studentsData.push(temp);
  //   });

  // }
  fileUpload() {
    this.fileUploadModal = this.modalService.show(this.FileUpload)
    this.FileUpload.nativeElement.click()
  }


  handleFileInput(files) {


    if (files['0'] && files[0].type.includes("")) {
      const file = files['0'];

      let formData: FormData = new FormData();
      formData.append('studentRecord', file, file.name);

      this.studentService.uploadStudent(formData).subscribe(data => {
        if (data['status'] == 200) {
          this.toasterService.success('Success', data['message']);
          this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
          this.addStudentModal.hide();

        } else {
          this.toasterService.error('Error', data['message']);
          this.addStudentModal.hide();

        }

      })
    }


  }

  selectAll() {

    this.studentsData.forEach(student => {
      student.value = this.selectedAll;
    });
    // To handle delete button
    this.deleteValue = this.studentsData.every(function (item: any) {
      return item.value == false;
    });
    if (this.deleteValue) {
      this.deleteValue = !this.deleteValue;
    } else {
      this.deleteValue = true;
    }

  }



  AddClass() {

    
    if (this.addClassForm.get('class').invalid) {
      return this.toasterService.error('Error', 'Class is required')
    }
    this.spinner.show()
    this.studentService.addClass(this.addClassForm.value).subscribe(data => {
      this.spinner.hide()
      if (data['status'] == 200) {
        this.toasterService.success('Success', 'Class Added');
        this.getClass();
        this.dashboardData();
        this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
        this.addClassForm.reset();
      } else {
      this.spinner.hide()
        this.toasterService.error('Error', data['message']);
      }
    },err=>{
      this.spinner.hide()
      this.toasterService.error('Error', err.error.message);
    })
  }
  
  deleteClass(id) {
    this.studentService.deleteClass(id).subscribe(data => {
      if (data['status'] == 200) {
        this.toasterService.success('Success', 'Class Deleted');
        this.getClass();
        this.dashboardData();
        this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
      } else {
        this.toasterService.error('Error', data['message']);
      }
    })
  }

  studentChecked() {
    // Mark selectedAll true if all students got selected
    this.selectedAll = this.studentsData.every(function (item: any) {
      return item.value == true;
    });

    // To handle delete button
    this.deleteValue = this.studentsData.every(function (item: any) {
      return item.value == false;
    });
    if (this.deleteValue) {
      this.deleteValue = !this.deleteValue;
    } else {
      this.deleteValue = true;
    }
  }

  navigate(id){
    this.studentService.educatorStudentId.next(null)
    this.router.navigateByUrl(`/dashboard/educator-student-profile/${id}/educator-student-biography`)
  }



  // checkIfAllSelected() {
  //   this.selectedAll = this.names.every(function(item:any) {
  //       return item.selected == true;
  //     })
  // }

  editClass(id) {

  }

  closeClass() {
    this.addClasses.hide();
  }

  manuallAdd() {
    this.manuallyAddStudentModal.hide();
  }

  closePopup() {
    this.addStudentModal.hide();
  }

  closeButton() {
    this.manuallyAddStudentModal.hide();
  }

  CancelPopup(x) {
    if (x) {
      this.authService.logout();
      this.logoutModal.hide();
    } else {
      this.logoutModal.hide();

    }
  }

  showCancePopup() {

    let selectedIds = []
    this.studentsData.forEach(data => {
      if (data.value) {
        selectedIds.push(data._id)

      }
    })

    if(!selectedIds.length){
      this.toasterService.error('Please select the checkbox')
    }
    else{
      this.closeModel = this.modalService.show(this.logoutPopup);
    }
  }

  delete(x) {

    if (x) {

      let selectedIds = []
      this.studentsData.forEach(data => {
        if (data.value) {
          selectedIds.push(data._id)

        }
      })
      this.studentService.deleteStudent(selectedIds).subscribe(data => {
        if (data['status'] == 200) {
          this.toasterService.success('Success', data['message']);
          this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
          this.dashboardData();
          this.deleteValue = false;

        } else {
          this.toasterService.error('Success', data['message']);
        }
      })
      selectedIds = null
      this.closeModel.hide();
    } else {
      this.closeModel.hide();
    }
  }
  inviteStudent() {

    let selectedIds = []
    this.studentsData.forEach(data => {
      if (data.value) {
        selectedIds.push(data._id)

      }
    })

    if(!selectedIds.length){
      this.toasterService.error("Please select the checkbox")
    }else{
      this.studentService.inviteStudents(selectedIds).subscribe(data => {
        if (data['status'] == 200) {
          
          this.toasterService.success('Success', data['message']);
          this.studentList(this.statusFiler , this.formFiler ,this.yearFiler);
          this.deleteValue = false;
  
  
        } else {
  
          this.toasterService.error('Error', data['message']);
        }
      },(err)=>{
        this.toasterService.error('Error', err.error.message);
        
      }
      )
    }
    
  }
  //Arrow sorting

  upSort() {
    let upSort = this.studentsData.sort(sortBy('firstName'))
    this.studentsData = upSort
  }

  downSort() {

    let downSort = this.studentsData.sort(sortBy('-firstName'))
    this.studentsData = downSort
  }

  upSortLastName() {
    let upSort = this.studentsData.sort(sortBy('lastName'))
    this.studentsData = upSort
  }
  downSortLastName() {
    let downSort = this.studentsData.sort(sortBy('-lastName'))
    this.studentsData = downSort
  }
  upSortEmail() {
    let upSort = this.studentsData.sort(sortBy('email'))
    this.studentsData = upSort
  }

  downSortEmail() {
    let downSort = this.studentsData.sort(sortBy('-email'))
    this.studentsData = downSort
  }
  upSortYear() {
    let upSort = this.studentsData.sort(sortBy('year'))
    this.studentsData = upSort

  }
  downSortYear() {

    let downSort = this.studentsData.sort(sortBy('-year'))
    this.studentsData = downSort
  }

  upSortClass() {

    let upSort = this.studentsData.sort(sortBy('class'))
    this.studentsData = upSort

  }
  downSortClass() {
    let downSort = this.studentsData.sort(sortBy('-class'))
    this.studentsData = downSort

  }
  upSortCredits() {
    let upSort = this.studentsData.sort(sortBy('credits'))
    this.studentsData = upSort
  }

  downSortCredits() {
    let downSort = this.studentsData.sort(sortBy('-credits'))
    this.studentsData = downSort
  }

  upSortStatus() {
    let upSort = this.studentsData.sort(sortBy('status'))
    this.studentsData = upSort
  }

  downSortStatus() {

    let downSort = this.studentsData.sort(sortBy('-status'))
    this.studentsData = downSort
  }
  //End Arrow sorting

}

