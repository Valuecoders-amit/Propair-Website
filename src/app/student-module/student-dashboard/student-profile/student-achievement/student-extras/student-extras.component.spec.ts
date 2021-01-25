import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExtrasComponent } from './student-extras.component';

describe('StudentExtrasComponent', () => {
  let component: StudentExtrasComponent;
  let fixture: ComponentFixture<StudentExtrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExtrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
