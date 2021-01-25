import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorStudentWorkComponent } from './educator-student-work.component';

describe('EducatorStudentWorkComponent', () => {
  let component: EducatorStudentWorkComponent;
  let fixture: ComponentFixture<EducatorStudentWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorStudentWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorStudentWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
