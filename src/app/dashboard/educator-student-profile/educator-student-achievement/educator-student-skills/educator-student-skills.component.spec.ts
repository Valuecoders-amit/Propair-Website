import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorStudentSkillsComponent } from './educator-student-skills.component';

describe('EducatorStudentSkillsComponent', () => {
  let component: EducatorStudentSkillsComponent;
  let fixture: ComponentFixture<EducatorStudentSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorStudentSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorStudentSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
