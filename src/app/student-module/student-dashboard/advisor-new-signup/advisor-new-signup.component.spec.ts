import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorNewSignupComponent } from './advisor-new-signup.component';

describe('AdvisorNewSignupComponent', () => {
  let component: AdvisorNewSignupComponent;
  let fixture: ComponentFixture<AdvisorNewSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorNewSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorNewSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
