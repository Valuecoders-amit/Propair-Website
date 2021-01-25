import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorStudentAchievementsComponent } from './educator-student-achievements.component';

describe('EducatorStudentAchievementsComponent', () => {
  let component: EducatorStudentAchievementsComponent;
  let fixture: ComponentFixture<EducatorStudentAchievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorStudentAchievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorStudentAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
