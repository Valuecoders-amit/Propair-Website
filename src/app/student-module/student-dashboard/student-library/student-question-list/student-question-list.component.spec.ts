import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuestionListComponent } from './student-question-list.component';

describe('StudentQuestionListComponent', () => {
  let component: StudentQuestionListComponent;
  let fixture: ComponentFixture<StudentQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
