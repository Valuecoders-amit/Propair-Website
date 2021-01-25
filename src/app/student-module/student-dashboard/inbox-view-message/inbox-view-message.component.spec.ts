import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxViewMessageComponent } from './inbox-view-message.component';

describe('InboxViewMessageComponent', () => {
  let component: InboxViewMessageComponent;
  let fixture: ComponentFixture<InboxViewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxViewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxViewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
