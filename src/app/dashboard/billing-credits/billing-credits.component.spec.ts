import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingCreditsComponent } from './billing-credits.component';

describe('BillingCreditsComponent', () => {
  let component: BillingCreditsComponent;
  let fixture: ComponentFixture<BillingCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
