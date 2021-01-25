import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorKarmaComponent } from './advisor-karma.component';

describe('AdvisorKarmaComponent', () => {
  let component: AdvisorKarmaComponent;
  let fixture: ComponentFixture<AdvisorKarmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorKarmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorKarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
