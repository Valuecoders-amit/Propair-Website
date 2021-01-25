import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorNewSignup1Component } from './advisor-new-signup1.component';

describe('AdvisorNewSignup1Component', () => {
  let component: AdvisorNewSignup1Component;
  let fixture: ComponentFixture<AdvisorNewSignup1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorNewSignup1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorNewSignup1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
