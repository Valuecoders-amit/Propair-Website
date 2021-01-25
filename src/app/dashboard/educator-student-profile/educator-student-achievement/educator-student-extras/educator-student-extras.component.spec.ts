import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorStudentExtrasComponent } from './educator-student-extras.component';

describe('EducatorStudentExtrasComponent', () => {
  let component: EducatorStudentExtrasComponent;
  let fixture: ComponentFixture<EducatorStudentExtrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorStudentExtrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorStudentExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
