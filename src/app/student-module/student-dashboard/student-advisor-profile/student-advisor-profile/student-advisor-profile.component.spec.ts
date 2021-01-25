import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdvisorProfileComponent } from './student-advisor-profile.component';

describe('StudentAdvisorProfileComponent', () => {
  let component: StudentAdvisorProfileComponent;
  let fixture: ComponentFixture<StudentAdvisorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAdvisorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdvisorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
