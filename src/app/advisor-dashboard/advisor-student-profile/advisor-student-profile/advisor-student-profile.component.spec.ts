import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorStudentProfileComponent } from './advisor-student-profile.component';

describe('AdvisorStudentProfileComponent', () => {
  let component: AdvisorStudentProfileComponent;
  let fixture: ComponentFixture<AdvisorStudentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorStudentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorStudentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
