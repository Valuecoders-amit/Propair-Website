import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorAdviceComponent } from './advisor-advice.component';

describe('AdvisorAdviceComponent', () => {
  let component: AdvisorAdviceComponent;
  let fixture: ComponentFixture<AdvisorAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
