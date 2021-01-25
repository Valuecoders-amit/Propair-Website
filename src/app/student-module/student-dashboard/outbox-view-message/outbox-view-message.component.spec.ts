import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboxViewMessageComponent } from './outbox-view-message.component';

describe('OutboxViewMessageComponent', () => {
  let component: OutboxViewMessageComponent;
  let fixture: ComponentFixture<OutboxViewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboxViewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutboxViewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
