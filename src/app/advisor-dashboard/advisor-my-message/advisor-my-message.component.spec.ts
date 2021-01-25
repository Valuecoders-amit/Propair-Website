import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorMyMessageComponent } from './advisor-my-message.component';

describe('AdvisorMyMessageComponent', () => {
  let component: AdvisorMyMessageComponent;
  let fixture: ComponentFixture<AdvisorMyMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorMyMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorMyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
