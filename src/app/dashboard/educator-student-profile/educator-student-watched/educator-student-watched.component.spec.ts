import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorStudentWatchedComponent } from './educator-student-watched.component';

describe('EducatorStudentWatchedComponent', () => {
  let component: EducatorStudentWatchedComponent;
  let fixture: ComponentFixture<EducatorStudentWatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorStudentWatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorStudentWatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
