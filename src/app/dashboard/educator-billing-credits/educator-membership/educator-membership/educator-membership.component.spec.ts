import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorMembershipComponent } from './educator-membership.component';

describe('EducatorMembershipComponent', () => {
  let component: EducatorMembershipComponent;
  let fixture: ComponentFixture<EducatorMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
