import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLibraryComponent } from './student-library.component';

describe('StudentLibraryComponent', () => {
  let component: StudentLibraryComponent;
  let fixture: ComponentFixture<StudentLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
