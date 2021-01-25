import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageExchange1Component } from './message-exchange1.component';

describe('MessageExchange1Component', () => {
  let component: MessageExchange1Component;
  let fixture: ComponentFixture<MessageExchange1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageExchange1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageExchange1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
