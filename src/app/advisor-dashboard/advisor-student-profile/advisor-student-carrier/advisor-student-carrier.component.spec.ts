import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorStudentCarrierComponent } from './advisor-student-carrier.component';

describe('AdvisorStudentCarrierComponent', () => {
  let component: AdvisorStudentCarrierComponent;
  let fixture: ComponentFixture<AdvisorStudentCarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorStudentCarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorStudentCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
