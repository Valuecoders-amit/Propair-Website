import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAchievementComponent } from './student-achievement.component';

describe('StudentAchievementComponent', () => {
  let component: StudentAchievementComponent;
  let fixture: ComponentFixture<StudentAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
