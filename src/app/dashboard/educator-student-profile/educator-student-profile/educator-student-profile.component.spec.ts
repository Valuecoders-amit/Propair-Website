import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorStudentProfileComponent } from './educator-student-profile.component';

describe('EducatorStudentProfileComponent', () => {
  let component: EducatorStudentProfileComponent;
  let fixture: ComponentFixture<EducatorStudentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorStudentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorStudentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
