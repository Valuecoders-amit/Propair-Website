import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorDraftViewMessageComponent } from './advisor-draft-view-message.component';

describe('AdvisorDraftViewMessageComponent', () => {
  let component: AdvisorDraftViewMessageComponent;
  let fixture: ComponentFixture<AdvisorDraftViewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorDraftViewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorDraftViewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
