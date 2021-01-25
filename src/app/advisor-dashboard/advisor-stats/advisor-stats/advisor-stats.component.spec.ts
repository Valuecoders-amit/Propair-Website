import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorStatsComponent } from './advisor-stats.component';

describe('AdvisorStatsComponent', () => {
  let component: AdvisorStatsComponent;
  let fixture: ComponentFixture<AdvisorStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
