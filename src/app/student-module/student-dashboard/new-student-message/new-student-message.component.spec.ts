import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStudentMessageComponent } from './new-student-message.component';

describe('NewStudentMessageComponent', () => {
  let component: NewStudentMessageComponent;
  let fixture: ComponentFixture<NewStudentMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStudentMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStudentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
