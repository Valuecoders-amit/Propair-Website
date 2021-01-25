import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorStudentWatchedComponent } from './advisor-student-watched.component';

describe('AdvisorStudentWatchedComponent', () => {
  let component: AdvisorStudentWatchedComponent;
  let fixture: ComponentFixture<AdvisorStudentWatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorStudentWatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorStudentWatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
