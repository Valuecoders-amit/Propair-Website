import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageExchange4Component } from './message-exchange4.component';

describe('MessageExchange4Component', () => {
  let component: MessageExchange4Component;
  let fixture: ComponentFixture<MessageExchange4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageExchange4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageExchange4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
