import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMessageReplyComponent } from './student-message-reply.component';

describe('StudentMessageReplyComponent', () => {
  let component: StudentMessageReplyComponent;
  let fixture: ComponentFixture<StudentMessageReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMessageReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMessageReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
