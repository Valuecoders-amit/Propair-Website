import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafegaurdingPolicyComponent } from './safegaurding-policy.component';

describe('SafegaurdingPolicyComponent', () => {
  let component: SafegaurdingPolicyComponent;
  let fixture: ComponentFixture<SafegaurdingPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafegaurdingPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafegaurdingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
