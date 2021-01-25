import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMyMessageComponent } from './student-my-message.component';

describe('StudentMyMessageComponent', () => {
  let component: StudentMyMessageComponent;
  let fixture: ComponentFixture<StudentMyMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMyMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
