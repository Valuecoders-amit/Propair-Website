import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorArchiveViewMessageComponent } from './advisor-archive-view-message.component';

describe('AdvisorArchiveViewMessageComponent', () => {
  let component: AdvisorArchiveViewMessageComponent;
  let fixture: ComponentFixture<AdvisorArchiveViewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorArchiveViewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorArchiveViewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
