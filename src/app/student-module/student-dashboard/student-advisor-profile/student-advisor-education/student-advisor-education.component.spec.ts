import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdvisorEducationComponent } from './student-advisor-education.component';

describe('StudentAdvisorEducationComponent', () => {
  let component: StudentAdvisorEducationComponent;
  let fixture: ComponentFixture<StudentAdvisorEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAdvisorEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdvisorEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
