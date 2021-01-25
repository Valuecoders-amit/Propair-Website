import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdvisorBiographyComponent } from './student-advisor-biography.component';

describe('StudentAdvisorBiographyComponent', () => {
  let component: StudentAdvisorBiographyComponent;
  let fixture: ComponentFixture<StudentAdvisorBiographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAdvisorBiographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdvisorBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
