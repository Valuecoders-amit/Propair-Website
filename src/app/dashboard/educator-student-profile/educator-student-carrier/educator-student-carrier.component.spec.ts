import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorStudentCarrierComponent } from './educator-student-carrier.component';

describe('EducatorStudentCarrierComponent', () => {
  let component: EducatorStudentCarrierComponent;
  let fixture: ComponentFixture<EducatorStudentCarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorStudentCarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorStudentCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
