import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorStudentWorkComponent } from './advisor-student-work.component';

describe('AdvisorStudentWorkComponent', () => {
  let component: AdvisorStudentWorkComponent;
  let fixture: ComponentFixture<AdvisorStudentWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorStudentWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorStudentWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
