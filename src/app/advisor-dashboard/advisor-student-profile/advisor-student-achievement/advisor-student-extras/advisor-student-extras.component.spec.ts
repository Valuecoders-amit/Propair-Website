import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorStudentExtrasComponent } from './advisor-student-extras.component';

describe('AdvisorStudentExtrasComponent', () => {
  let component: AdvisorStudentExtrasComponent;
  let fixture: ComponentFixture<AdvisorStudentExtrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorStudentExtrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorStudentExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
