import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorInboxComponent } from './advisor-inbox.component';

describe('AdvisorInboxComponent', () => {
  let component: AdvisorInboxComponent;
  let fixture: ComponentFixture<AdvisorInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
