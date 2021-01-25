import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorInboxViewMessageComponent } from './advisor-inbox-view-message.component';

describe('AdvisorInboxViewMessageComponent', () => {
  let component: AdvisorInboxViewMessageComponent;
  let fixture: ComponentFixture<AdvisorInboxViewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorInboxViewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorInboxViewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
