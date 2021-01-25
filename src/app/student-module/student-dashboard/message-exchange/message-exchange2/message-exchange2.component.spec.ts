import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageExchange2Component } from './message-exchange2.component';

describe('MessageExchange2Component', () => {
  let component: MessageExchange2Component;
  let fixture: ComponentFixture<MessageExchange2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageExchange2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageExchange2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
