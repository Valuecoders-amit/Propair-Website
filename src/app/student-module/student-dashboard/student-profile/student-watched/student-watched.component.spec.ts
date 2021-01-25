import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWatchedComponent } from './student-watched.component';

describe('StudentWatchedComponent', () => {
  let component: StudentWatchedComponent;
  let fixture: ComponentFixture<StudentWatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentWatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentWatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
