import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdvisorCarrierComponent } from './student-advisor-carrier.component';

describe('StudentAdvisorCarrierComponent', () => {
  let component: StudentAdvisorCarrierComponent;
  let fixture: ComponentFixture<StudentAdvisorCarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAdvisorCarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdvisorCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
