import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMessageIIComponent } from './student-message-ii.component';

describe('StudentMessageIIComponent', () => {
  let component: StudentMessageIIComponent;
  let fixture: ComponentFixture<StudentMessageIIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMessageIIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMessageIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
