import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorStudentSkillsComponent } from './advisor-student-skills.component';

describe('AdvisorStudentSkillsComponent', () => {
  let component: AdvisorStudentSkillsComponent;
  let fixture: ComponentFixture<AdvisorStudentSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorStudentSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorStudentSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
