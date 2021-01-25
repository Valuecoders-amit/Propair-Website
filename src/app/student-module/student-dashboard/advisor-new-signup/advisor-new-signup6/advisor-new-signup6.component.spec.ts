import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorNewSignup6Component } from './advisor-new-signup6.component';

describe('AdvisorNewSignup6Component', () => {
  let component: AdvisorNewSignup6Component;
  let fixture: ComponentFixture<AdvisorNewSignup6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorNewSignup6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorNewSignup6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
