import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSkillsComponent } from './student-skills.component';

describe('StudentSkillsComponent', () => {
  let component: StudentSkillsComponent;
  let fixture: ComponentFixture<StudentSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
