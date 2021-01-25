import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorLoginComponent } from './advisor-login.component';

describe('AdvisorLoginComponent', () => {
  let component: AdvisorLoginComponent;
  let fixture: ComponentFixture<AdvisorLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
