import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorStudentEducationComponent } from './educator-student-education.component';

describe('EducatorStudentEducationComponent', () => {
  let component: EducatorStudentEducationComponent;
  let fixture: ComponentFixture<EducatorStudentEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorStudentEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorStudentEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
