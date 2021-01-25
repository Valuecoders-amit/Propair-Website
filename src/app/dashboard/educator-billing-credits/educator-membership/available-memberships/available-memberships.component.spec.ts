import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableMembershipsComponent } from './available-memberships.component';

describe('AvailableMembershipsComponent', () => {
  let component: AvailableMembershipsComponent;
  let fixture: ComponentFixture<AvailableMembershipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableMembershipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableMembershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
