import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorNotificationsComponent } from './educator-notifications.component';

describe('EducatorNotificationsComponent', () => {
  let component: EducatorNotificationsComponent;
  let fixture: ComponentFixture<EducatorNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
