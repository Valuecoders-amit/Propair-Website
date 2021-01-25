import { Component, OnInit, TemplateRef } from '@angular/core';
import { StudentService } from "../../../lib/services/student.service";
import { AuthService }from '../../../lib/services/auth.service'
import { IStudent, IStudentData } from "src/app/lib/interfaces/Istudent";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
declare var $;


@Component({
  selector: 'app-educator-students-credits',
  templateUrl: './educator-students-credits.component.html',
  styleUrls: ['./educator-students-credits.component.scss']
})
export class EducatorStudentsCreditsComponent implements OnInit {
  public credits: any = [];
  studentsData: IStudentData[] = [];
  public date: any;
  selectedAll: any;
  public creditListCount: any;
  public total: any;
  public balance : any;
  public count: any;
  public classes :any;
  public filterClass = '';
  public year = '';
  public form = '';
  public status = 'live';
  public enter = '';
  public formListdata : string;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalRef4: BsModalRef;
  modalRef5: BsModalRef;

  constructor(private studentService: StudentService,
    private toasterService: ToastrService,
    private modalService1: BsModalService,
    private authService : AuthService
    ) { }

  ngOnInit() {
    this.studentCreditRequest(null , null ,this.status );
    this.creditCount();
    this.getClass();
    this.getForm();
  }

  studentCreditRequest( year?:string , form?:string , status?:string) {
    this.studentService.studentCreditRequest(year, form ,status).subscribe(data => {
      if (data["status"] == 200) {
        this.credits = data["data"];
        this.credits.forEach(element => {
          let duration = element.createdAt;
          this.date = moment(duration).format("DD/MM/YYYY");
        });
        this.studentsData = [];
        this.credits.forEach(item => {
          let temp = Object.assign({}, item, { value: false });
          this.studentsData.push(temp);
        });
      }
    });
  }
  

  selectAll() {
    this.studentsData.forEach(student => {
      student.value = this.selectedAll;
    });
  }

  studentChecked() {
    this.selectedAll = this.studentsData.every(function(item: any) {
      return item.value == true;
    });
  }

  showApprovePopup(template: TemplateRef<any>) {

    let selectedIds = [];
    this.studentsData.forEach(data => {
      if (data.value) {
        selectedIds.push(data._id);
      }
    });

    if (!selectedIds.length) {
      this.toasterService.warning("Please Select The CheckBox");
    } else {
      // this.approveModal = this.modalService.show(this.approvePopup);
      // $("#exampleModal").modal("show");
      this.modalRef2 = this.modalService1.show(template)
      this.studentService.creditListCount(selectedIds).subscribe(data => {
        this.creditListCount = data["data"];
      });
    }
  }


  closeSuccessOne(){
    this.modalRef2.hide();
  }

  
  getClass() {
    this.studentService.getClassList().subscribe(data => {
      // this.classes = data['data'];      
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

  
  approve(template: TemplateRef<any>) {

      let selectedIds = [];
      this.studentsData.forEach(data => {
        if (data.value) {
          selectedIds.push(data._id);
        }
      });

      this.studentService.approveCreditRequest(selectedIds).subscribe(data => {
        if (data["status"] == 200) {
          this.total = data['data']
          this.toasterService.success("Success", data["message"]);
          this.studentCreditRequest(this.year , this.form , this.status);
          this.creditCount();
          this.balanceDue();
          this.modalRef2.hide();
          this.modalRef4 = this.modalService1.show(template);
          // this.educatorBilling();
        } else {
          this.toasterService.error("Error", data["message"]);
        }
      },err =>{
        this.toasterService.error("Error" , err.error.message);
      }
      );

  }

  closeSuccessTwo(){
    this.modalRef4.hide();
  }

  showDeclinePopup(template: TemplateRef<any>) {
    let selectedIds = [];
    this.studentsData.forEach(data => {
      if (data.value) {
        selectedIds.push(data._id);
      }
    });
    if (!selectedIds.length) {
      this.toasterService.warning("Please Select The CheckBox");
    } else {
      // this.declineModal = this.modalService.show(this.declinePopup);
      // $("#declineModal").modal("show");
      this.modalRef3 = this.modalService1.show(template)
      this.studentService.creditListCount(selectedIds).subscribe(data => {
        this.creditListCount = data["data"];
      });
    }
  }

  closeDeclineOne(){
    this.modalRef3.hide();
  }


  decline(template: TemplateRef<any>) {

      let selectedIds = [];
      this.studentsData.forEach(data => {
        if (data.value) {
          selectedIds.push(data._id);
        }
      });

      this.studentService.declineCreditRequest(selectedIds).subscribe(data => {
        if (data["status"] == 200) {
          this.toasterService.success("Success", data["message"]);
          this.studentCreditRequest(this.year , this.form , this.status);
          this.creditCount();
          this.modalRef3.hide();
          this.modalRef5 = this.modalService1.show(template)
          // this.educatorBilling();
        } else {
          this.toasterService.error("Error", data["message"]);
        }
      },err=>{
        this.toasterService.error("Error", err.error.message);
      });
      
  }

  closeDeclineTwo(){
    this.modalRef5.hide();
  }

  creditCount() {
    this.studentService.creditCount().subscribe(data => {
      this.count = data["data"];
    });
  }

  filterForm(value){
    if(value == 'all'){
      this.form = ''
      this.studentCreditRequest(this.year , this.form , this.status)
    }else{
      this.form = value
      this.studentCreditRequest(this.year , this.form , this.status)
    }
  }
  

  filterYear(value){
    if(value == 'all'){
      this.year = ''
      this.studentCreditRequest(this.year , this.form , this.status )
    }else{
      this.year = value
      this.studentCreditRequest(this.year , this.form , this.status )
    }  
    
  }
  
      filterStudentStatus(value){
        if(value == 'all'){
          this.status = 'live'
          this.studentCreditRequest(this.year , this.form , this.status );

        }else{
          this.status = value
          this.studentCreditRequest(this.year , this.form , this.status )
        }
      }
      
      enterForm(){
    
        this.form = this.enter
        this.studentCreditRequest(this.year , this.form , this.status )
      }


      balanceDue(){
        this.authService.educatorBalanceDue().subscribe(data =>{
          this.balance = data['data']
          this.authService.balanceCount( this.balance)
        })
      }
}
