import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorSignupComponent } from './advisor-signup.component';

describe('AdvisorSignupComponent', () => {
  let component: AdvisorSignupComponent;
  let fixture: ComponentFixture<AdvisorSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
