import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorStudentsCreditsComponent } from './educator-students-credits.component';

describe('EducatorStudentsCreditsComponent', () => {
  let component: EducatorStudentsCreditsComponent;
  let fixture: ComponentFixture<EducatorStudentsCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorStudentsCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorStudentsCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
