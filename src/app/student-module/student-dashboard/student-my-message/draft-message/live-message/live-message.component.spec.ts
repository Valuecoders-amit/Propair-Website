import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMessageComponent } from './live-message.component';

describe('LiveMessageComponent', () => {
  let component: LiveMessageComponent;
  let fixture: ComponentFixture<LiveMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
