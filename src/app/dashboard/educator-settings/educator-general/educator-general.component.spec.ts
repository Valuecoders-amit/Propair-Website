import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorGeneralComponent } from './educator-general.component';

describe('EducatorGeneralComponent', () => {
  let component: EducatorGeneralComponent;
  let fixture: ComponentFixture<EducatorGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
