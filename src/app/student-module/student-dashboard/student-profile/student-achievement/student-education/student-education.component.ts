import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { StudentService } from '../../../../../lib/services/student.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-student-education',
  templateUrl: './student-education.component.html',
  styleUrls: ['./student-education.component.scss']
})
export class StudentEducationComponent implements OnInit {
  @ViewChild('temp1', { static: false }) temp1: any;
  @ViewChild('temp2', { static: false }) temp2: any;
  @ViewChild('temp3', { static: false }) temp3: any;

  modalRef: BsModalRef;
  editInfo: boolean = false;
  addPosition: FormGroup;
  educationForm: FormGroup;
  firstData: Array<{}>;
  secondData: Array<{}>;
  eduId: string;
  submitForm: boolean = false;
  educationData: Array<any> = []
  Items: FormArray;
  editTrue: boolean = false;
  editId: string = null;
  submitted: boolean = false;
  gcseData: Array<any> = [];
  ibData: Array<any> = [];
  alevelData: Array<any> = [];


  validationType = {
    'alevel': [Validators.required, Validators.pattern(`[a-eA-E]`)],
    'iblevel': [Validators.required, Validators.pattern(`[0-7]`)]
  }


  constructor(private profileService: StudentService,
    private toasterService: ToastrService,
    private modalService: BsModalService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.educationFormSet();
    this.educationList();

  }


  predict(i) {
    if (this.educationForm.controls['alevelEducation']['controls'][i].controls.predicted.value || this.educationForm.controls['alevelEducation']['controls'][i].controls.result.value) {
      if (this.educationForm.controls['alevelEducation']['controls'][i].controls.predicted.value) {
        this.educationForm.controls['alevelEducation']['controls'][i].controls.predicted.setValidators(this.validationType['alevel']);
        this.educationForm.controls['alevelEducation']['controls'][i].controls.result.clearValidators();
        this.educationForm.controls['alevelEducation']['controls'][i].controls.result.updateValueAndValidity();
      } else {
        this.educationForm.controls['alevelEducation']['controls'][i].controls.result.setValidators(this.validationType['alevel']);
        this.educationForm.controls['alevelEducation']['controls'][i].controls.predicted.clearValidators();
        this.educationForm.controls['alevelEducation']['controls'][i].controls.predicted.updateValueAndValidity();
      }
    }
    else {
      this.educationForm.controls['alevelEducation']['controls'][i].controls.result.setValidators(this.validationType['alevel']);
      this.educationForm.controls['alevelEducation']['controls'][i].controls.predicted.setValidators(this.validationType['alevel']);
      this.educationForm.controls['alevelEducation']['controls'][i].controls.predicted.updateValueAndValidity();
      this.educationForm.controls['alevelEducation']['controls'][i].controls.result.updateValueAndValidity();
    }



  }

  new(i) {

    if (this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.result.value || this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.predicted.value) {
      if (this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.predicted.value) {
        this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.predicted.setValidators(this.validationType['iblevel']);
        this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.result.clearValidators();
        this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.result.updateValueAndValidity();

      } else {
        this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.result.setValidators(this.validationType['iblevel']);
        this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.predicted.clearValidators();
        this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.predicted.updateValueAndValidity()
      }
    }
    else {
      this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.predicted.setValidators(this.validationType['iblevel']);
      this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.result.setValidators(this.validationType['iblevel']);
      this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.result.updateValueAndValidity();
      this.educationForm.controls['ibEducation']['controls']['ibSubjects'].controls[i].controls.predicted.updateValueAndValidity()
    }

  }




  getAlevelList(event) {
    if (event.keyCode) {
      let val = event.target.value;
      this.profileService.getAlevelList(val).subscribe(data => {
        this.alevelData = data['data'];
      })
    }

  }



  getGcseList(event) {
    if (event.keyCode) {
      let val = event.target.value;
      this.profileService.getGCSEList(val).subscribe(data => {
        this.gcseData = data['data'];
      })
    }

  }

  getIBList(event) {
    if (event.keyCode) {
      let val = event.target.value;
      this.profileService.getIBList(val).subscribe(data => {
        this.ibData = data['data'];
      })
    }
  }

  educationFormSet() {
    this.educationForm = this.fb.group({
      ibEducation: this.fb.group({
        ibSubjects: this.fb.array([this.ibItem()]),
        theory: [null, [Validators.required]],
        extended: [null, [Validators.required]],
        action: [null, [Validators.required]],
        degreeType: [null, [Validators.required]]
      }),

      alevelEducation: this.fb.array([this.alevelItem()]),
      gcseEducation: this.fb.array([this.gcseItem()]),
    });
  }


  educationList() {
    this.profileService.getStudentEducationList().subscribe(data => {
      this.educationData = data['data'];
    }, err => {
    })

  }

  ibItem(): FormGroup {
    return this.fb.group({
      subject: [null, [Validators.required]],
      level: ['SL', [Validators.required]],
      predicted: [null, Validators.compose([Validators.required, Validators.pattern(`[0-7]`)])],
      result: [null, Validators.compose([Validators.required, Validators.pattern(`[0-7]`)])]
    })
  }

  alevelItem(): FormGroup {
    return this.fb.group({
      subject: [null, [Validators.required]],
      level: ['AS', [Validators.required]],
      predicted: [null, Validators.compose([Validators.required, Validators.pattern(`[a-eA-E]`)])],
      result: [null, Validators.compose([Validators.required, Validators.pattern(`[a-eA-E]`)])]

    })
  }

  gcseItem(): FormGroup {
    return this.fb.group({
      subject: [null, [Validators.required]],
      level: ['GCSE', [Validators.required]],
      result: [null, Validators.compose([Validators.required, Validators.pattern(`[a-eA-E | 1-9]`)])]

    })
  }

  addItem(val): void {
    if (val == 1) {
      this.Items = this.educationForm.get('ibEducation.ibSubjects') as FormArray;
      this.Items.push(this.ibItem());
    }
    else if (val == 2) {
      this.Items = this.educationForm.get('gcseEducation') as FormArray;
      this.Items.push(this.gcseItem());
    }
    else {

      this.Items = this.educationForm.get('alevelEducation') as FormArray;
      this.Items.push(this.alevelItem());
    }

  }

  remove(index, val) {
    if (val == 1) {
      this.Items = this.educationForm.get('ibEducation.ibSubjects') as FormArray;
      this.Items.removeAt(index);
    }
    else if (val == 2) {
      this.Items = this.educationForm.get('gcseEducation') as FormArray;
      this.Items.removeAt(index);

    }
    else {
      this.Items = this.educationForm.get('alevelEducation') as FormArray;
      this.Items.removeAt(index);
    }

  }

  saveForm(val, group) {
    this.submitted = true;

    let payload: Object;

    if (val == 1) {

      this.educationForm.controls['ibEducation']['controls'].ibSubjects.controls.forEach(el => {
        if (el.controls.predicted.value || el.controls.result.value) {
          if (el.controls.predicted.value) {
            el.controls.result.clearValidators()
            el.controls.result.updateValueAndValidity();
          } else {
            el.controls.predicted.clearValidators()
            el.controls.predicted.updateValueAndValidity();
          }

        }

      });

      if (this.educationForm.controls.ibEducation.invalid) {
        return;
      }
      this.submitted = false;
      const ibEdu = this.educationForm.value.ibEducation;

      payload = {

        "subject": ibEdu.ibSubjects,
        "theoryOfKnowledege": ibEdu.theory,
        "extendedEssay": ibEdu.extended,
        "creativity": ibEdu.action,
        "degreeType": ibEdu.degreeType,
        "educationType": "IB"
      }

    }
    else if (val == 2) {
      if (this.educationForm.controls.gcseEducation.invalid) {
        return;
      }
      this.submitted = false;
      const gcseEdu = this.educationForm.value.gcseEducation;
      payload = {

        "subject": gcseEdu,
        "educationType": "GCSE"

      }
    }
    else if (val == 3) {


      this.educationForm.controls['alevelEducation']['controls'].forEach(el => {
        if (el.controls.predicted.value || el.controls.result.value) {
          if (el.controls.predicted.value) {
            el.controls.result.clearValidators()
            el.controls.result.updateValueAndValidity();
          } else {
            el.controls.predicted.clearValidators()
            el.controls.predicted.updateValueAndValidity();
          }

        }

      });

      if (this.educationForm.controls.alevelEducation.invalid) {
        return;
      }
      this.submitted = false;

      const alevelEdu = this.educationForm.value.alevelEducation;
      payload = {

        "subject": alevelEdu,
        "educationType": "A level"
      }
    }
    if (!this.editTrue) {
      this.profileService.educationFillingForm(payload).subscribe(data => {
        this.toasterService.success("Added Successfully");
        this.modalRef.hide();
        this.educationForm.reset();
        this.educationList();
      }, error => {
        this.modalRef.hide();
        this.toasterService.error("An Error occurred");
      })
    }
    else {
      this.profileService.editFillingForm(payload, this.editId).subscribe(data => {
        this.toasterService.success("Updated Successfully");
        this.modalRef.hide();
        this.educationForm.reset();
        this.educationList();
        this.editId = null;
        this.editTrue = false;
      }, error => {
        this.modalRef.hide();
        this.educationForm.reset();
        this.editId = null;
        this.editTrue = false;
        this.toasterService.error("An Error occurred");
      })
    }


  }

  editTemp(temp: TemplateRef<any>, val) {
    // this.editTrue = true;
    let arr = [];
    let totalResult: any;
    let alevel = this.educationData.map(el => {
      if (el._id == val) {
        this.editId = el.records[0]._id;
        totalResult = el.records[0];
        el.records[0].subject.forEach(em => {
          arr.push(em);
        })
        return arr;
      }

    })

    alevel = [...alevel.filter(el => el !== undefined)];
    if (val == 'A level') {
      if (alevel && alevel.length) {
        this.editTrue = true;
        this.educationForm = this.fb.group({

          alevelEducation: this.fb.array(
            alevel[0].map(el => {
              return this.fb.group({
                subject: [el.subject, [Validators.required]],
                level: [el.level, [Validators.required]],
                predicted: [el.predicted, Validators.compose([Validators.required, Validators.pattern(`[a-eA-E]`)])],
                result: [el.result, Validators.compose([Validators.required, Validators.pattern(`[a-eA-E]`)])]

              })
            })
          ),

        });
      } else {
        this.educationForm = this.fb.group({

          alevelEducation: this.fb.array([this.alevelItem()]),
          gcseEducation: this.fb.array([this.gcseItem()]),
        });
      }


      this.modalRef = this.modalService.show(temp,  { class: 'gray modal-lg' , backdrop : 'static'});
    }

    else if (val == 'GCSE') {
      if (alevel && alevel.length) {
        this.editTrue = true;
        this.educationForm = this.fb.group({
          gcseEducation: this.fb.array(
            alevel[0].map(el => {
              return this.fb.group({
                subject: [el.subject, [Validators.required]],
                level: [el.level, [Validators.required]],
                result: [el.result, Validators.compose([Validators.required, Validators.pattern(`[a-eA-E | 1-9]`)])]

              })
            })
          ),

        });
      } else {
        this.educationForm = this.fb.group({
          gcseEducation: this.fb.array([this.gcseItem()]),
        });

      }
      this.modalRef = this.modalService.show(temp,  { class: 'gray modal-lg' , backdrop : 'static'});
      // this.modalRef = this.modalService.show(temp, Object.assign({}, { class: 'gray modal-lg' }));

    }
    else if (val == 'IB') {
      if (alevel && alevel.length) {
        this.editTrue = true;
        this.educationForm = this.fb.group({

          ibEducation: this.fb.group({
            ibSubjects: this.fb.array(
              alevel[0].map(el => {
                return this.fb.group({
                  subject: [el.subject, [Validators.required]],
                  level: [el.level, [Validators.required]],
                  predicted: [el.predicted, Validators.compose([Validators.required, Validators.pattern(`[0-7]`)])],
                  result: [el.result, Validators.compose([Validators.required, Validators.pattern(`[0-7]`)])]
                })
              })
            ),
            theory: [totalResult.theoryOfKnowledege, [Validators.required]],
            extended: [totalResult.extendedEssay, [Validators.required]],
            action: [totalResult.creativity, [Validators.required]],
            degreeType: [totalResult.degreeType || 'iOS Development', [Validators.required]],
          }),
        });
      } else {
        this.educationForm = this.fb.group({
          ibEducation: this.fb.group({
            ibSubjects: this.fb.array([this.ibItem()]),
            theory: [null, [Validators.required]],
            extended: [null, [Validators.required]],
            action: [null, [Validators.required]],
            degreeType: [null, [Validators.required]]
          }),

        });
      }

      this.modalRef = this.modalService.show(temp, { class: 'gray modal-lg' ,backdrop: 'static' } );

    }
  }


}