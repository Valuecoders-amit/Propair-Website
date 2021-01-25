import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorPaymentMethodComponent } from './educator-payment-method.component';

describe('EducatorPaymentMethodComponent', () => {
  let component: EducatorPaymentMethodComponent;
  let fixture: ComponentFixture<EducatorPaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorPaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
