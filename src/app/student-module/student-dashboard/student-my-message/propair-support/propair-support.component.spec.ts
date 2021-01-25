import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropairSupportComponent } from './propair-support.component';

describe('PropairSupportComponent', () => {
  let component: PropairSupportComponent;
  let fixture: ComponentFixture<PropairSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropairSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropairSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
