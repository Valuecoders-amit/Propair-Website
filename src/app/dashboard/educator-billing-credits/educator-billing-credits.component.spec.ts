import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorBillingCreditsComponent } from './educator-billing-credits.component';

describe('EducatorBillingCreditsComponent', () => {
  let component: EducatorBillingCreditsComponent;
  let fixture: ComponentFixture<EducatorBillingCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorBillingCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorBillingCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
