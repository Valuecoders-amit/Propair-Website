import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorDraftComponent } from './advisor-draft.component';

describe('AdvisorDraftComponent', () => {
  let component: AdvisorDraftComponent;
  let fixture: ComponentFixture<AdvisorDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
