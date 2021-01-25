import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorArchiveComponent } from './advisor-archive.component';

describe('AdvisorArchiveComponent', () => {
  let component: AdvisorArchiveComponent;
  let fixture: ComponentFixture<AdvisorArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
