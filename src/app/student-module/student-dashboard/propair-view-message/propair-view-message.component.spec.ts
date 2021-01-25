import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropairViewMessageComponent } from './propair-view-message.component';

describe('PropairViewMessageComponent', () => {
  let component: PropairViewMessageComponent;
  let fixture: ComponentFixture<PropairViewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropairViewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropairViewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
