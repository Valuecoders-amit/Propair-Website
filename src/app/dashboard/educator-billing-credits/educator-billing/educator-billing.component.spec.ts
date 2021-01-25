import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorBillingComponent } from './educator-billing.component';

describe('EducatorBillingComponent', () => {
  let component: EducatorBillingComponent;
  let fixture: ComponentFixture<EducatorBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
