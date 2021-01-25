import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorStudentAchievementComponent } from './advisor-student-achievement.component';

describe('AdvisorStudentAchievementComponent', () => {
  let component: AdvisorStudentAchievementComponent;
  let fixture: ComponentFixture<AdvisorStudentAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorStudentAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorStudentAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
