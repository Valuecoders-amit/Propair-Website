import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorStudentBiographyComponent } from './educator-student-biography.component';

describe('EducatorStudentBiographyComponent', () => {
  let component: EducatorStudentBiographyComponent;
  let fixture: ComponentFixture<EducatorStudentBiographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorStudentBiographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorStudentBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
