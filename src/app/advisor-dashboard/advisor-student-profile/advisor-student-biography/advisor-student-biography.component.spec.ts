import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorStudentBiographyComponent } from './advisor-student-biography.component';

describe('AdvisorStudentBiographyComponent', () => {
  let component: AdvisorStudentBiographyComponent;
  let fixture: ComponentFixture<AdvisorStudentBiographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorStudentBiographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorStudentBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
