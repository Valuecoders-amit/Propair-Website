import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdvisorAdviceComponent } from './student-advisor-advice.component';

describe('StudentAdvisorAdviceComponent', () => {
  let component: StudentAdvisorAdviceComponent;
  let fixture: ComponentFixture<StudentAdvisorAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAdvisorAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdvisorAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
