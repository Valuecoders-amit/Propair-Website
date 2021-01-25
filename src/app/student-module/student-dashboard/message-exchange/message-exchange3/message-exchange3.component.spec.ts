import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageExchange3Component } from './message-exchange3.component';

describe('MessageExchange3Component', () => {
  let component: MessageExchange3Component;
  let fixture: ComponentFixture<MessageExchange3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageExchange3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageExchange3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
