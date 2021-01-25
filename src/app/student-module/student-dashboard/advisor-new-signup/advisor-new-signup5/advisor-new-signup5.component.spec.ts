import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorNewSignup5Component } from './advisor-new-signup5.component';

describe('AdvisorNewSignup5Component', () => {
  let component: AdvisorNewSignup5Component;
  let fixture: ComponentFixture<AdvisorNewSignup5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorNewSignup5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorNewSignup5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
