import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExchangeViewMessageComponent } from './new-exchange-view-message.component';

describe('NewExchangeViewMessageComponent', () => {
  let component: NewExchangeViewMessageComponent;
  let fixture: ComponentFixture<NewExchangeViewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExchangeViewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExchangeViewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
