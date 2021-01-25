import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorStudentEducationComponent } from './advisor-student-education.component';

describe('AdvisorStudentEducationComponent', () => {
  let component: AdvisorStudentEducationComponent;
  let fixture: ComponentFixture<AdvisorStudentEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorStudentEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorStudentEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
